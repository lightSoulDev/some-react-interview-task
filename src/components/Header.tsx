import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import useLocale from '../locale/useLocale.hook';
import {setDataDelay, setMessageInterval, swapLocale} from '../redux/settingsSlice';
import {RootState} from '../redux/store';

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
  const locale = useSelector((state: RootState) => state.settings.locale);
  const messageInterval: number = useSelector((state: RootState) => state.settings.messageInterval);
  const dataDelay: number = useSelector((state: RootState) => state.settings.dataDelay);
  const l = useLocale();
  const dispatch = useDispatch();

  return (
    <Container>
      <span>{l('Extra.DataDelay')}</span>
      <Input
        defaultValue={String(dataDelay)}
        onChange={event => {
          const value: string = event?.target?.value;
          if (value && !isNaN(+value)) dispatch(setDataDelay(value));
        }}
      />

      <span>{l('Extra.MessageInterval')}</span>
      <Input
        defaultValue={String(messageInterval)}
        onChange={event => {
          const value: string = event?.target?.value;
          if (value && !isNaN(+value)) dispatch(setMessageInterval(value));
        }}
      />

      <Button
        onClick={() => {
          dispatch(swapLocale(locale));
        }}>
        {locale}
      </Button>
    </Container>
  );
}

export default Header;
