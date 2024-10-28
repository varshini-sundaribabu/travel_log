import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');
    if (token && user) {
      setUsername(user.charAt(0).toUpperCase());
    }
  }, [username]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('user');
    localStorage.removeItem('id');

    navigate("/");
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
