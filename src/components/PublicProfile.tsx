import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  User, 
  Trophy, 
  Target, 
  Zap, 
  Crown, 
  ArrowLeft, 
  MessageCircle, 
  Send, 
  Heart, 
  Reply,
  Gamepad2,
  Crosshair,
  Calendar,
  MapPin,
  Clock
} from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';

interface PublicProfileData {
  id: string;
  username: string;
  customUrl?: string;
  avatar: string | null;
  rank: string;
  elo: number;
  wins: number;
  kd: string;
  winRate: string;
  streak: number;
  joinDate: string;
  location?: string;
  bio?: string;
  isOnline: boolean;
  lastSeen?: string;
  isBlocked: boolean;
  recentMatches: Array<{
    id: number;
    opponent: string;
    result: 'Win' | 'Loss';
    score: string;
    time: string;
    gameMode: string;
  }>;
  comments: Array<{
    id: number;
    author: string;
    avatar: string | null;
    content: string;
    timestamp: string;
    likes: number;
    isLiked: boolean;
  }>;
}

const PublicProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<PublicProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<PublicProfileData['comments']>([]);

  useEffect(() => {
    // Simulate API call to fetch profile data
    const fetchProfile = async () => {
      setLoading(true);
      
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock profile data - in real app this would come from API
      const mockProfile: PublicProfileData = {
        id: id || '44',
        username: id === '44' ? 'ProGamer2024' : 'CustomUser',
        customUrl: id === 'custom' ? 'custom' : undefined,
        avatar: null,
        rank: 'Diamond',
        elo: 2847,
        wins: 156,
        kd: '2.4',
        winRate: '81.4%',
        streak: 12,
        joinDate: '2023-05-15',
        location: 'United States',
        bio: 'Professional esports player. Always looking for new challenges and teammates!',
        isOnline: Math.random() > 0.5,
        lastSeen: '2 hours ago',
        isBlocked: false,
        recentMatches: [
          { id: 1, opponent: 'SkillMaster', result: 'Win', score: '16-12', time: '2 hours ago', gameMode: 'Competitive' },
          { id: 2, opponent: 'EliteSniper', result: 'Win', score: '16-8', time: '5 hours ago', gameMode: 'Ranked' },
          { id: 3, opponent: 'CyberWarrior', result: 'Loss', score: '14-16', time: '1 day ago', gameMode: 'Tournament' },
          { id: 4, opponent: 'NightHawk', result: 'Win', score: '16-10', time: '2 days ago', gameMode: 'Competitive' },
        ],
        comments: [
          {
            id: 1,
            author: 'SkillMaster',
            avatar: null,
            content: 'Amazing player! Had a great match with you yesterday.',
            timestamp: '2 hours ago',
            likes: 12,
            isLiked: false
          },
          {
            id: 2,
            author: 'EliteSniper',
            avatar: null,
            content: 'Really enjoyed playing together. Great teamwork!',
            timestamp: '5 hours ago',
            likes: 8,
            isLiked: true
          }
        ]
      };

      // Check if profile should be blocked (simulate banned user)
      if (id === 'banned') {
        mockProfile.isBlocked = true;
      }

      setProfileData(mockProfile);
      setComments(mockProfile.comments);
      setLoading(false);
    };

    fetchProfile();
  }, [id]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
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

  if (loading) {
    return (
      <div className="public-profile-loading">
        <AnimatedBackground />
        <div className="loading-content">
          <div className="loading-spinner-large"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="public-profile-error">
        <AnimatedBackground />
        <div className="error-content">
          <h1>Profile Not Found</h1>
          <p>The profile you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/')} className="back-home-btn">
            Return Home
          </button>
        </div>
      </div>
    );
  }

  if (profileData.isBlocked) {
    return (
      <div className="banned-profile">
        <AnimatedBackground />
        <div className="banned-content">
          <div className="banned-icon">⚠️</div>
          <h1 className="banned-title">Account Suspended</h1>
          <p className="banned-description">
            This account has been suspended due to violations of our terms of service.
          </p>
          <button onClick={() => navigate('/')} className="back-home-btn">
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const stats = [
    { icon: Trophy, label: 'Wins', value: profileData.wins, color: 'text-yellow-400' },
    { icon: Crosshair, label: 'K/D Ratio', value: profileData.kd, color: 'text-green-400' },
    { icon: Target, label: 'Win Rate', value: profileData.winRate, color: 'text-blue-400' },
    { icon: Zap, label: 'Streak', value: profileData.streak, color: 'text-purple-400' }
  ];

  return (
    <div className="public-profile">
      <AnimatedBackground />
      
      <div className="public-profile-container">
        <button className="back-button" onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
          Back to Home
        </button>

        <div className="profile-header">
          <div className="profile-avatar-large">
            {profileData.avatar ? (
              <img src={profileData.avatar} alt="Avatar" className="avatar-image-xl" />
            ) : (
              <User size={64} />
            )}
            <div className={`online-status ${profileData.isOnline ? 'online' : 'offline'}`}>
              <div className="status-dot"></div>
            </div>
          </div>
          
          <div className="profile-info">
            <h1 className="profile-username">{profileData.username}</h1>
            <div className="profile-meta">
              <div className="profile-status">
                {profileData.isOnline ? (
                  <span className="status-online">Online</span>
                ) : (
                  <span className="status-offline">Last seen {profileData.lastSeen}</span>
                )}
              </div>
              <div className="profile-details">
                <span className="profile-detail">
                  <Calendar size={16} />
                  Joined {profileData.joinDate}
                </span>
                {profileData.location && (
                  <span className="profile-detail">
                    <MapPin size={16} />
                    {profileData.location}
                  </span>
                )}
              </div>
            </div>
            {profileData.bio && (
              <p className="profile-bio">{profileData.bio}</p>
            )}
          </div>

          <div className="profile-rank">
            <div className="rank-display">
              <Crown size={32} className="text-purple-400" />
              <div className="rank-info">
                <span className="rank-title">Current Rank</span>
                <span className="rank-value">{profileData.rank}</span>
              </div>
            </div>
            <div className="elo-display">
              <Zap size={20} />
              <span>ELO: {profileData.elo.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="stats-section">
            <h3 className="section-title">Statistics</h3>
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
          </div>

          <div className="matches-section">
            <h3 className="section-title">Recent Matches</h3>
            <div className="matches-list">
              {profileData.recentMatches.map((match) => (
                <div key={match.id} className="match-item">
                  <div className="match-info">
                    <div className="match-opponent">
                      <Gamepad2 size={16} className="match-icon" />
                      <span className="opponent">{match.opponent}</span>
                    </div>
                    <div className="match-details">
                      <span className="game-mode">{match.gameMode}</span>
                      <span className="match-time">{match.time}</span>
                    </div>
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

          <div className="comments-section">
            <h3 className="section-title">
              <MessageCircle size={20} />
              Profile Comments
            </h3>
            
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
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;