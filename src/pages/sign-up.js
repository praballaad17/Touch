import { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { registerUser } from '../services/authenticationServices';

export default function SignUp({ user: loggedInUser }) {

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      await registerUser(username, fullName, emailAddress, password);
      window.location = "/"
    } catch (error) {
      console.log(error.response);
      setFullName('');
      setEmailAddress('');
      setPassword('');
      setError(error.message);
    }
    // } else {
    //   setUsername('');
    //   setError('That username is already taken, please try another.');
    // }
  };

  useEffect(() => {
    document.title = 'Sign Up - Touch';
  }, []);

  if (loggedInUser) return <Redirect to={ROUTES.DASHBOARD} />

  return (
    <div className="login">

      <div className="login__box">
        <div className="login__box--sub">
          <h1 className="login__box--head">
            Touch
          </h1>

          {error && <p className="login__box--error">{error}</p>}

          <form className="login__form" onSubmit={handleSignUp} method="POST">
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="login__form--input"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
            <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full name"
              className="login__form--input"
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="login__form--input"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="login__form--input"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`btn btn-login
            ${isInvalid && 'u-opacity-50'}`}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="login__box--foot">
          <p className="login__box--foot--content">
            Have an account?{` `}
            <Link to={ROUTES.LOGIN} className="u-text-blue">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
