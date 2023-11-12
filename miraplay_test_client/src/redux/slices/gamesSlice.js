import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGames = createAsyncThunk('posts/fetchGames', async ( config ) => {
  try {
    const response = await fetch('https://api.miraplay.cloud/games/by_page', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
});


const initialState = {
  games: [],
  gamesListLength: 0,
};


const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {

  },

  // extraReducers: {
  //   [fetchGames.fulfilled]: (state, action) => {
  //     state.games = action.payload.games;
  //     state.gamesListLength = action.payload.gamesListLength;
  //   },
  extraReducers: builder => {
    builder.addCase(fetchGames.fulfilled, (state, action) => {
      state.games = action.payload.games;
      state.gamesListLength = action.payload.gamesListLength;
    });
  },
});

export const gamesReducer = gamesSlice.reducer;
