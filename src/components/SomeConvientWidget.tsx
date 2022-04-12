import React, {useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import Logger from '../extras/Logger';
import useLocale from '../locale/useLocale.hook';
import {MockApi} from '../network/mock/MockApi';
import {RootState} from '../redux/store';
import Spinner from './StyledSpinner';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

function SomeConvientWidget(): JSX.Element {
  const l = useLocale();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string>('');
  const [data, setData] = useState();

  const messageInterval: number = useSelector((state: RootState) => state.settings.messageInterval);
  const dataDelay: number = useSelector((state: RootState) => state.settings.dataDelay);

  const messageCycle = ['Loading.First', 'Loading.Second', 'Loading.Third'];
  const errorLocale = 'Error.Timeout';
  const successLocale = 'Success.LoadingFinished';

  let timer: NodeJS.Timeout;

  const loadingCycle = (): void => {
    let index = 0;
    setMessage(messageCycle[index++]);

    timer = setInterval(() => {
      if (index >= messageCycle.length) {
        Logger.error(SomeConvientWidget, 'Message cycle timeout');

        setLoading(false);
        clearInterval(timer);
        setMessage(errorLocale);
      } else {
        setMessage(messageCycle[index++]);
      }
    }, messageInterval);
  };

  const loadData = async (): Promise<void> => {
    const api = MockApi.getInstance();
    Logger.log(SomeConvientWidget, 'Loading widget data...');
    let response: any;

    try {
      response = await api.withTimeout(
        api.getData(dataDelay),
        messageInterval * messageCycle.length,
      );

      if (response) {
        Logger.log(SomeConvientWidget, 'Loading success', response);
        clearInterval(timer);
        setLoading(false);
        setMessage(successLocale);
        setData(response);
      } else {
        throw new Error('Loading failed');
      }
    } catch {
      Logger.error(SomeConvientWidget, 'Loading failed');
    }
  };

  useEffect(() => {
    Logger.log(
      SomeConvientWidget,
      `Simulating: { interval: ${messageInterval}, delay: ${dataDelay} }`,
    );
    loadData();
    loadingCycle();
  }, []);

  return (
    <Container>
      {loading && <Spinner />}
      <p>{l(message)}</p>
      {!loading && <span>{data}</span>}
    </Container>
  );
}

export default SomeConvientWidget;
