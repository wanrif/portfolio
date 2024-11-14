// APP REDUCER
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface AppState {
  theme: 'light' | 'dark' | string;
  locale: string;
}

const initialState: AppState = {
  theme: '',
  locale: 'en',
};

export const storedKeys = ['theme', 'locale'];

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setLocale: (state, action: PayloadAction<string>) => {
      state.locale = action.payload;
    },
  },
});

export const { setTheme, setLocale } = appSlice.actions;

export default appSlice.reducer;
