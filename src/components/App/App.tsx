import { ReactElement } from 'react';
import Main from '@components/Main';
import { Provider } from 'react-redux';
import store from '@store/store';

export const App = (): ReactElement => {
  return (
    <Provider store={ store }>
      <Main />
    </Provider>
  );
};

