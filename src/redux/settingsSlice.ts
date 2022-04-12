import {createSlice} from '@reduxjs/toolkit';
import LocaleManager from '../locale/LocaleManager';

export type SettingsState = {
  locale: string;
  dataDelay: number;
  messageInterval: number;
};

const initialState: SettingsState = {
  locale: localStorage.getItem('locale') ?? 'en',
  dataDelay: localStorage.getItem('dataDelay') ? Number(localStorage.getItem('dataDelay')) : 7000,
  messageInterval: localStorage.getItem('messageInterval')
    ? Number(localStorage.getItem('messageInterval'))
    : 2000,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    setLocale: (state, action) => {
      state.locale = action.payload;
      localStorage.setItem('locale', state.locale);
    },
    swapLocale: (state, action) => {
      const locales = LocaleManager.getExternalLocalesList();
      const current = action.payload;
      const currentIndex = locales.indexOf(current);
      if (currentIndex < 0) state.locale = locales[0];
      else state.locale = locales[(currentIndex + 1) % locales.length];

      localStorage.setItem('locale', state.locale);
    },
    setDataDelay: (state, action) => {
      state.dataDelay = action.payload;
      localStorage.setItem('dataDelay', String(state.dataDelay));
    },
    setMessageInterval: (state, action) => {
      state.messageInterval = action.payload;
      localStorage.setItem('messageInterval', String(state.messageInterval));
    },
  },
});

export const {setLocale, swapLocale, setDataDelay, setMessageInterval} = settingsSlice.actions;
export default settingsSlice.reducer;
