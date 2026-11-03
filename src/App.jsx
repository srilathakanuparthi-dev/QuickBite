
import { useState, useEffect } from 'react';
import './App.css';

import About from './components/About';
import landscape from './assets/quickbite-landscape.png';
import googleIcon from './assets/google.png';
import appleIcon from './assets/apple.png';
import Welcome from './components/Welcome';
import FoodHome from './components/FoodHome';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [page, setPage] = useState('auth');
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState(null);

  // Automatically navigate from welcome page to home
  useEffect(() => {
    if (page === 'welcome') {
      const timer = setTimeout(() => {
        setPage('home');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [page]);

  // Welcome page
  if (page === 'welcome') {
    return <Welcome />;
  }

  // Home page
  if (page === 'home') {
    return (
      <FoodHome
    setPage={setPage}
    firstName={firstName}
    lastName={lastName}
    email={email}
    userId={userId}
/>
    );
  }

  // About page
  if (page === 'about') {
    return <About />;
  }

  // Login and signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!email.trim() || !password) {
      setMessage('Please enter your email and password.');
      return;
    }

    if (!isLogin) {
      if (!firstName.trim() || !lastName.trim()) {
        setMessage('Please fill in your first and last name.');
        return;
      }

      if (!agreed) {
        setMessage('Please accept the terms & conditions.');
        return;
      }
    }

    try {
      const url = isLogin
        ? 'http://localhost:8080/api/users/login'
        : 'http://localhost:8080/api/users/signup';

      const requestBody = isLogin
        ? {
            email: email.trim(),
            password: password,
          }
        : {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            password: password,
          };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();

      if (!response.ok) {
    setMessage(
        result.message ||
        (isLogin
            ? 'Login failed. Please check your details.'
            : 'Signup failed. Please try again.')
    );
    return;
}
      if (isLogin) {
    setUserId(result.userId);
    setFirstName(result.firstName);
    setLastName(result.lastName);
    setEmail(result.email);
    setPage('welcome');
} else {
    setUserId(result.userId);
    setFirstName(firstName.trim());
    setLastName(lastName.trim());
    setEmail(email.trim());
    setMessage('Account created successfully!');
    setPage('welcome');
}
    } catch (error) {
      console.error('Signup/Login error:', error);

      setMessage(
        'Could not connect to the backend. Please check Spring Boot.'
      );
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="left-panel">
          <img
            src={landscape}
            alt="QuickBite landscape"
            className="landscape-img"
          />

          <div className="brand-text">
            <h1>🍔 QuickBite</h1>
            <p>Good Food • Happy Mood</p>
          </div>
        </div>

        <div className="right-panel">
          <h2>{isLogin ? 'Welcome Back' : 'Create an account'}</h2>

          <p className="login-text">
            {isLogin
              ? "Don't have an account?"
              : 'Already have an account?'}

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsLogin(!isLogin);
                setMessage('');
              }}
            >
              {isLogin ? ' Sign up' : ' Log in'}
            </a>
          </p>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="name-fields">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? 'Hide password' : 'Show password'
                }
              >
                {showPassword ? '🙈' : '👁'}
              </button>
            </div>

            {isLogin && (
              <p className="forgot-password">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setMessage(
                      'Please contact support to reset your password.'
                    );
                  }}
                >
                  Forgot password?
                </a>
              </p>
            )}

            {!isLogin && (
              <label className="terms">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                I agree to the <a href="#">terms &amp; conditions</a>
              </label>
            )}

            <button type="submit">
              {isLogin ? 'Log in →' : 'Create account →'}
            </button>

            {message && (
              <p className="form-message">{message}</p>
            )}
          </form>

          <p className="register-text">Or register with</p>

          <div className="social-buttons">
            <button type="button">
              <img
                src={googleIcon}
                alt="Google"
                className="social-icon"
              />
              Google
            </button>

            <button type="button">
              <img
                src={appleIcon}
                alt="Apple"
                className="social-icon"
              />
              Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
