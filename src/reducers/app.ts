import { reducerWithInitialState } from 'typescript-fsa-reducers';

export type AppState = {
  loading: boolean;
};

const initalState: AppState = {
  loading: false,
};

export const app = reducerWithInitialState(initalState);
