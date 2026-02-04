// src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './App.css';
import bankidIcon from './assets/bankid.svg';

const API_URL = import.meta.env.VITE_API_URL + "/auth";

// --- REUSABLE COMPONENT: Social Buttons Stack ---
// --- ICONS (Internal SVG Components) ---
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const MicrosoftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
    <path fill="#f35325" d="M1 1h10v10H1z"/>
    <path fill="#81bc06" d="M12 1h10v10H12z"/>
    <path fill="#05a6f0" d="M1 12h10v10H1z"/>
    <path fill="#ffba08" d="M12 12h10v10H12z"/>
  </svg>
);


// --- UPDATE: SocialLoginStack Component ---
const SocialLoginStack = ({ handleGoogleSuccess }) => {
  // We use the "Implicit Flow" which returns an access_token
  const loginToGoogle = useGoogleLogin({
    onSuccess: tokenResponse => handleGoogleSuccess(tokenResponse),
  });

  return (
    <>
      <div className="divider"><span>Or</span></div>
      
      {/* 1. Google Button */}
      <button type="button" className="social-btn" onClick={() => loginToGoogle()}>
        <GoogleIcon />
        <span>Continue with Google</span>
      </button>

      {/* 2. Microsoft Button */}
      <button type="button" className="social-btn" onClick={() => alert('Microsoft Login Coming Soon')}>
        <MicrosoftIcon />
        <span>Continue with Microsoft</span>
      </button>

      {/* 3. BankID Button */}
      <button type="button" className="social-btn" onClick={() => alert('BankID Login Coming Soon')}>
        <img src={bankidIcon} alt="BankID" width="20" />
        <span>Continue with BankID</span>
      </button>
    </>
  );
};

// --- LOGIN PAGE ---
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // No more alert popups

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      // Professional inline error
      setError("Invalid email or password. Please try again.");
    }
  };

 // Inside Login() and Register()
const handleGoogleAuth = async (tokenResponse) => {
  try {
    const res = await axios.post(`${API_URL}/google-login`, { 
      accessToken: tokenResponse.access_token // Matches C# DTO property
    });
    localStorage.setItem('token', res.data.token);
    navigate('/dashboard');
  } catch (err) {
    console.error(err);
    setError("Google authentication failed.");
  }
};

  return (
    <div className="auth-container">
      <div className="brand-logo"><span className="logo-square"></span>PacificITS</div>
      <h1>Welcome back</h1>
      <p className="subtitle">Sign in to access real-time risk assessments, analytics, and safety intelligence.</p>

      {error && <div className="error-banner">{error}</div>}

      <form onSubmit={handleLogin}>
        <div className="input-group">
          <div className="input-label">Email</div>
          <input 
            className="input-field" 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        
        <div className="input-group">
           <div className="input-label">
             <span>Password</span>
             {/* Dummy Link */}
             <span className="link-text" onClick={() => alert("Coming soon!")} style={{fontSize:'0.8rem', fontWeight:'normal'}}>Forgot password?</span>
           </div>
          <input 
            className="input-field" 
            type="password" 
            placeholder="Enter your password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>

        <button type="submit" className="primary-btn">Sign in</button>
      </form>

      <SocialLoginStack handleGoogleSuccess={handleGoogleAuth} />

      <div className="footer-text">
        Don't have an account? <Link to="/register" className="link-text">Get Started</Link>
      </div>
    </div>
  );
}

// --- REGISTER PAGE ---
function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await axios.post(`${API_URL}/register`, { email, password });
      // On success, redirect to login or auto-login
      alert("Registration successful! Please login."); // This is a "good" popup, or you can auto-redirect
      navigate('/');
    } catch (err) {
      if(err.response && err.response.data) {
          // Display backend validation errors if available
          setError("Registration failed. Email might be taken.");
      } else {
          setError("Something went wrong. Please try again.");
      }
    }
  };

  // Inside Login() and Register()
const handleGoogleAuth = async (tokenResponse) => {
  try {
    const res = await axios.post(`${API_URL}/google-login`, { 
      accessToken: tokenResponse.access_token // Matches C# DTO property
    });
    localStorage.setItem('token', res.data.token);
    navigate('/dashboard');
  } catch (err) {
    console.error(err);
    setError("Google authentication failed.");
  }
};

  return (
    <div className="auth-container">
      <div className="brand-logo"><span className="logo-square"></span>Preventer</div>
      <h1>Create account</h1>
      <p className="subtitle">Start your journey with Preventer risk assessment tools.</p>

      {error && <div className="error-banner">{error}</div>}

      <form onSubmit={handleRegister}>
        <div className="input-group">
          <div className="input-label">Email</div>
          <input 
            className="input-field" 
            type="email" 
            placeholder="name@company.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        
        <div className="input-group">
          <div className="input-label">Password</div>
          <input 
            className="input-field" 
            type="password" 
            placeholder="Create a password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>

        <button type="submit" className="primary-btn">Get Started</button>
      </form>

      <SocialLoginStack handleGoogleSuccess={handleGoogleAuth} />

      <div className="footer-text">
        Already have an account? <Link to="/" className="link-text">Sign in</Link>
      </div>
    </div>
  );
}

// --- DASHBOARD (Unchanged) ---
function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  if(!token) {
     setTimeout(() => navigate('/'), 0);
     return null;
  }

  return (
    <div style={{textAlign:'center', marginTop: '50px'}}>
      <h1>Welcome to the Dashboard</h1>
      <button className="primary-btn" style={{width:'200px'}} onClick={() => { localStorage.removeItem('token'); navigate('/'); }}>Logout</button>
    </div>
  );
}

// --- App.jsx ---
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}