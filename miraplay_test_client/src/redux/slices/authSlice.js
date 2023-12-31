import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/Variables';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (config) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });

    if(!response.ok) {
      
      const errorText = await response.text();
      throw (errorText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const response = await fetch(`${BASE_URL}/auth/me`, {
    method: 'GET',
    headers: {
      'Authorization': window.localStorage.getItem('token'),
    },
  });

  if(!response.ok) {
    throw new Error('No acces');
  }

  const data = await response.json();
  return data;
});

const initialState = {
  data: window.localStorage.getItem('token') || null,
  errorMessage: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers : {
    logout: (state) => {
      state.data = null;
      state.errorMessage = null;
    },
    resetErrors: (state) => {
      state.errorMessage = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.errorMessage = null;
        state.data = action.payload;
      })
      .addCase(fetchAuthMe.rejected, (state) => { 
        state.errorMessage = null;
        state.data = null;
      })
      .addCase(fetchAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => { 
        state.errorMessage = null;
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.errorMessage = JSON.parse(action.error.message).message;
        state.isLoading = false;
      });
    
  },
});

export const authReducer = authSlice.reducer;

export const { logout, resetErrors } = authSlice.actions;


