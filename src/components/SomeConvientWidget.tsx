import React from 'react';
import styled from 'styled-components';
import useLocale from '../locale/useLocale.hook';
import {MockDataWrap} from '../suspense/suspense';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

// Сделано для начала загрузки по нажатию кнопки.
// Чтобы загрузка начиналась бы с момента
// открытия страницы и через пропсы ничего не передавалось:
// const resource = fetchMockData(settings.dataDelay, settings.timeout);

export interface SuspenseProps {
  resource: MockDataWrap | null;
}

function SomeConvientWidget(props: SuspenseProps): JSX.Element {
  const mockData = props.resource?.mockData.read();
  const l = useLocale();

  return (
    <Container>
      <p>{mockData?.error ? l(mockData.error.message) : l('Success.LoadingFinished')}</p>
      <p>{mockData?.data ? String(mockData.data) : null}</p>
    </Container>
  );
}

export default SomeConvientWidget;
