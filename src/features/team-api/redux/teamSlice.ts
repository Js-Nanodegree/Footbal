import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Team } from '../types/team';
import { fetchTeams, FetchTeamsResult } from '../services/teamApi';

interface TeamsState {
    teams: Team[];
    count: number;
    offset: number;
    limit: number;
    links?: {
        next?: string;
        prev?: string;
    };
    loading: boolean;
    error: string | null;
}

const initialState: TeamsState = {
    teams: [],
    count: 0,
    offset: 0,
    limit: 20,
    links: undefined,
    loading: false,
    error: null,
};

export const fetchTeamsThunk = createAsyncThunk(
    'teams/fetchTeams',
    async (
        { offset, limit }: { offset: number; limit: number },
        { rejectWithValue }
    ) => {
        try {
            return await fetchTeams(offset, limit);
        } catch (e: any) {
            return rejectWithValue(e.message);
        }
    }
);

const teamSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        setOffset(state, action) {
            state.offset = action.payload;
        },
        setLimit(state, action) {
            state.limit = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeamsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTeamsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.teams = action.payload.teams;
                state.count = action.payload.count;
                state.links = action.payload.links;
            })
            .addCase(fetchTeamsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setOffset, setLimit } = teamSlice.actions;
export default teamSlice.reducer;
export type { TeamsState }; 