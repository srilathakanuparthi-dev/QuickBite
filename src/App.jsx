
import { useState,useEffect} from 'react';
import './App.css';
import About from './components/About';
import landscape from './assets/quickbite-landscape.png';
import googleIcon from './assets/google.png';
import appleIcon from './assets/apple.png';
import Welcome from './components/Welcome';
import FoodHome from './components/FoodHome';

function App() {
  const[firstName,setFirstName]=useState('');
  const[lastName,setLastName]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[agreed,setAgreed]=useState(false);
  const[message,setMessage]=useState('');
  const[isLogin,setIsLogin]=useState(false);
  //const [showFoodHome, setShowFoodHome] = useState(false);
  const [page, setPage] = useState('auth');
 
  useEffect(() => {
  if (page === 'welcome') {
    const timer = setTimeout(() => {
      setPage('home');
    }, 2000);

    return () => clearTimeout(timer);
  }
}, [page]);

if (page === 'welcome') {
  return <Welcome />;
}

if (page === 'home') {
  return <FoodHome
  setPage={setPage}
  firstName={firstName}
  lastName={lastName}
  email={email}
/>;
}

if (page === 'about') {
  return <About />;
}
  return (
    <div className="signup-page">
      <div className="signup-card">

        <div className="left-panel">
          <img src={landscape}
          alt="QuickBite landscape"
          className="landscape-img"/>

          <div className="brand-text">
          <h1>🍔 QuickBite</h1>
          <p>Good Food • Happy Mood</p>
        </div>
        </div>

        <div className="right-panel">
          <h2>{isLogin ? "Wlcome Back" : "Create an account"}</h2>
          <p className="login-text">
            {isLogin ? "Don't have an account?" : "Already have an account?"} 
            <a href="#" 
            onClick={(e)=>{e.preventDefault();
              setIsLogin(!isLogin);
              setMessage('');
            }}>{isLogin? "Sign up" : "Log in"}</a>
          </p>

          
      <form onSubmit={(e) => {
          e.preventDefault();
          setMessage('');

        if (!email || !password) {
            setMessage('Please enter your email and password.');
            return;
          }

          if (!isLogin) {
              if (!firstName || !lastName) {
                  setMessage('Please fill in your first and last name.');
                  return;
            }

            if (!agreed) {
            setMessage('Please accept the terms & conditions.');
              return;
            } 

            setMessage('Account Created Sucessfully');
    
            } else {
            setMessage('Login form submitted successfully!');
            setPage('welcome');
          }
        }}>

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

  <input
    type="password"
    placeholder="Enter your password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
    {isLogin && (
  <p className="forgot-password">
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        setMessage("Please contact support to reset your password.");
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

  {message && <p className="form-message">{message}</p>}
</form>
          <p className="register-text">Or register with</p>

          <div className="social-buttons">
            <button type="button">
              <img src={googleIcon} alt="Google" className="social-icon"/>
              Google </button>
            <button type="button">
              <img src={appleIcon} alt="Apple" className="social-icon"/>
              Apple</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
