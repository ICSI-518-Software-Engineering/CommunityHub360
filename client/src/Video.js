import React from 'react';
import './Video.css';
import VideoBg from './Background.mp4';
import { Link } from 'react-router-dom';

const Video = () => {
  return (
    <div>
      <div className='overlay'></div>
      <video src={VideoBg} autoPlay loop muted />
      <div className='content'>
      <h1 className="glow">Welcome to CommunityHUB360</h1>
        <h3>Your Gateway to Connected Communities</h3>
      </div>
      <div>
      <div className="button-container">
      <Link to="/login">
        <button className="login-button">Login</button>
      </Link>
      <Link to='/signup'>
        <button className="signup-button">Sign Up</button>
      </Link>  
      </div>
      <div className="who-are-we-button">
        <Link to='/aboutus'><button>About Us</button></Link>
      </div>
      </div>
    </div>
  );
};

export default Video;