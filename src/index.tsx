import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, Middleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import App1 from './App1'
import App2 from './App2'
import { rootReducer } from './reducers/index';
import 'semantic-ui-css/semantic.min.css'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['result'],
};

let middlewares: Middleware[] = [thunk];

if (process.env.NODE_ENV === `development`) {
  const logger = createLogger({
    diff: true,
    collapsed: true,
  });

  middlewares.push(logger);
}
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store);

const Index = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App1 title="my form"></App1>
      <App2 title="my form"></App2>
    </PersistGate>
  </Provider>
);

render(<Index />, document.getElementById('root'));
