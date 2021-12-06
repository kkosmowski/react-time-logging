import { ReactElement, useEffect } from 'react';
import Main from '@components/Main';
import { Provider } from 'react-redux';
import store from '@store/store';
import { StorageService } from '@services/storage.service';

export const App = (): ReactElement => {
  useEffect(() => {
    StorageService.init();
  }, []);

  return (
    <Provider store={ store }>
      <Main />
    </Provider>
  );
};

