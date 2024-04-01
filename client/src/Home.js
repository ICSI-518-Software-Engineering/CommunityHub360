import React from 'react';
import './App.css';
import Navbar from './NavBar';
import Video from './Video';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Video />
      <header className="app-header">
        <h1>CommunityHub360</h1>
      </header>
    </div>
  );
}

export default App;