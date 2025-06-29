import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-background">
        <div className="sphere sphere-1"></div>
        <div className="sphere sphere-2"></div>
        <div className="sphere sphere-3"></div>
        <div className="sphere sphere-4"></div>
        <div className="sphere sphere-5"></div>
      </div>
      
      <div className="not-found-content">
        <div className="tv-container">
          <div className="antenna">
            <div className="antenna-shadow" />
            <div className="antenna-rod-1" />
            <div className="antenna-dot-1" />
            <div className="antenna-rod-2" />
            <div className="antenna-dot-2" />
          </div>
          
          <div className="tv-body">
            <div className="tv-screen-container">
              <div className="tv-screen">
                <div className="screen-static">
                  <span className="error-text">404 NOT FOUND</span>
                </div>
                <div className="screen-bars">
                  <span className="error-text">404 NOT FOUND</span>
                </div>
              </div>
            </div>
            
            <div className="tv-controls">
              <div className="control-knob">
                <div className="knob-line"></div>
              </div>
              <div className="control-knob">
                <div className="knob-line"></div>
              </div>
              <div className="speaker-grille">
                <div className="speaker-dots">
                  <div className="speaker-dot"></div>
                  <div className="speaker-dot"></div>
                  <div className="speaker-dot"></div>
                </div>
                <div className="speaker-line"></div>
                <div className="speaker-line"></div>
              </div>
            </div>
          </div>
          
          <div className="tv-stand">
            <div className="stand-leg"></div>
            <div className="stand-leg"></div>
            <div className="stand-base"></div>
          </div>
        </div>
        
        <div className="error-message">
          <h1 className="error-title">Page Not Found</h1>
          <p className="error-description">
            The page you're looking for seems to have vanished into the digital void.
          </p>
          <button className="back-home-btn" onClick={() => window.location.href = '/'}>
            Return Home
          </button>
        </div>
        
        <div className="background-404">
          <span className="bg-4">4</span>
          <span className="bg-0">0</span>
          <span className="bg-4-2">4</span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;