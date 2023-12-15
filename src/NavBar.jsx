import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css'
import { useNavigate } from 'react-router';
import axios from 'axios';

const NavBar = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setLoggedIn] = useState(false); 
  const [currentUsername, setCurrentUsername] = useState(''); 
  const [isDropdownOpen, setDropdownOpen] = useState(false);

async function getUsername() {
    const response = await axios.get('/api/user/isLoggedIn')
    if(response.data.username) {
        setLoggedIn(true)
        setCurrentUsername(response.data.username)
    }
  }

  useEffect(() => {
    getUsername();
  }, []);

  const handleLogout = () => {
    logOut()
  };

  const handleGoToProfile = () => {
    goToUserPage();
  }

  async function logOut() {
    await axios.post('/api/user/logout', {})
    navigate('/login')
  }
  async function goToUserPage() {
    navigate('/user/' + currentUsername);
    window.location.reload();
  }

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <div className="navbar-right">
        {isLoggedIn ? (
          <div className="dropdown">
            <button className="dropbtn" onClick={toggleDropdown}>{currentUsername} &#9660;</button>
            {isDropdownOpen && (
              <div className="dropdown-content">
                <Link onClick={handleGoToProfile}>My Profile</Link>
                <Link onClick={handleLogout}>Logout</Link>
              </div>
            )}
          </div>
        ) : (
          <div className="navbar-buttons">
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
