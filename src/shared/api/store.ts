import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import teamsReducer from '../../features/team-api/redux/teamSlice';
import playersReducer from '../../features/team-api/redux/playerSlice';
import matchesReducer from '../../features/team-api/redux/matchSlice';

const rootReducer = combineReducers( {
    teams: teamsReducer,
    players: playersReducer,
    matches: matchesReducer,
} );

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [ 'teams', 'players', 'matches' ],
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