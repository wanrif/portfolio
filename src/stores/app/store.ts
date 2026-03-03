import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type ThemeMode = 'light' | 'dark';
type LocaleMode = 'en' | 'id';

export interface AppStoreState {
  theme: ThemeMode;
  locale: LocaleMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setLocale: (locale: LocaleMode) => void;
}

const getInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const useAppStore = create<AppStoreState>()(
  persist(
    (set, get) => ({
      theme: getInitialTheme(),
      locale: 'en',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set({ theme: get().theme === 'dark' ? 'light' : 'dark' }),
      setLocale: (locale) => set({ locale }),
    }),
    {
      name: 'portreez:app',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ theme: state.theme, locale: state.locale }),
    },
  ),
);

export const selectTheme = (state: AppStoreState) => state.theme;
export const selectLocale = (state: AppStoreState) => state.locale;
