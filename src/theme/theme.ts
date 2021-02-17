import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  fonts: {
    body: 'Roboto, system-ui, sans-serif',
    heading: 'Roboto, system-ui, sans-serif',
    mono: 'Menlo, monospace',
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    bold: 700,
  },
  fontSizes: {
    xl: '64px',
    lg: '36px',
    md: '24px',
    sm: '18px',
  },
  colors: {
    black: '#000',
    gray: {
      900: '#1E1E1E',
      800: '#252525',
      300: '#5F5F5F',
      100: '#EFEFEF',
    },
    white: '#FFF',
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});
