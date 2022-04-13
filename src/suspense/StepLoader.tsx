/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useSettingsContext} from '../context/settings';
import {LocaleList} from '../locale/locale.types';
import useLocale from '../locale/useLocale.hook';
import Spinner from './StyledSpinner';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

function StepLoader(): JSX.Element {
  const [message, setMessage] = useState<string>('');
  const {settings} = useSettingsContext();
  const l = useLocale();

  const messageCycle: Array<keyof LocaleList> = [
    'Loading.First',
    'Loading.Second',
    'Loading.Third',
  ];

  let timer: NodeJS.Timeout;

  const loadingCycle = (): void => {
    let index = 0;
    setMessage(messageCycle[index++]);

    timer = setInterval(() => {
      if (index >= messageCycle.length) {
        clearInterval(timer);
      } else {
        setMessage(messageCycle[index++]);
      }
    }, settings.cycleInterval);
  };

  useEffect(() => {
    console.log(
      `Simulating: { interval: ${settings.cycleInterval}, delay: ${settings.dataDelay}, timeout: ${settings.timeout} }`,
    );
    loadingCycle();
  }, []);

  return (
    <Container>
      <Spinner />
      <p>{l(message)}</p>
    </Container>
  );
}

export default StepLoader;
