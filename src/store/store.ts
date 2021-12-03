import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from '@store/reducers';

const store: EnhancedStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(thunk)),
});

export default store;