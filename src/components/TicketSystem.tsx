import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  MessageCircle, 
  Send, 
  Paperclip, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  User,
  Calendar
} from 'lucide-react';

interface Ticket {
  id: number;
  title: string;
  status: 'open' | 'in-progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  category: string;
  createdAt: string;
  lastReply: string;
  messages: Message[];
}

interface Message {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  isAdmin: boolean;
  attachments?: string[];
}

interface TicketSystemProps {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    username: string;
    email: string;
  };
}

const TicketSystem: React.FC<TicketSystemProps> = ({ isOpen, onClose, userData }) => {
  const [activeView, setActiveView] = useState<'list' | 'chat' | 'create'>('list');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [newTicket, setNewTicket] = useState({
    title: '',
    category: 'general',
    priority: 'medium' as 'low' | 'medium' | 'high',
    description: ''
  });

  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 1,
      title: 'Account verification issue',
      status: 'open',
      priority: 'high',
      category: 'Account',
      createdAt: '2024-01-15',
      lastReply: '2 hours ago',
      messages: [
        {
          id: 1,
          author: userData.username,
          content: 'I cannot verify my account. The verification email is not arriving.',
          timestamp: '2024-01-15 10:30',
          isAdmin: false
        },
        {
          id: 2,
          author: 'Support Team',
          content: 'Hello! We are looking into this issue. Please check your spam folder and let us know if you find the email there.',
          timestamp: '2024-01-15 11:15',
          isAdmin: true
        }
      ]
    },
    {
      id: 2,
      title: 'Payment processing error',
      status: 'in-progress',
      priority: 'medium',
      category: 'Billing',
      createdAt: '2024-01-14',
      lastReply: '1 day ago',
      messages: [
        {
          id: 1,
          author: userData.username,
          content: 'My payment was declined but money was charged from my card.',
          timestamp: '2024-01-14 14:20',
          isAdmin: false
        }
      ]
    }
  ]);

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedTicket) return;

    const message: Message = {
      id: selectedTicket.messages.length + 1,
      author: userData.username,
      content: newMessage,
      timestamp: new Date().toLocaleString(),
      isAdmin: false
    };

    setTickets(tickets.map(ticket => 
      ticket.id === selectedTicket.id 
        ? { ...ticket, messages: [...ticket.messages, message], lastReply: 'Just now' }
        : ticket
    ));

    setSelectedTicket({
      ...selectedTicket,
      messages: [...selectedTicket.messages, message]
    });

    setNewMessage('');
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicket.title.trim() || !newTicket.description.trim()) return;

    const ticket: Ticket = {
      id: tickets.length + 1,
      title: newTicket.title,
      status: 'open',
      priority: newTicket.priority,
      category: newTicket.category,
      createdAt: new Date().toLocaleDateString(),
      lastReply: 'Just now',
      messages: [
        {
          id: 1,
          author: userData.username,
          content: newTicket.description,
          timestamp: new Date().toLocaleString(),
          isAdmin: false
        }
      ]
    };

    setTickets([ticket, ...tickets]);
    setNewTicket({ title: '', category: 'general', priority: 'medium', description: '' });
    setActiveView('list');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertCircle size={16} className="text-yellow-400" />;
      case 'in-progress': return <Clock size={16} className="text-blue-400" />;
      case 'closed': return <CheckCircle size={16} className="text-green-400" />;
      default: return <AlertCircle size={16} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="ticket-overlay" onClick={onClose}>
      <div className="ticket-container" onClick={(e) => e.stopPropagation()}>
        <div className="ticket-glow-top-right"></div>
        <div className="ticket-glow-bottom-left"></div>
        
        <button className="ticket-close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="ticket-content">
          {/* Header */}
          <div className="ticket-header">
            <h2 className="ticket-title">Support Tickets</h2>
            <div className="ticket-nav">
              <button 
                className={`ticket-nav-btn ${activeView === 'list' ? 'active' : ''}`}
                onClick={() => setActiveView('list')}
              >
                My Tickets
              </button>
              <button 
                className="ticket-create-btn"
                onClick={() => setActiveView('create')}
              >
                <Plus size={16} />
                New Ticket
              </button>
            </div>
          </div>

          {/* Ticket List View */}
          {activeView === 'list' && (
            <div className="ticket-list">
              {tickets.length === 0 ? (
                <div className="empty-tickets">
                  <MessageCircle size={48} className="empty-icon" />
                  <h3>No tickets yet</h3>
                  <p>Create your first support ticket to get help</p>
                </div>
              ) : (
                tickets.map((ticket) => (
                  <div 
                    key={ticket.id} 
                    className="ticket-item"
                    onClick={() => {
                      setSelectedTicket(ticket);
                      setActiveView('chat');
                    }}
                  >
                    <div className="ticket-item-header">
                      <div className="ticket-item-status">
                        {getStatusIcon(ticket.status)}
                        <span className="ticket-status-text">{ticket.status}</span>
                      </div>
                      <span className={`ticket-priority ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <h3 className="ticket-item-title">{ticket.title}</h3>
                    <div className="ticket-item-meta">
                      <span className="ticket-category">{ticket.category}</span>
                      <span className="ticket-date">
                        <Calendar size={14} />
                        {ticket.createdAt}
                      </span>
                      <span className="ticket-last-reply">Last reply: {ticket.lastReply}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Create Ticket View */}
          {activeView === 'create' && (
            <div className="create-ticket">
              <h3 className="create-ticket-title">Create New Ticket</h3>
              <form onSubmit={handleCreateTicket} className="create-ticket-form">
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    value={newTicket.title}
                    onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                    placeholder="Brief description of your issue"
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                      value={newTicket.category}
                      onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                      className="form-select"
                    >
                      <option value="general">General</option>
                      <option value="account">Account</option>
                      <option value="billing">Billing</option>
                      <option value="technical">Technical</option>
                      <option value="bug">Bug Report</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Priority</label>
                    <select
                      value={newTicket.priority}
                      onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value as 'low' | 'medium' | 'high' })}
                      className="form-select"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                    placeholder="Detailed description of your issue..."
                    className="form-textarea"
                    rows={6}
                    required
                  />
                </div>
                
                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={() => setActiveView('list')}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Create Ticket
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Chat View */}
          {activeView === 'chat' && selectedTicket && (
            <div className="ticket-chat">
              <div className="chat-header">
                <button className="back-btn" onClick={() => setActiveView('list')}>
                  ← Back to tickets
                </button>
                <div className="chat-ticket-info">
                  <h3 className="chat-ticket-title">{selectedTicket.title}</h3>
                  <div className="chat-ticket-meta">
                    {getStatusIcon(selectedTicket.status)}
                    <span>{selectedTicket.status}</span>
                    <span className={getPriorityColor(selectedTicket.priority)}>
                      {selectedTicket.priority} priority
                    </span>
                  </div>
                </div>
              </div>

              <div className="chat-messages">
                {selectedTicket.messages.map((message) => (
                  <div key={message.id} className={`message ${message.isAdmin ? 'admin' : 'user'}`}>
                    <div className="message-avatar">
                      <User size={20} />
                    </div>
                    <div className="message-content">
                      <div className="message-header">
                        <span className="message-author">
                          {message.isAdmin ? 'Support Team' : message.author}
                        </span>
                        <span className="message-time">{message.timestamp}</span>
                      </div>
                      <p className="message-text">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="chat-input-form">
                <div className="chat-message-box">
                  <div className="file-upload-wrapper">
                    <label htmlFor="file">
                      <Paperclip size={18} />
                      <span className="tooltip">Add attachment</span>
                    </label>
                    <input type="file" id="file" name="file" />
                  </div>
                  <input
                    required
                    placeholder="Type your message..."
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="message-input"
                  />
                  <button type="submit" className="send-button" disabled={!newMessage.trim()}>
                    <Send size={18} />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketSystem;