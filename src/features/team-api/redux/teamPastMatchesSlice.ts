import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export type PastMatch = {
    id: number;
    homeTeam: string;
    awayTeam: string;
    score: string;
    tournament: string;
    date: string;
};

export type TeamPastMatchesState = {
    matches: PastMatch[];
    loading: boolean;
    error: string | null;
};

const initialState: TeamPastMatchesState = {
    matches: [],
    loading: false,
    error: null,
};

// Мок-данные для теста
const MOCK_MATCHES: PastMatch[] = [
    { id: 1, homeTeam: 'Chelsea', awayTeam: 'Arsenal', score: '2:1', tournament: 'Premier League', date: '2024-07-01' },
    { id: 2, homeTeam: 'Man United', awayTeam: 'Liverpool', score: '1:3', tournament: 'Premier League', date: '2024-07-01' },
    { id: 3, homeTeam: 'Barcelona', awayTeam: 'Real Madrid', score: '0:0', tournament: 'La Liga', date: '2024-06-28' },
];

export const fetchTeamPastMatches = createAsyncThunk<
    PastMatch[],
    { teamId: number },
    { rejectValue: string }
>( 'teamPastMatches/fetch', async ( { teamId }, { rejectWithValue } ) =>
{
    try
    {
        // TODO: заменить на реальный API-запрос
        await new Promise<void>( res => setTimeout( res, 500 ) );
        return MOCK_MATCHES.filter( m => m.id === teamId || teamId === 1 ); // фильтр для примера
    } catch ( e )
    {
        return rejectWithValue( 'Ошибка загрузки прошедших матчей' );
    }
} );

const teamPastMatchesSlice = createSlice( {
    name: 'teamPastMatches',
    initialState,
    reducers: {},
    extraReducers: ( builder ) =>
    {
        builder
            .addCase( fetchTeamPastMatches.pending, ( state ) =>
            {
                state.loading = true;
                state.error = null;
            } )
            .addCase( fetchTeamPastMatches.fulfilled, ( state, action ) =>
            {
                state.loading = false;
                state.matches = action.payload;
            } )
            .addCase( fetchTeamPastMatches.rejected, ( state, action ) =>
            {
                state.loading = false;
                state.error = action.payload || 'Ошибка';
            } );
    },
} );

export default teamPastMatchesSlice.reducer; 