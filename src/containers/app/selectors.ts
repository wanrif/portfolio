import { RootState } from '@stores/configureStore';

// Other code such as selectors can use the imported `RootState` type
export const selectTheme = (state: RootState) => state.app.theme;
export const selectLocale = (state: RootState) => state.app.locale;
