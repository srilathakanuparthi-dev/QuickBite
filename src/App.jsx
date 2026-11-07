
import { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';

import About from './components/About';
import landscape from './assets/quickbite-landscape.png';
import googleIcon from './assets/google.png';
import appleIcon from './assets/apple.png';
import Welcome from './components/Welcome';
import FoodHome from './components/FoodHome';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

function App() {
  // Restore saved login details
  const [firstName, setFirstName] = useState(
    localStorage.getItem('firstName') || ''
  );

  const [lastName, setLastName] = useState(
    localStorage.getItem('lastName') || ''
  );

  const [email, setEmail] = useState(
    localStorage.getItem('email') || ''
  );

  const [userId, setUserId] = useState(
    localStorage.getItem('userId') || null
  );

  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  );

  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem('refreshToken') || ''
  );

  const [page, setPage] = useState(
    localStorage.getItem('token') &&
    localStorage.getItem('refreshToken')
      ? 'home'
      : 'auth'
  );

  const [sessionReady, setSessionReady] = useState(false);

  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [message, setMessage] = useState('');

  const [isLogin, setIsLogin] = useState(
    !!localStorage.getItem('token')
  );

  const [showPassword, setShowPassword] = useState(false);

  const lastRefreshTime = useRef(0);
  const refreshInProgress = useRef(null);
  const logoutInProgress = useRef(false);

  // Logout
  const handleLogout = useCallback(async () => {
    if (logoutInProgress.current) return;

    logoutInProgress.current = true;

    const savedRefreshToken =
      localStorage.getItem('refreshToken');

    // Clear local session immediately
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('email');

    setToken('');
    setRefreshToken('');
    setUserId(null);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setIsLogin(true);
    setMessage('');
    setPage('auth');
    setSessionReady(true);

    // Invalidate refresh token in backend
    try {
      if (savedRefreshToken) {
        await fetch(`${API_URL}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refreshToken: savedRefreshToken,
          }),
        });
      }
    } catch (error) {
      console.error('Backend logout error:', error);
    } finally {
      logoutInProgress.current = false;
    }
  }, []);

  // Refresh access token
  const refreshSession = useCallback(async () => {
    // Avoid multiple simultaneous refresh requests
    if (refreshInProgress.current) {
      return refreshInProgress.current;
    }

    const savedRefreshToken =
      localStorage.getItem('refreshToken');

    if (!savedRefreshToken) {
      await handleLogout();
      return false;
    }

    refreshInProgress.current = (async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/auth/refresh`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              refreshToken: savedRefreshToken,
            }),
          }
        );

        if (response.status === 401) {
          await handleLogout();
          return false;
        }

        if (!response.ok) {
          // Temporary server/network error.
          // Keep existing session and try again later.
          console.error('Refresh request failed:', response.status);
          return false;
        }

        const result = await response.json();

        if (!result.token) {
          console.error('Access token missing in refresh response');
          return false;
        }

        localStorage.setItem('token', result.token);
        setToken(result.token);

        if (result.refreshToken) {
          localStorage.setItem(
            'refreshToken',
            result.refreshToken
          );
          setRefreshToken(result.refreshToken);
        }

        return true;

      } catch (error) {
        console.error('Session refresh error:', error);
        return false;
      } finally {
        refreshInProgress.current = null;
      }
    })();

    return refreshInProgress.current;
  }, [handleLogout]);

  
const apiFetch = useCallback(async (url, options = {}) => {
  const makeRequest = (accessToken) => {
    const headers = new Headers(options.headers || {});

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return fetch(url, {
      ...options,
      headers,
    });
  };

  const currentToken = localStorage.getItem('token');
  let response = await makeRequest(currentToken);

  // Access token expired: refresh and retry once
  if (response.status === 401) {
    const refreshed = await refreshSession();

    if (!refreshed) {
      return response;
    }

    const newToken = localStorage.getItem('token');

    response = await makeRequest(newToken);

    // If the new token is also rejected, end the session
    if (response.status === 401) {
      await handleLogout();
    }
  }

  return response;
}, [refreshSession, handleLogout]);


  // Restore session when app opens
  useEffect(() => {
    let cancelled = false;

    const restoreSession = async () => {
      const savedToken = localStorage.getItem('token');
      const savedRefreshToken =
        localStorage.getItem('refreshToken');

      if (!savedToken || !savedRefreshToken) {
        if (savedToken || savedRefreshToken) {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('userId');
          localStorage.removeItem('firstName');
          localStorage.removeItem('lastName');
          localStorage.removeItem('email');

          setToken('');
          setRefreshToken('');
          setUserId(null);
          setFirstName('');
          setLastName('');
          setEmail('');
          setPage('auth');
        }

        if (!cancelled) {
          setSessionReady(true);
        }

        return;
      }

      const success = await refreshSession();

      if (!cancelled) {
        if (!success && !localStorage.getItem('token')) {
          setPage('auth');
        }

        setSessionReady(true);
      }
    };

    restoreSession();

    return () => {
      cancelled = true;
    };
  }, [refreshSession]);

  // Track user activity and extend session
  useEffect(() => {
    const handleActivity = () => {
      if (!localStorage.getItem('refreshToken')) return;

      const now = Date.now();

      // Refresh once every 10 minutes of activity
      if (
        now - lastRefreshTime.current >=
        10 * 60 * 1000
      ) {
        lastRefreshTime.current = now;
        refreshSession();
      }
    };

    window.addEventListener('click', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('touchstart', handleActivity);
    window.addEventListener('mousemove', handleActivity);

    return () => {
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      window.removeEventListener('mousemove', handleActivity);
    };
  }, [refreshSession]);

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
    if (!sessionReady) {
      return <div>Restoring your session...</div>;
    }

    if (!token || !refreshToken) {
      return null;
    }

    return (
      <FoodHome
  setPage={setPage}
  firstName={firstName}
  lastName={lastName}
  email={email}
  userId={userId}
  token={token}
  apiFetch={apiFetch}
  onLogout={handleLogout}
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
        setMessage(
          'Please fill in your first and last name.'
        );
        return;
      }

      if (!agreed) {
        setMessage(
          'Please accept the terms & conditions.'
        );
        return;
      }
    }

    try {
      const url = isLogin
        ? `${API_URL}/api/users/login`
        : `${API_URL}/api/users/signup`;

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
        if (!result.token || !result.refreshToken) {
          setMessage(
            'Login response is missing authentication tokens.'
          );
          return;
        }

        // Save tokens and user details
        localStorage.setItem('token', result.token);
        localStorage.setItem(
          'refreshToken',
          result.refreshToken
        );
        localStorage.setItem('userId', result.userId);
        localStorage.setItem('firstName', result.firstName);
        localStorage.setItem('lastName', result.lastName);
        localStorage.setItem('email', result.email);

        // Update React state
        setToken(result.token);
        setRefreshToken(result.refreshToken);
        setUserId(result.userId);
        setFirstName(result.firstName);
        setLastName(result.lastName);
        setEmail(result.email);

        lastRefreshTime.current = Date.now();

        setSessionReady(true);
        setPage('welcome');

      } else {
        setMessage(
          'Account created successfully! Please login.'
        );
        setIsLogin(true);
        setPassword('');
        setPage('auth');
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
          <h2>
            {isLogin ? 'Welcome Back' : 'Create an account'}
          </h2>

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
                  onChange={(e) =>
                    setFirstName(e.target.value)
                  }
                />

                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) =>
                    setLastName(e.target.value)
                  }
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
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                aria-label={
                  showPassword
                    ? 'Hide password'
                    : 'Show password'
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
                  onChange={(e) =>
                    setAgreed(e.target.checked)
                  }
                />
                I agree to the{' '}
                <a href="#">terms &amp; conditions</a>
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
