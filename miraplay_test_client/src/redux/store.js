import {configureStore} from '@reduxjs/toolkit';
import { gamesReducer } from './slices/gamesSlice';
import { authReducer } from './slices/authSlice';
import { registerReducer } from './slices/registerSlice';

const store = configureStore({
  reducer: {
    games: gamesReducer,
    auth: authReducer,
    register: registerReducer,
  },
});

export default store;
