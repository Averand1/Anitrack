import React, { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import '../src/App.css';

const App = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const handleSignupClick = () => {
    setShowSignup(true);
    setShowLogin(false);
    setShowLogout(false);
  };

  const handleLoginClick = () => {
    setShowSignup(false);
    setShowLogin(true);
    setShowLogout(false);
  };

  const handleLogoutClick = () => {
    setShowSignup(false);
    setShowLogin(false);
    setShowLogout(true);
  };

  return (
    <div className="app-container">
      <nav>
        <button className="nav-button" onClick={handleSignupClick}>Signup</button>
        <button className="nav-button" onClick={handleLoginClick}>Login</button>
        <button className="nav-button" onClick={handleLogoutClick}>Logout</button>
      </nav>
      <div className="component-container">
        {showSignup && <Signup />}
        {showLogin && <Login />}
        {showLogout && <Logout />}
      </div>
    </div>
  );
};

export default App;
