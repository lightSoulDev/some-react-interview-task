/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useState} from 'react';
import ISettings from './settings.types';
import {DEFAULT_SETTINGS, SettingsContext} from './settings';

function LocalStorageContextProvider({children}: any): JSX.Element {
  const [settings, setSettings] = useState({} as ISettings);

  useEffect(() => {
    const storedSettings = localStorage.getItem('appSettings');
    const settingsData = storedSettings ? JSON.parse(storedSettings) : DEFAULT_SETTINGS;

    if (settingsData) setSettings(settingsData);
  }, []);

  useEffect(() => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
  }, [settings]);

  return (
    <SettingsContext.Provider value={{settings, setSettings}}>{children}</SettingsContext.Provider>
  );
}

export default LocalStorageContextProvider;
