import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  

  const handleError = () => {
    console.log('Login Failed');
  };

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (isAuthenticated || email) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='border-2 p-10 rounded-lg'>
        <div className='flex gap-10'>
          <div className='border-2 p-10 rounded-lg'>
            <h1 className='text-3xl font-bold '>Login</h1>
            <p className='text-gray-500'>Login to your account</p>
          </div>
          <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
            <input
              type='email'
              placeholder='Email'
              name='email'
              value={userData.email}
              onChange={handleChange}
              className='p-2 border border-gray-300 rounded'
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={userData.password}
              onChange={handleChange}
              className='p-2 border border-gray-300 rounded'
            />
            
            {error && <span className='text-red-500'>{error}</span>}
            <button type='submit' className='p-2 bg-blue-500 text-white rounded' disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
