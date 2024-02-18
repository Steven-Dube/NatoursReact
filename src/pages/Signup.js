import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUserSelectedTours } from "../utils/LocalStorageUtil";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateName
} from "../utils/UserCredentialsValidator";
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');
  const [emailAlreadyTaken, setEmailAlreadyTaken] = useState(false);
  const [unexpectedError, setUnexpectedError] = useState(false);

  const signup = () => {
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setPasswordConfirmError('');
    setEmailAlreadyTaken(false);
    setUnexpectedError(false);

    if (!validateName(name)) {
      setNameError('Please enter a name at least 1 character long');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('The password must be 8 characters or longer');
      return;
    }

    if (!validateConfirmPassword(password, passwordConfirm)) {
      setPasswordConfirmError('The confirm password does not match the password');
      return;
    }

    fetch(`${process.env.REACT_APP_API}/users/signup`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm
      })
    }).then(res => {
      if(res.status === 200) {
        res.json().then(userData => {
          setUserSelectedTours(userData.user.id, userData.user.name);
          localStorage.setItem("token", userData.user.token);
          const now = new Date();
          document.cookie = `currentUserId=${userData.user.id}; path=/; expires=${now.setDate(now.getDate() + 1)}`;
          navigate("/tours", { replace: true });
        });
      } else if(res.status === 409) {
        setEmailAlreadyTaken(true);
      } else {
        setUnexpectedError(true);
      }
    }).catch(_ => {
      setUnexpectedError(true);
    });
  }

  return (
    <div className='signupBackground'>
      <div className="formContainer">
        <h1 className='centeredText'>Signup</h1>
        <div>
          <form>
            <div className="inputContainer">
              <p>Name:</p>
              <input type="text"
                     placeholder='Enter your name...'
                     required value={name}
                     onChange={val => setName(val.target.value)}
              />
              <p className='errorMessage'>{nameError}</p>
            </div>

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
                     placeholder='Enter a password...'
                     required
                     value={password}
                     onChange={val => setPassword(val.target.value)}
              />
              <p className="errorMessage">{passwordError}</p>
            </div>

            <div className="inputContainer">
              <p>Password:</p>
              <input type="password"
                     placeholder='Confirm password...'
                     required
                     value={passwordConfirm}
                     onChange={val => setPasswordConfirm(val.target.value)}
              />
              <p className="errorMessage">{passwordConfirmError}</p>
            </div>

            <div className="inputContainer">
              <input className="inputButton" type="button" value="Sign up" onClick={signup} />
            </div>

          </form>
          {emailAlreadyTaken &&
            <p className='errorMessage centeredText'>A user with the entered email is already registered</p>
          }
          {unexpectedError &&
            <p className='errorMessage centeredText'>An unexpected error occurred</p>
          }
        </div>
      </div>
    </div>
  );
};

export default Signup;