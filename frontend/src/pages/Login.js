import React, { useState } from 'react';
import Header from '../components/Header';
import Footers from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // new add code --------------
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  // new add code --------------

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ username, password });

    // new add code --------------
    if (username === 'admin' && password === 'admin123') {
      navigate('/Dashboard');
    } else if (username === 'user' && password === 'user123') {
      navigate('/');
    } else {
      setErrorMessage('Invalid username or password!');
    }
  };
  // new add code --------------

  const handleReset = () => {
    setUsername('');
    setPassword('');
    setErrorMessage('');
  };

  // New social login functions
  const handleGoogleLogin = () => {
    // Open Google login page
    window.open('https://accounts.google.com/signin', '_blank');
  };

  const handleTwitterLogin = () => {
    // Open Twitter login page
    window.open('https://twitter.com/login', '_blank');
  };

  const handleGitHubLogin = () => {
    // Open GitHub login page
    window.open('https://github.com/login', '_blank');
  };

  return (
    <div>
      <Header />
      <div className="login-container">
        <section className="astronaut-section">
          <div className="astronaut-info">
            <h2>
              Welcome back! Ready to <span>explore?</span>
            </h2>
            <p>
              Sign in to <span>ES CUSTOMS</span> and start customizing your ride.
            </p>
          </div>
        </section>

        <section className="login-form">
          <h1>
            Hello <span>User!</span>
          </h1>
          <h1>
            Login to your <span>Account</span>
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="user-box">
              <input
                type="text"
                name="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className={username ? 'shrink' : ''}>Username</label>
            </div>

            <div className="user-box">
              <input
                type="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className={password ? 'shrink' : ''}>Password</label>
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}

            <div className="form-buttons">
              <button type="submit" className="submit-btn">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Login
              </button>
            </div>

            <div className="form-buttons">
              <button type="button" className="submit-btn" onClick={handleReset}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Cancel
              </button>
            </div>
          </form>

          {/* Social Login Section */}
          <div className="social-message">
            <div className="line"></div>
            <p className="message"><span>Login with social accounts</span></p>
            <div className="line"></div>
          </div>

          <div className="social-icons">
            <button
              aria-label="Log in with Google"
              className="icon"
              onClick={handleGoogleLogin} // Handle Google login
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
            </button>

            <button
              aria-label="Log in with Twitter"
              className="icon"
              onClick={handleTwitterLogin} // Handle Twitter login
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                <path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z"></path>
              </svg>
            </button>

            <button
              aria-label="Log in with GitHub"
              className="icon"
              onClick={handleGitHubLogin} // Handle GitHub login
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.558-1.74 1.013-2.136-3.552-0.404-7.292-1.778-7.292-7.858 0-1.735 0.617-3.16 1.631-4.278-0.163-0.403-0.707-2.023 0.155-4.214 0 0 1.34-0.429 4.4 1.637 1.278-0.354 2.655-0.529 4.015-0.537 1.355 0.008 2.738 0.183 4.014 0.537 3.06-2.066 4.4-1.637 4.4-1.637 0.862 2.191 0.317 3.811 0.156 4.214 1.014 1.118 1.631 2.543 1.631 4.278 0 6.086-3.746 7.45-7.301 7.844 0.57 0.486 1.085 1.437 1.085 2.907 0 2.103-0.019 3.798-0.019 4.316 0 0.434 0.288 0.931 1.096 0.772 6.354-2.115 10.934-8.115 10.934-15.183 0-8.833-7.161-16-16-16z"></path>
              </svg>
            </button>
          </div>
        </section>
      </div>
      <Footers />
    </div>
  );
};

export default Login;
