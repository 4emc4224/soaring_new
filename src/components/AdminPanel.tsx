import React, { useState } from 'react';
import { 
  X, 
  Users, 
  Search, 
  Edit, 
  Ban, 
  Trash2, 
  Eye, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  User,
  Calendar,
  Activity,
  Settings,
  RotateCcw
} from 'lucide-react';

interface AdminUser {
  id: string;
  username: string;
  email: string;
  customUrl?: string;
  avatar: string | null;
  rank: string;
  elo: number;
  wins: number;
  joinDate: string;
  lastActive: string;
  isOnline: boolean;
  isBanned: boolean;
  banReason?: string;
}

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showBanModal, setShowBanModal] = useState(false);
  const [banReason, setBanReason] = useState('');
  const [customUrl, setCustomUrl] = useState('');

  const [users, setUsers] = useState<AdminUser[]>([
    {
      id: '1',
      username: 'ProGamer2024',
      email: 'progamer@example.com',
      customUrl: 'progamer',
      avatar: null,
      rank: 'Diamond',
      elo: 2847,
      wins: 156,
      joinDate: '2023-05-15',
      lastActive: '2 hours ago',
      isOnline: true,
      isBanned: false
    },
    {
      id: '2',
      username: 'SkillMaster',
      email: 'skill@example.com',
      avatar: null,
      rank: 'Platinum',
      elo: 2156,
      wins: 89,
      joinDate: '2023-08-20',
      lastActive: '1 day ago',
      isOnline: false,
      isBanned: false
    },
    {
      id: '3',
      username: 'BannedUser',
      email: 'banned@example.com',
      avatar: null,
      rank: 'Gold',
      elo: 1456,
      wins: 23,
      joinDate: '2023-12-01',
      lastActive: '1 week ago',
      isOnline: false,
      isBanned: true,
      banReason: 'Cheating and toxic behavior'
    }
  ]);

  if (!isOpen) return null;

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.includes(searchTerm)
  );

  const handleViewProfile = (user: AdminUser) => {
    const profileUrl = user.customUrl ? `/profile/${user.customUrl}` : `/id/${user.id}`;
    window.open(profileUrl, '_blank');
  };

  const handleEditUser = (user: AdminUser) => {
    setSelectedUser(user);
    setCustomUrl(user.customUrl || '');
    setShowUserModal(true);
  };

  const handleBanUser = (user: AdminUser) => {
    setSelectedUser(user);
    setBanReason(user.banReason || '');
    setShowBanModal(true);
  };

  const handleSaveUserChanges = () => {
    if (!selectedUser) return;

    setUsers(users.map(user => 
      user.id === selectedUser.id 
        ? { ...user, customUrl: customUrl || undefined }
        : user
    ));

    setShowUserModal(false);
    setSelectedUser(null);
    setCustomUrl('');
  };

  const handleConfirmBan = () => {
    if (!selectedUser) return;

    setUsers(users.map(user => 
      user.id === selectedUser.id 
        ? { ...user, isBanned: !user.isBanned, banReason: user.isBanned ? undefined : banReason }
        : user
    ));

    setShowBanModal(false);
    setSelectedUser(null);
    setBanReason('');
  };

  const handleResetStats = (user: AdminUser) => {
    if (confirm(`Are you sure you want to reset ${user.username}'s statistics?`)) {
      setUsers(users.map(u => 
        u.id === user.id 
          ? { ...u, elo: 1000, wins: 0, rank: 'Bronze' }
          : u
      ));
    }
  };

  const handleDeleteUser = (user: AdminUser) => {
    if (confirm(`Are you sure you want to delete ${user.username}'s account? This action cannot be undone.`)) {
      setUsers(users.filter(u => u.id !== user.id));
    }
  };

  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="admin-container" onClick={(e) => e.stopPropagation()}>
        <div className="admin-glow-top-right"></div>
        <div className="admin-glow-bottom-left"></div>
        
        <button className="admin-close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="admin-content">
          <div className="admin-header">
            <h2 className="admin-title">
              <Shield size={24} />
              Admin Panel
            </h2>
            <div className="admin-stats">
              <div className="admin-stat">
                <Users size={16} />
                <span>{users.length} Total Users</span>
              </div>
              <div className="admin-stat">
                <Activity size={16} />
                <span>{users.filter(u => u.isOnline).length} Online</span>
              </div>
              <div className="admin-stat">
                <Ban size={16} />
                <span>{users.filter(u => u.isBanned).length} Banned</span>
              </div>
            </div>
          </div>

          <div className="admin-tabs">
            <button 
              className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              <Users size={18} />
              User Management
            </button>
            <button 
              className={`admin-tab ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={18} />
              System Settings
            </button>
          </div>

          {activeTab === 'users' && (
            <div className="users-management">
              <div className="users-controls">
                <div className="search-container">
                  <Search size={20} />
                  <input
                    type="text"
                    placeholder="Search users by username, email, or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>
              </div>

              <div className="users-table">
                <div className="table-header">
                  <div className="table-cell">User</div>
                  <div className="table-cell">Stats</div>
                  <div className="table-cell">Status</div>
                  <div className="table-cell">Actions</div>
                </div>
                
                {filteredUsers.map((user) => (
                  <div key={user.id} className={`table-row ${user.isBanned ? 'banned' : ''}`}>
                    <div className="table-cell user-cell">
                      <div className="user-avatar-small">
                        {user.avatar ? (
                          <img src={user.avatar} alt="Avatar" className="avatar-image-small" />
                        ) : (
                          <User size={20} />
                        )}
                        <div className={`status-indicator ${user.isOnline ? 'online' : 'offline'}`}></div>
                      </div>
                      <div className="user-info-small">
                        <span className="username-small">{user.username}</span>
                        <span className="user-email-small">{user.email}</span>
                        <span className="user-id-small">ID: {user.id}</span>
                        {user.customUrl && (
                          <span className="custom-url-small">/{user.customUrl}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="table-cell stats-cell">
                      <div className="user-stats-small">
                        <span className="stat-item">{user.rank}</span>
                        <span className="stat-item">{user.elo} ELO</span>
                        <span className="stat-item">{user.wins} Wins</span>
                      </div>
                    </div>
                    
                    <div className="table-cell status-cell">
                      <div className="user-status-info">
                        {user.isBanned ? (
                          <div className="banned-status">
                            <Ban size={16} className="text-red-400" />
                            <span>Banned</span>
                            {user.banReason && (
                              <span className="ban-reason">{user.banReason}</span>
                            )}
                          </div>
                        ) : (
                          <div className="active-status">
                            <CheckCircle size={16} className="text-green-400" />
                            <span>Active</span>
                          </div>
                        )}
                        <span className="last-active">
                          <Calendar size={14} />
                          {user.lastActive}
                        </span>
                      </div>
                    </div>
                    
                    <div className="table-cell actions-cell">
                      <div className="action-buttons">
                        <button 
                          className="action-btn view-btn"
                          onClick={() => handleViewProfile(user)}
                          title="View Profile"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          className="action-btn edit-btn"
                          onClick={() => handleEditUser(user)}
                          title="Edit User"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          className={`action-btn ${user.isBanned ? 'unban-btn' : 'ban-btn'}`}
                          onClick={() => handleBanUser(user)}
                          title={user.isBanned ? 'Unban User' : 'Ban User'}
                        >
                          <Ban size={16} />
                        </button>
                        <button 
                          className="action-btn reset-btn"
                          onClick={() => handleResetStats(user)}
                          title="Reset Statistics"
                        >
                          <RotateCcw size={16} />
                        </button>
                        <button 
                          className="action-btn delete-btn"
                          onClick={() => handleDeleteUser(user)}
                          title="Delete User"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="system-settings">
              <h3 className="section-title">System Configuration</h3>
              <div className="settings-grid">
                <div className="setting-card">
                  <h4>User Registration</h4>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="setting-card">
                  <h4>Public Profiles</h4>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="setting-card">
                  <h4>Profile Comments</h4>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="setting-card">
                  <h4>Maintenance Mode</h4>
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit User Modal */}
      {showUserModal && selectedUser && (
        <div className="modal-overlay" onClick={() => setShowUserModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Edit User: {selectedUser.username}</h3>
            <div className="modal-content">
              <div className="form-group">
                <label className="form-label">Custom URL</label>
                <div className="url-input-container">
                  <span className="url-prefix">soaring.com/</span>
                  <input
                    type="text"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="custom-url"
                    className="form-input"
                  />
                </div>
                <p className="form-help">Leave empty to use default ID-based URL</p>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowUserModal(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleSaveUserChanges}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ban User Modal */}
      {showBanModal && selectedUser && (
        <div className="modal-overlay" onClick={() => setShowBanModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">
              {selectedUser.isBanned ? 'Unban' : 'Ban'} User: {selectedUser.username}
            </h3>
            <div className="modal-content">
              {!selectedUser.isBanned && (
                <div className="form-group">
                  <label className="form-label">Ban Reason</label>
                  <textarea
                    value={banReason}
                    onChange={(e) => setBanReason(e.target.value)}
                    placeholder="Reason for banning this user..."
                    className="form-textarea"
                    rows={4}
                  />
                </div>
              )}
              <div className="warning-message">
                <AlertTriangle size={20} />
                <p>
                  {selectedUser.isBanned 
                    ? 'This will restore the user\'s access to their account.'
                    : 'This will restrict the user\'s access to their account.'
                  }
                </p>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowBanModal(false)}>
                Cancel
              </button>
              <button 
                className={selectedUser.isBanned ? "btn-primary" : "btn-danger"} 
                onClick={handleConfirmBan}
              >
                {selectedUser.isBanned ? 'Unban User' : 'Ban User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;