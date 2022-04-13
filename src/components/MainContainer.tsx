import React, {Suspense, useState} from 'react';
import styled from 'styled-components';
import {useSettingsContext} from '../context/settings';
import useLocale from '../locale/useLocale.hook';
import {fetchMockData, MockDataWrap} from '../suspense/suspense';
import Header from './Header';
import SomeConvientWidget from './SomeConvientWidget';
import StepLoader from '../suspense/StepLoader';

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid blue;
  border-radius: 3px;
`;

const Container = styled.div`
  text-align: center;
`;

let resource: MockDataWrap | null = null;

function MainContainer(): JSX.Element {
  const [toggleState, setToggleState] = useState(false);
  const l = useLocale();
  const {settings} = useSettingsContext();

  return (
    <Container>
      <Header />
      {toggleState ? (
        <Suspense fallback={<StepLoader />}>
          <SomeConvientWidget resource={resource} />
        </Suspense>
      ) : (
        <div>
          <Button
            onClick={() => {
              setToggleState(!toggleState);
              resource = fetchMockData(settings.dataDelay, settings.timeout);
            }}>
            {l('Extra.Toggle')}
          </Button>
          <p>{l('Extra.ToggleMessage')}</p>
        </div>
      )}
    </Container>
  );
}

export default MainContainer;
