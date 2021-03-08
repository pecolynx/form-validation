import { combineReducers } from 'redux';
import { app } from './app';
export const rootReducer = combineReducers({
  app,
});

export type AppState = ReturnType<typeof rootReducer>;
