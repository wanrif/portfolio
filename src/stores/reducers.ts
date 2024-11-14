// reducers.ts

import AppReducer, { storedKeys as storedAppState } from '@containers/app/reducer';
import { type Reducer, combineReducers } from '@reduxjs/toolkit';
import { mapWithPersistor } from './persistence';

const storedReducers = {
  app: { reducer: AppReducer, whitelist: storedAppState },
};

const temporaryReducers: Record<string, Reducer> = {
  // Add temporary reducers here
  // app: AppReducer,
};

const apiReducers: Record<string, Reducer> = {
  // Add api reducers here
  // [appApi.reducerPath]: appApi.reducer,
};

const rootReducer = combineReducers({
  ...mapWithPersistor(storedReducers),
  ...temporaryReducers,
  ...apiReducers,
});

export default rootReducer;
