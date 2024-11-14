// persistence.ts

import createLZStringStorage from '@utils/LZStringStorage';
import { type Reducer } from 'redux';
import { persistReducer } from 'redux-persist';
import defaultStorage from 'redux-persist/lib/storage';

const storage = createLZStringStorage(defaultStorage);

interface PersistConfig {
  key: string;
  storage: typeof storage;
  whitelist: string[];
  keyPrefix: string;
}

interface ReducerWithWhitelist {
  reducer: Reducer;
  storage?: typeof storage;
  whitelist: string[];
}

export const persistConfig: PersistConfig = {
  key: 'root',
  storage,
  whitelist: [],
  keyPrefix: 'portreez:',
};

export const mapWithPersistor = (reducers: Record<string, ReducerWithWhitelist>): Record<string, Reducer> =>
  Object.fromEntries(
    Object.entries(reducers).map(([key, { reducer, storage, whitelist }]) => [
      key,
      persistReducer(
        {
          ...persistConfig,
          key,
          storage: storage || persistConfig.storage,
          whitelist,
        },
        reducer
      ),
    ])
  );
