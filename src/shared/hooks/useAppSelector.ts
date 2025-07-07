import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from '../api/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 