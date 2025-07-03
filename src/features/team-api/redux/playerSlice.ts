import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Player } from '../types/player';
import { fetchTeamPlayers } from '../services/teamApi';

interface PlayersState {
  players: Player[];
  loading: boolean;
  error: string | null;
}

const initialState: PlayersState = {
  players: [],
  loading: false,
  error: null,
};

export const fetchPlayersThunk = createAsyncThunk(
  'players/fetchPlayers',
  async (teamId: number, { rejectWithValue }) => {
    try {
      return await fetchTeamPlayers(teamId);
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

const playerSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlayersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.players = action.payload;
      })
      .addCase(fetchPlayersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default playerSlice.reducer;
export type { PlayersState }; 