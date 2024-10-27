import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import UserService from '../Service/UserService';
import './Navbar.css';
import { FaBell, FaEnvelope } from 'react-icons/fa';
import axios from 'axios';

function Navbar() {
  const isAuthenticated = UserService.isAuthenticated();
  const isMain = UserService.isOrganization();
  const isUser = UserService.isUser();
  const isAdmin = UserService.isAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showMessages, setShowMessages] = useState(false);
  const [messages, setMessages] = useState([]);
  const [expandedNotification, setExpandedNotification] = useState(null);
  const [expandedMessage, setExpandedMessage] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
      if (isAdmin) fetchMessages();
    }
  }, [isAuthenticated, isAdmin]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/notifications/all-notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8080/messages/all-messages', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      UserService.logout();
      navigate('/login');
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleMessages = () => {
    setShowMessages(!showMessages);
  };

  const handleClickOutside = (event) => {
    if (showNotifications && event.target.closest('.notification-panel') === null) {
      setShowNotifications(false);
    }
    if (showMessages && event.target.closest('.message-panel') === null) {
      setShowMessages(false);
    }
  };

  useEffect(() => {
    if (showNotifications || showMessages) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications, showMessages]);

  const toggleExpandNotification = (id) => {
    if (expandedNotification === id) {
      setExpandedNotification(null);
    } else {
      setExpandedNotification(id);
      markNotificationAsRead(id);
    }
  };

  const toggleExpandMessage = (id) => {
    if (expandedMessage === id) {
      setExpandedMessage(null);
    } else {
      setExpandedMessage(id);
      markMessageAsRead(id);
    }
  };

  const markNotificationAsRead = async (id) => {
    try {
      await axios.post(`http://localhost:8080/notifications/mark-as-read/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(notifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markMessageAsRead = async (id) => {
    try {
      await axios.post(`http://localhost:8080/messages/mark-as-read/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(messages.map(message =>
        message.id === id ? { ...message, isRead: true } : message
      ));
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <img src='massmutual.webp' alt="MassMutual Logo" className="logo" />
        <ul className="links">
          {isAdmin && <li><Link to="/all-claims" className={location.pathname === '/all-claims' ? 'active' : ''}>Home</Link></li>}
          {isAdmin && <li><Link to="/adminHome" className={location.pathname === '/adminHome' ? 'active' : ''}>Your Work</Link></li>}
          {!isAdmin && !isMain && <li><Link to="/home" className={(location.pathname === '/home' || location.pathname === '/') ? 'active' : ''}>Home</Link></li>}
          {!isAdmin && !isMain && <li><Link to="/new-claim" className={location.pathname === '/new-claim' ? 'active' : ''}>New Claim</Link></li>}
          {!isAdmin && !isMain && <li><Link to="/policy" className={location.pathname === '/policy' ? 'active' : ''}>Policy</Link></li>}
          {!isAdmin && !isMain && <li><Link to="/my-claims" className={location.pathname === '/my-claims' ? 'active' : ''}>My Claims</Link></li>}
          {isAuthenticated && isMain && <li><Link to="/Organizationhome" className={location.pathname === '/Organizationhome' ? 'active' : ''}>Home</Link></li>}
          {isAuthenticated && isMain && <li><Link to="/all-agents" className={location.pathname === '/all-agents' ? 'active' : ''}>All Agents</Link></li>}
          {isAuthenticated && isMain && <li><Link to="/all-users" className={location.pathname === '/all-users' ? 'active' : ''}>All Users</Link></li>}
          {isAuthenticated && isMain && <li><Link to="/analysis" className={location.pathname === '/analysis' ? 'active' : ''}>Analysis</Link></li>}
        </ul>
        <div className="buttonDiv">
          {isAuthenticated && <button className='out' onClick={handleLogout}>Logout</button>}
          {!isAuthenticated && <Link to="/login"><button className='in'>Login</button></Link>}
          {isAuthenticated && isMain && <Link to="/admin-register"><button className='new1'>Register a new Agent</button></Link>}
          {!isAuthenticated && <Link to="/register"><button className='in'>Register</button></Link>}
          {isAuthenticated && !isAdmin && !isMain && (
            <div className="notification-icon" onClick={toggleNotifications}>
              <FaBell size={24} color="white" />
              <span className="notification-count">{notifications.filter(notification => !notification.read).length}</span>
            </div>
          )}
          {isAuthenticated && isAdmin && (
            <div className="message-icon" onClick={toggleMessages}>
              <FaEnvelope size={24} color="white" />
              <span className="message-count">{messages.filter(message => !message.isRead).length}</span>
            </div>
          )}
        </div>
      </nav>

      {showNotifications && (
        <div className="notification-panel">
          <h3 style={{ marginLeft: '95px' }}>Notifications</h3>
          <hr />
          {notifications.length === 0 ? (
            <p style={{ marginLeft: '60px' }}>No notifications available</p>
          ) : (
            <ul>
              {notifications.map((notification) => (
                <li id='messagesid' key={notification.id} onClick={() => toggleExpandNotification(notification.id)}>
                  <strong style={{ color: 'white' }}>Message from Agent</strong>
                  {expandedNotification === notification.id && <p>{notification.message}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {showMessages && (
        <div className="message-panel">
          <h3 style={{ marginLeft: '95px' }}>Messages</h3>
          <hr/>
          {messages.length === 0 ? (
            <p style={{ marginLeft: '60px' }}>No messages available</p>
          ) : (
          <ul>
            {messages.map((message) => (
              <li style={{ color: 'white' }} key={message.id} onClick={() => toggleExpandMessage(message.id)}>
                <strong style={{ color: 'white' }}>Sent by:</strong> {message.sentBy}
                {expandedMessage === message.id && <p>{message.message}</p>}
              </li>
            ))}
          </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
