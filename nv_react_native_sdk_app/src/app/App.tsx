// src/app/App.tsx
import 'react-native-get-random-values';

import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import AppGate from './AppGate';
import { initializeApp } from './AppInitializer';

const App = () => {
  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <NavigationContainer>
      <AppGate />
    </NavigationContainer>
  );
};

export default App;
