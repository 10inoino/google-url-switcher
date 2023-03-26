import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import './App.css';
import { MainView } from './MainVIew';

function App() {
  return (
    <React.StrictMode>
      <ChakraProvider>
        <MainView />
      </ChakraProvider>
    </React.StrictMode>
  );
}

export default App;
