import {combineReducers, configureStore} from '@reduxjs/toolkit';
import settingsSlice from './settingsSlice';

const rootReducer = combineReducers({
  settings: settingsSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;
