import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.username, formData.password);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>social network</h1>
          <p>Connect with friends and the world around you on Social Network.</p>
        </div>
        
        <div className="login-form-container">
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="text"
              name="username"
              placeholder="Email or username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            
            {error && <div className="error-message">{error}</div>}
            
            <button type="submit" disabled={loading} className="login-button">
              {loading ? 'Logging in...' : 'Log In'}
            </button>
            
            <div className="login-divider">
              <span>or</span>
            </div>
            
            <button 
              type="button"
              onClick={() => onNavigate('register')} 
              className="create-account-button"
            >
              Create New Account
            </button>
          </form>
          
          <div className="login-footer">
            <a href="#" onClick={(e) => e.preventDefault()}>Forgotten password?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
