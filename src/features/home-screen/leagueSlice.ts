import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LeagueState {
  selectedLeagueId: number | null;
}

const initialState: LeagueState = {
  selectedLeagueId: null,
};

const leagueSlice = createSlice({
  name: 'leagues',
  initialState,
  reducers: {
    setSelectedLeagueId(state, action: PayloadAction<number | null>) {
      state.selectedLeagueId = action.payload;
    },
  },
});

export const { setSelectedLeagueId } = leagueSlice.actions;
export const selectSelectedLeagueId = (state: any) => state.leagues.selectedLeagueId;
export default leagueSlice.reducer; 