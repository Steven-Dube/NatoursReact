import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Navbar.css'
import cartImage from '../images/cart-large-minimalistic-svgrepo-com.svg'

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate('/login', { replace: true });
  }

  return (
    <div className='background'>
      <h1 className='title'>Natours</h1>
      <div className='rightSide'>
        <img src={cartImage} className='cartImage' alt='cart' />
        <div className='disconnectButton' onClick={logout}>Logout</div>
      </div>
    </div>
  );
}

export default Navbar;