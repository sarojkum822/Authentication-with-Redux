import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Set the expiration time to 1 hour (3600000 milliseconds)
const EXPIRATION_TIME = 3600000;

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await axios.post('http://localhost:8080/api/users/login', credentials, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true
  });
  const data = response.data;
  const expirationDate = new Date().getTime() + EXPIRATION_TIME;
  localStorage.setItem('authToken', data.token);
  localStorage.setItem('isAuthenticated', 'true');
  localStorage.setItem('userData', JSON.stringify(data.user));
  localStorage.setItem('expirationDate', expirationDate);
  return data;
});

export const register = createAsyncThunk('auth/register', async (userData) => {
  const response = await axios.post('http://localhost:8080/api/users/register', userData);
  const data = response.data;
  const expirationDate = new Date().getTime() + EXPIRATION_TIME;
  localStorage.setItem('authToken', data.token);
  localStorage.setItem('isAuthenticated', 'true');
  localStorage.setItem('userData', JSON.stringify(data.user));
  localStorage.setItem('expirationDate', expirationDate);
  return data;
});

const initialState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' || false,
  user: JSON.parse(localStorage.getItem('userData')) || null,
  loading: false,
  error: null,
  token: localStorage.getItem('authToken') || "",
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userData');
      localStorage.removeItem('expirationDate');
    },
    setAuth: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      const expirationDate = new Date().getTime() + EXPIRATION_TIME;
      localStorage.setItem('authToken', action.payload.token);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userData', JSON.stringify(action.payload.user));
      localStorage.setItem('expirationDate', expirationDate);
    },
    checkExpiration: (state) => {
      const expirationDate = localStorage.getItem('expirationDate');
      if (expirationDate && new Date().getTime() > expirationDate) {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem('authToken');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userData');
        localStorage.removeItem('expirationDate');
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.error;
        state.loading = false;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.error;
        state.loading = false;
      });
  },
});

export const { logout, setAuth, checkExpiration } = authSlice.actions;
export default authSlice.reducer;
