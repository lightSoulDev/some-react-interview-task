import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import MainContainer from './components/MainContainer';
import LocalStorageContextProvider from './context/localStorage.provider';
import LocaleManager from './locale/LocaleManager';
import {MockApi} from './mock/MockApi';
import Spinner from './suspense/StyledSpinner';

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
    console.log('Loading externalLocaleList...');
    const externalLocaleList = await api.getLocales(serverPing);

    if (externalLocaleList) {
      LocaleManager.setExternalLocales(externalLocaleList);
      console.log('Loading success:', externalLocaleList);
    } else {
      console.error('Loading failed, App is using default locales.');
    }

    setLoaded(true);
  };

  useEffect(() => {
    getLocales();
  }, []);

  return (
    <LocalStorageContextProvider>
      {loaded ? (
        <MainContainer />
      ) : (
        <Container>
          <Spinner />
        </Container>
      )}
    </LocalStorageContextProvider>
  );
}

export default App;
