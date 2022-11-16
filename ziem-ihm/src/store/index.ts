import { ThunkAction, Action, legacy_createStore as createStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers';

export const store = createStore(rootReducer)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
