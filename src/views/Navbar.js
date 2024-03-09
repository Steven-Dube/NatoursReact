import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css'
import cartImage from '../images/cart-large-minimalistic-svgrepo-com.svg'

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    document.cookie = '';
    navigate('/login', { replace: true });
  }

  return (
    <div className='background'>
      <h1 className='title'>Natours</h1>
        <div className='rightSide'>
            <img src={cartImage} className='cartImage' alt='cart'/>
            <div className='navbarButton' onClick={logout}>Logout</div>
            <div className='navbarButton'>
                <Link to='/about' className='navbarLink'>About</Link>
            </div>
        </div>
    </div>
  );
}

export default Navbar;