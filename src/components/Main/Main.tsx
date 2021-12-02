import { ReactElement } from 'react';

import Header from '@components/Header';
import Board from '@components/Board';
import { MainWrapper } from './Main.styled';

const Main = (): ReactElement => {


  return (
    <MainWrapper>
      <Header />
      <Board />
    </MainWrapper>
  );
};

export default Main;