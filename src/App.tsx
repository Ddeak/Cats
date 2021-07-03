import React from 'react';
import AppLayout from './Layout/Layout';
import { Provider } from 'react-redux';
import store from './State/store';

function App() {
  return (
    <Provider store={store}>
      <AppLayout />
    </Provider>
  );
}

export default App;
