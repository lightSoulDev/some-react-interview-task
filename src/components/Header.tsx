import React from 'react';
import styled from 'styled-components';
import {DEFAULT_SETTINGS, useSettingsContext} from '../context/settings';
import LocaleManager from '../locale/LocaleManager';
import useLocale from '../locale/useLocale.hook';

const Container = styled.div`
  height: 50px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: right;
  font-size: 1em;
  border-bottom: 2px solid blue;
`;

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid blue;
  border-radius: 3px;
`;

const Input = styled.input`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid blue;
  border-radius: 3px;
  width: 100px;
`;

function Header(): JSX.Element {
  const {settings, setSettings} = useSettingsContext();
  const l = useLocale();

  return (
    <Container>
      <span>{l('Extra.DataDelay')}</span>
      <Input
        defaultValue={settings.dataDelay ?? DEFAULT_SETTINGS.dataDelay}
        onChange={event => {
          const value: string = event?.target?.value;
          if (value && !isNaN(+value)) {
            setSettings({...settings, dataDelay: +value});
          }
        }}
      />

      <span>{l('Extra.MessageInterval')}</span>
      <Input
        defaultValue={settings.cycleInterval ?? DEFAULT_SETTINGS.cycleInterval}
        onChange={event => {
          const value: string = event?.target?.value;
          if (value && !isNaN(+value)) {
            setSettings({...settings, cycleInterval: +value});
          }
        }}
      />

      <span>{l('Extra.Timeout')}</span>
      <Input
        defaultValue={settings.timeout ?? DEFAULT_SETTINGS.timeout}
        onChange={event => {
          const value: string = event?.target?.value;
          if (value && !isNaN(+value)) {
            setSettings({...settings, timeout: +value});
          }
        }}
      />

      <Button
        onClick={() => {
          const locales = LocaleManager.getExternalLocalesList();
          const current = locales.indexOf(settings.locale);
          let newLocale = locales[0];
          if (current >= 0) newLocale = locales[(current + 1) % locales.length];
          setSettings({...settings, locale: newLocale});
        }}>
        {settings.locale}
      </Button>
    </Container>
  );
}

export default Header;
