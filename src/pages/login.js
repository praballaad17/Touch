import { useState, useEffect } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { login } from '../services/authenticationServices'

export default function Login({ user: loggedInUser }) {
  const location = useLocation()
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true)
    try {
      await login(emailAddress, password);
      setLoading(false)
      window.location = "/"
    } catch (error) {
      setEmailAddress('');
      setPassword('');
      setError(error.message);
      setLoading(false)
    }
  };

  useEffect(() => {
    document.title = 'Login - Touch';
  }, []);


  if (loggedInUser) return <Redirect to={ROUTES.TIMELINE} />

  return (
    <div className="login">

      <div className="login__box">
        {loading ? <ul className="modal-box__list">
          <li className="progress__box">
            <span class="progress-bar"></span>
          </li>
          {/* <li className="modal-box__item" >{progress}</li> */}
        </ul> : <></>}
        <div className="login__box--sub">
          <h1 className="login__box--head">
            Touch
          </h1>

          {error && <p className="login__box--error">{error}</p>}

          <form className="login__form" onSubmit={handleLogin} method="POST">
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
              Login
            </button>
          </form>
        </div>

        <div className="login__box--foot">
          <p className="login__box--foot--content">
            Don't have an account?{` `}
            <Link to={ROUTES.SIGN_UP} className="u-text-blue">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
