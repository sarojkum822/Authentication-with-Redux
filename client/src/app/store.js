import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/authSlice';  // Import the default export
import productReducer from '../auth/productSlice'; // Import the default export

export const store = configureStore({
  reducer: {
    auth: authReducer, 
    product: productReducer,
  },
});

export default store;
