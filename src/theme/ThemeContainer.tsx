import { ColorModeProvider, CSSReset, ThemeProvider as ChakraThemeProvider } from '@chakra-ui/react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import React from 'react';
import { theme } from './theme';

export const ThemeContainer: React.FC = ({ children }) => {
  return (
    <ChakraThemeProvider theme={theme}>
      <ColorModeProvider value='dark' options={{ useSystemColorMode: false, initialColorMode: 'dark' }}>
        <EmotionThemeProvider theme={theme}>
          <CSSReset />
          {children}
        </EmotionThemeProvider>
      </ColorModeProvider>
    </ChakraThemeProvider>
  );
};
