import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { footballApi } from '../../features/team-api/services/footballApi';

const rootReducer = combineReducers( {
    [ footballApi.reducerPath ]: footballApi.reducer,
} );

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [], // Оставляем пустым, так как все данные теперь через RTK Query
};

const persistedReducer = persistReducer( persistConfig, rootReducer );

export const store = configureStore( {
    reducer: persistedReducer,
  // @ts-ignore: redux-persist несовместим с типами middleware redux-toolkit
    middleware: ( getDefaultMiddleware ) =>
        getDefaultMiddleware( {
            serializableCheck: false,
    } ).concat( footballApi.middleware ),
} );

export const persistor = persistStore( store );

export type AppDispatch = typeof store.dispatch;

// Типобезопасный хук для dispatch
import { useDispatch } from 'react-redux';
export const useAppDispatch = () => useDispatch<AppDispatch>(); 