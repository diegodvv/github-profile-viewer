import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import React from 'react';
import { theme } from './theme';

export const ThemeContainer: React.FC = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <style>
        {`* {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }`}
      </style>
      <CSSReset />
      {children}
    </ChakraProvider>
  );
};
