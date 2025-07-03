import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Match } from '../types/match';
import { fetchTeamMatches } from '../services/teamApi';

interface MatchesState {
  matches: Match[];
  loading: boolean;
  error: string | null;
}

const initialState: MatchesState = {
  matches: [],
  loading: false,
  error: null,
};

export const fetchMatchesThunk = createAsyncThunk(
  'matches/fetchMatches',
  async (teamId: number, { rejectWithValue }) => {
    try {
      return await fetchTeamMatches(teamId);
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

const matchSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatchesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMatchesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.matches = action.payload;
      })
      .addCase(fetchMatchesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default matchSlice.reducer;
export type { MatchesState }; 