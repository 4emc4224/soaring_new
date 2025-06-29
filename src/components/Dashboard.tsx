import React, { useState } from 'react';
import { 
  X, 
  User, 
  Trophy, 
  Star, 
  Coins, 
  Activity, 
  Target, 
  Award, 
  TrendingUp,
  Settings,
  Crown,
  Zap,
  Shield,
  MessageCircle,
  Send,
  Heart,
  Reply
} from 'lucide-react';

interface DashboardProps {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    username: string;
    email: string;
    avatar: string | null;
    coins: number;
    wins: number;
    rank: string;
  };
}

interface Comment {
  id: number;
  author: string;
  avatar: string | null;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ isOpen, onClose, userData }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: 'ProGamer',
      avatar: null,
      content: 'Amazing player! Had a great match with you yesterday. Your aim is incredible!',
      timestamp: '2 hours ago',
      likes: 12,
      isLiked: false
    },
    {
      id: 2,
      author: 'SkillMaster',
      avatar: null,
      content: 'Really enjoyed playing together. Great teamwork and communication!',
      timestamp: '5 hours ago',
      likes: 8,
      isLiked: true
    },
    {
      id: 3,
      author: 'EliteSniper',
      avatar: null,
      content: 'One of the best players I\'ve encountered. Keep up the great work!',
      timestamp: '1 day ago',
      likes: 15,
      isLiked: false
    },
    {
      id: 4,
      author: 'GameMaster',
      avatar: null,
      content: 'Your strategies are always on point. Thanks for the tips during our last game!',
      timestamp: '2 days ago',
      likes: 6,
      isLiked: false
    }
  ]);

  if (!isOpen) return null;

  const stats = [
    { icon: Trophy, label: 'Wins', value: userData.wins, color: 'text-yellow-400' },
    { icon: Target, label: 'Accuracy', value: '94.2%', color: 'text-green-400' },
    { icon: Zap, label: 'Streak', value: '12', color: 'text-blue-400' },
    { icon: Crown, label: 'Rank', value: userData.rank, color: 'text-purple-400' }
  ];

  const achievements = [
    { icon: Shield, title: 'First Victory', description: 'Win your first match', unlocked: true },
    { icon: Star, title: 'Rising Star', description: 'Reach high rank', unlocked: true },
    { icon: Crown, title: 'Champion', description: 'Win 100 matches', unlocked: true },
    { icon: Zap, title: 'Lightning Fast', description: 'Win in under 30 seconds', unlocked: false }
  ];

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: comments.length + 1,
      author: 'You',
      avatar: null,
      content: newComment,
      timestamp: 'Just now',
      likes: 0,
      isLiked: false
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleLikeComment = (commentId: number) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked
        };
      }
      return comment;
    }));
  };

  return (
    <div className="dashboard-overlay" onClick={onClose}>
      <div className="dashboard-container" onClick={(e) => e.stopPropagation()}>
        <div className="dashboard-glow-top-right"></div>
        <div className="dashboard-glow-bottom-left"></div>
        
        <button className="dashboard-close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="dashboard-content">
          {/* Header */}
          <div className="dashboard-header">
            <div className="user-profile-large">
              <div className="user-avatar-large">
                {userData.avatar ? (
                  <img src={userData.avatar} alt="Avatar" className="avatar-image-large" />
                ) : (
                  <User size={32} />
                )}
              </div>
              <div className="user-info-large">
                <h2 className="username-large">{userData.username}</h2>
                <p className="user-email">{userData.email}</p>
                <div className="rank-display">
                  <Crown size={16} />
                  <span className="rank-text">{userData.rank}</span>
                </div>
              </div>
              <div className="coins-display">
                <Coins size={20} />
                <span>{userData.coins.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="dashboard-tabs">
            <button 
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <Activity size={18} />
              Overview
            </button>
            <button 
              className={`tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
              onClick={() => setActiveTab('stats')}
            >
              <TrendingUp size={18} />
              Statistics
            </button>
            <button 
              className={`tab-btn ${activeTab === 'achievements' ? 'active' : ''}`}
              onClick={() => setActiveTab('achievements')}
            >
              <Award size={18} />
              Achievements
            </button>
            <button 
              className={`tab-btn ${activeTab === 'comments' ? 'active' : ''}`}
              onClick={() => setActiveTab('comments')}
            >
              <MessageCircle size={18} />
              Comments
            </button>
            <button 
              className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={18} />
              Settings
            </button>
          </div>

          {/* Content */}
          <div className="dashboard-body">
            {activeTab === 'overview' && (
              <div className="overview-content">
                {/* Stats Grid */}
                <div className="stats-grid">
                  {stats.map((stat, index) => (
                    <div key={index} className="stat-card">
                      <div className="stat-icon">
                        <stat.icon size={24} className={stat.color} />
                      </div>
                      <div className="stat-info">
                        <span className="stat-value">{stat.value}</span>
                        <span className="stat-label">{stat.label}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="recent-activity">
                  <h3 className="section-title">Recent Activity</h3>
                  <div className="activity-list">
                    <div className="activity-item">
                      <div className="activity-icon">
                        <Trophy size={16} className="text-yellow-400" />
                      </div>
                      <div className="activity-info">
                        <span className="activity-text">Won a match against ProGamer</span>
                        <span className="activity-time">2 hours ago</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-icon">
                        <Star size={16} className="text-blue-400" />
                      </div>
                      <div className="activity-info">
                        <span className="activity-text">Achieved 12-win streak</span>
                        <span className="activity-time">5 hours ago</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-icon">
                        <Crown size={16} className="text-purple-400" />
                      </div>
                      <div className="activity-info">
                        <span className="activity-text">Promoted to Diamond rank</span>
                        <span className="activity-time">1 day ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="achievements-content">
                <h3 className="section-title">Achievements</h3>
                <div className="achievements-grid">
                  {achievements.map((achievement, index) => (
                    <div key={index} className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}>
                      <div className="achievement-icon">
                        <achievement.icon size={32} />
                      </div>
                      <div className="achievement-info">
                        <h4 className="achievement-title">{achievement.title}</h4>
                        <p className="achievement-description">{achievement.description}</p>
                      </div>
                      {achievement.unlocked && (
                        <div className="achievement-badge">
                          <Star size={16} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="stats-content">
                <h3 className="section-title">Detailed Statistics</h3>
                <div className="detailed-stats">
                  <div className="stat-row">
                    <span className="stat-name">Total Matches</span>
                    <span className="stat-value">156</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-name">Win Rate</span>
                    <span className="stat-value">81.4%</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-name">Average Score</span>
                    <span className="stat-value">15.2</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-name">Best Streak</span>
                    <span className="stat-value">18</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-name">Time Played</span>
                    <span className="stat-value">42h 15m</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'comments' && (
              <div className="comments-content">
                <h3 className="section-title">Profile Comments</h3>
                
                {/* Comment Form */}
                <form onSubmit={handleCommentSubmit} className="comment-form">
                  <div className="comment-input-container">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Leave a comment about this player..."
                      className="comment-input"
                      rows={3}
                    />
                    <button type="submit" className="comment-submit-btn" disabled={!newComment.trim()}>
                      <Send size={16} />
                      Post Comment
                    </button>
                  </div>
                </form>

                {/* Comments List */}
                <div className="comments-list">
                  {comments.map((comment) => (
                    <div key={comment.id} className="comment-item">
                      <div className="comment-avatar">
                        {comment.avatar ? (
                          <img src={comment.avatar} alt="Avatar" className="avatar-image" />
                        ) : (
                          <User size={20} />
                        )}
                      </div>
                      <div className="comment-content">
                        <div className="comment-header">
                          <span className="comment-author">{comment.author}</span>
                          <span className="comment-time">{comment.timestamp}</span>
                        </div>
                        <p className="comment-text">{comment.content}</p>
                        <div className="comment-actions">
                          <button 
                            className={`comment-like-btn ${comment.isLiked ? 'liked' : ''}`}
                            onClick={() => handleLikeComment(comment.id)}
                          >
                            <Heart size={14} />
                            {comment.likes}
                          </button>
                          <button className="comment-reply-btn">
                            <Reply size={14} />
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="settings-content">
                <h3 className="section-title">Account Settings</h3>
                <div className="settings-list">
                  <div className="setting-item">
                    <span className="setting-name">Email Notifications</span>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <span className="setting-name">Sound Effects</span>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <span className="setting-name">Auto-match</span>
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
      </div>
    </div>
  );
};

export default Dashboard;