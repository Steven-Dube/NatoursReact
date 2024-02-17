import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setUserSelectedTours } from "../utils/LocalStorageUtil";
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [credentialsMatch, setCredentialsMatch] = useState(true);
  const [unexpectedError, setUnexpectedError] = useState(false);

  const login = () => {
    setEmailError('');
    setPasswordError('');
    setCredentialsMatch(true);
    setUnexpectedError(false);

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    fetch(`${process.env.REACT_APP_API}/users/login`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(res => {
      if(res.status === 200) {
        res.json().then(userData => {
          setUserSelectedTours(userData.user.id, userData.user.name);
          localStorage.setItem("token", userData.user.token);
          navigate('/tours', { replace: true });
        });
      } else if(res.status === 401) {
        setCredentialsMatch(false);
      } else {
        setUnexpectedError(true);
      }
    }).catch(_ => {
      setUnexpectedError(true);
    });
  }

  return (
    <div className='loginBackground'>
      <div className="formContainer">
        <h1 className='centeredText'>Login</h1>
        <div>
          <form>
            <div className="inputContainer">
              <p>Email:</p>
              <input type="email"
                     placeholder='Enter your email...'
                     required value={email}
                     onChange={val => setEmail(val.target.value)}
              />
              <p className='errorMessage'>{emailError}</p>
            </div>
            <div className="inputContainer">
              <p>Password:</p>
              <input type="password"
                     placeholder='Enter your password...'
                     required
                     value={password}
                     onChange={val => setPassword(val.target.value)}
              />
              <p className="errorMessage">{passwordError}</p>
            </div>
            <div className="inputContainer">
              <input className="inputButton" type="button" value="Log" onClick={login} />
            </div>
          </form>
          {!credentialsMatch &&
            <p className='errorMessage centeredText'>Email and password do not match</p>
          }
          {unexpectedError &&
            <p className='errorMessage centeredText'>An expected error occurred</p>
          }
          <Link className='centeredText' to='/signup'>Not a member? Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;