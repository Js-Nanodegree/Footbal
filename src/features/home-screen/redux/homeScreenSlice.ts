import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Team } from '../../team-api/types/team';
import { Match } from '../../team-api/types/match';
import { Competition } from '../../team-api/types/competition';
import { getHomeScreenData } from '../dataProvider';

export const fetchHomeScreenData = createAsyncThunk(
  'homeScreen/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const { teams, matches, leagues } = await getHomeScreenData();
      return { teams, matches, competitions: leagues };
    } catch (e) {
      return rejectWithValue('Ошибка загрузки данных');
    }
  }
);

const homeScreenSlice = createSlice({
  name: 'homeScreen',
  initialState: {
    teams: [] as Team[],
    matches: [] as Match[],
    competitions: [] as Competition[],
    loading: false,
    error: null as string | null,
    selectedLeagueId: null as number | null,
    selectedTeamIds: [] as number[],
  },
  reducers: {
    setSelectedLeagueId(state, action) {
      state.selectedLeagueId = action.payload;
    },
    setSelectedTeamIds(state, action) {
      state.selectedTeamIds = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeScreenData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeScreenData.fulfilled, (state, action) => {
        state.teams = action.payload.teams;
        state.matches = action.payload.matches;
        state.competitions = action.payload.competitions;
        state.loading = false;
      })
      .addCase(fetchHomeScreenData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedLeagueId, setSelectedTeamIds } = homeScreenSlice.actions;
export default homeScreenSlice.reducer; 