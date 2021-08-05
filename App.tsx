import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Amplify from 'aws-amplify';

import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import AppContext from './src/utils/AppContext';

import config from './src/aws-exports';
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

export default function App() {
  const [userId, setUserId] = useState(null);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AppContext.Provider value={{userId, setUserId}}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </AppContext.Provider>
      </SafeAreaProvider>
    );
  }
}
