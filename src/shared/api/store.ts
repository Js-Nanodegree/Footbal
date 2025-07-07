import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import teamsReducer from '../../features/team-api/redux/teamSlice';
import playersReducer from '../../features/team-api/redux/playerSlice';
import matchesReducer from '../../features/team-api/redux/matchSlice';
import teamPastMatchesReducer from '../../features/team-api/redux/teamPastMatchesSlice';
import homeScreenReducer from '../../features/home-screen/redux/homeScreenSlice';

const rootReducer = combineReducers( {
    teams: teamsReducer,
    players: playersReducer,
    matches: matchesReducer,
    teamPastMatches: teamPastMatchesReducer,
    homeScreen: homeScreenReducer,
} );

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [ 'teams', 'players', 'matches', 'teamPastMatches', 'homeScreen' ],
};

const persistedReducer = persistReducer( persistConfig, rootReducer );

export const store = configureStore( {
    reducer: persistedReducer,
    // @ts-ignore: redux-persist несовместим с типами middleware redux-toolkit
    middleware: ( getDefaultMiddleware ) =>
        getDefaultMiddleware( {
            serializableCheck: false,
        } ),
} );

export const persistor = persistStore( store );

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Типобезопасный хук для dispatch
import { useDispatch } from 'react-redux';
export const useAppDispatch = () => useDispatch<AppDispatch>(); 