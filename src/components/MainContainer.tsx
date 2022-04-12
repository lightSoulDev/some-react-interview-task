import React, {useState} from 'react';
import styled from 'styled-components';
import Header from './Header';
import SomeConvientWidget from './SomeConvientWidget';
import Logger from '../extras/Logger';
import useLocale from '../locale/useLocale.hook';

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

function MainContainer(): JSX.Element {
  const [toggleState, setToggleState] = useState(false);
  const l = useLocale();

  return (
    <Container>
      <Header />
      {toggleState ? (
        <SomeConvientWidget />
      ) : (
        <div>
          <Button
            onClick={() => {
              setToggleState(!toggleState);
              Logger.log(MainContainer, 'Toggled widget');
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
