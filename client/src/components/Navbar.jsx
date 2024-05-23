import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../Styles/navbar.css";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../auth/authSlice'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const [admin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    console.log(userData);
    if (userData && userData.role === 'admin') {
      setIsAdmin(true);
      navigate("/home")
    }
  }, []);
  console.log(admin);  

  const handleLogout = () => {
    // Dispatch the logout action to clear the Redux state
    dispatch(logout());

    // Clear local storage items related to authentication
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');
    localStorage.removeItem('expirationDate');
    navigate('/home');
  };

  return (
    <nav className='navbar'>
      <div className='navbar-brand'>
        <h1 className='navbar-title'>Navbar</h1>
      </div>
      <ul className='nav-links'>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/product">Product</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {
          admin ? <li><Link to="/createproduct">Create</Link></li> : null
        }
        {
          isAuthenticated ?
          null :
          <li><Link to="/register">Register</Link></li>
        }
        {
          isAuthenticated ? 
          <li>
            <button 
              onClick={handleLogout} 
              className='font-semibold hover:bg-red-800 hover:text-white rounded-md bg-sky-500 pl-2 pr-2 p-[2px]'
            >
              LOGOUT
            </button>
          </li> :
          <li><Link to="/login">Login</Link></li>
        }
      </ul>
    </nav>
  );
}

export default Navbar;
