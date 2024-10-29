import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearToken } from '../auth';
import './Navbar.scss';

const Navbar = ({token, setAppToken}) => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('username');
    if (token && user) {
      setUsername(user.charAt(0).toUpperCase());
    }
  }, [token]);

  const handleSignOut = () => {
    clearToken();
    setAppToken(null);
    setUsername(null);
    localStorage.removeItem('username');
    localStorage.removeItem('user');
    localStorage.removeItem('id');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">Travel Log</Link>

      {username && (
        <div className="navbar-user">
          <div className="user-profile">
            <span className="profile-initial">{username}</span>
          </div>
          <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
