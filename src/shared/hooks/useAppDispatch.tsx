import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../api/store';

export const useAppDispatch = () => useDispatch<AppDispatch>(); 