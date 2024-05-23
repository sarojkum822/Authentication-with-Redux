import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../auth/authSlice';

const Register = () => {
  const [userData, setUserData] = useState({
    fullname: '',
    email: '',
    password: '',
    contact: '',
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
    // Clear validation error if the user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
      dispatch(register(userData));
  
    
  };

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='border-2 p-10 flex gap-10 rounded-md'>
        <div className=' p-10 border-2 flex flex-col rounded-md'>
          <h1 className='text-4xl font-bold text-center'>Register</h1>
          <p className='text-gray-500 text-center'>
            Already have an account?
            <span className='text-blue-500 cursor-pointer'><a href="/login">Login</a></span>
          </p>
        </div>
      <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
        <input
          type='text'
          placeholder='Full name'
          name='fullname'
          value={userData.fullname}
          onChange={handleChange}
          className='w-[300px] p-2 border border-gray-300 rounded'
        />
        {errors.fullname && <span className='text-red-500'>{errors.fullname}</span>}
        <input
          type='email'
          placeholder='Email'
          name='email'
          value={userData.email}
          onChange={handleChange}
          className='w-[300px] p-2 border border-gray-300 rounded'
        />
        {errors.email && <span className='text-red-500'>{errors.email}</span>}
        <input
          type='password'
          placeholder='Password'
          name='password'
          value={userData.password}
          onChange={handleChange}
          className='w-[300px] p-2 border border-gray-300 rounded'
        />
        {errors.password && <span className='text-red-500'>{errors.password}</span>}
        <input
          type='text'
          placeholder='Contact'
          name='contact'
          value={userData.contact}
          onChange={handleChange}
          className='w-[300px] p-2 border border-gray-300 rounded'
        />
        <button type='submit' className='p-2 bg-blue-500 text-white rounded'>
          Submit
        </button>
      </form>
      </div>
    </div>
  );
};

export default Register;
