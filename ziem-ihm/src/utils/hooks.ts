import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
//export const useAppDispatch = () => useDispatch<AppDispatch>();
export type UseAppDispatch = () => AppDispatch;

export const useAppDispatch : () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
