import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import AppNavigator from './AppNavigator';
import ToastComponent from './src/components/ToastComponent';
import {persistor, store} from './src/redux/store';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
        <ToastComponent />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
