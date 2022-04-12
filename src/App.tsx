import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import MainContainer from './components/MainContainer';
import Spinner from './components/StyledSpinner';
import Logger from './extras/Logger';
import LocaleManager from './locale/LocaleManager';
import {MockApi} from './network/mock/MockApi';

const serverPing = 500;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

function App(): JSX.Element {
  const [loaded, setLoaded] = useState(false);

  const getLocales = async (): Promise<void> => {
    const api = MockApi.getInstance();
    Logger.log(App, 'Loading externalLocaleList...');
    const externalLocaleList = await api.getLocales(serverPing);

    if (externalLocaleList) {
      LocaleManager.setExternalLocales(externalLocaleList);
      Logger.log(App, 'Loading success:', externalLocaleList);
    } else {
      Logger.error(App, 'Loading failed, App is using default locales.');
    }

    setLoaded(true);
  };

  useEffect(() => {
    getLocales();
  }, []);

  return (
    <>
      {loaded ? (
        <MainContainer />
      ) : (
        <Container>
          <Spinner />
        </Container>
      )}
    </>
  );
}

export default App;
