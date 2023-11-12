import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/Variables';

export const fetchRegister = createAsyncThunk('register/fetchRegister', async (config) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
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

const initialState = {
  data: null,
  isLoading: false,
  errorMessage: null,
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    resetData: (state) => {
      state.data = null;
      state.errorMessage = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.data = null;
        state.errorMessage = null;
        state.isLoading = true;
      }).addCase(fetchRegister.rejected, (state, action) => { 
        state.errorMessage = JSON.parse(action.error.message).message;
        state.isLoading = false;
      }).addCase(fetchRegister.fulfilled, (state, action) => {
        state.data = action.payload;
        state.errorMessage = null;
        state.isLoading = false;
      });
    
  },
});

export const registerReducer = registerSlice.reducer;
export const { resetData } = registerSlice.actions;



