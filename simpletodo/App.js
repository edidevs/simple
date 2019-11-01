import React from 'react';
import Router from './src/component/Router';
import { Provider } from 'react-redux';
import configureStore from './src/store';

import { PersistGate } from 'redux-persist/integration/react';

const { persistor, store} = configureStore();
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
       <PersistGate loading={null} persistor={persistor} >
        <Router />
        </PersistGate>
      </Provider>
    );
  }
}