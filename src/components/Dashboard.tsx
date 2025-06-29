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
  Calendar,
  Settings,
  Crown,
  Zap,
  Shield
} from 'lucide-react';

interface DashboardProps {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    username: string;
    email: string;
    avatar: string | null;
    level: number;
    coins: number;
    wins: number;
    rank: string;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ isOpen, onClose, userData }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen) return null;

  const stats = [
    { icon: Trophy, label: 'Wins', value: userData.wins, color: 'text-yellow-400' },
    { icon: Target, label: 'Accuracy', value: '94.2%', color: 'text-green-400' },
    { icon: Zap, label: 'Streak', value: '12', color: 'text-blue-400' },
    { icon: Crown, label: 'Rank', value: userData.rank, color: 'text-purple-400' }
  ];

  const achievements = [
    { icon: Shield, title: 'First Victory', description: 'Win your first match', unlocked: true },
    { icon: Star, title: 'Rising Star', description: 'Reach level 25', unlocked: true },
    { icon: Crown, title: 'Champion', description: 'Win 100 matches', unlocked: true },
    { icon: Zap, title: 'Lightning Fast', description: 'Win in under 30 seconds', unlocked: false }
  ];

  const recentMatches = [
    { opponent: 'Player123', result: 'Win', score: '16-12', time: '2 hours ago' },
    { opponent: 'ProGamer', result: 'Win', score: '16-8', time: '5 hours ago' },
    { opponent: 'SkillMaster', result: 'Loss', score: '14-16', time: '1 day ago' },
    { opponent: 'EliteSniper', result: 'Win', score: '16-10', time: '2 days ago' }
  ];

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
                <div className="level-progress">
                  <span className="level-text">Level {userData.level}</span>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '75%' }}></div>
                  </div>
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

                {/* Recent Matches */}
                <div className="recent-matches">
                  <h3 className="section-title">Recent Matches</h3>
                  <div className="matches-list">
                    {recentMatches.map((match, index) => (
                      <div key={index} className="match-item">
                        <div className="match-info">
                          <span className="opponent">{match.opponent}</span>
                          <span className="match-time">{match.time}</span>
                        </div>
                        <div className="match-result">
                          <span className="score">{match.score}</span>
                          <span className={`result ${match.result.toLowerCase()}`}>
                            {match.result}
                          </span>
                        </div>
                      </div>
                    ))}
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