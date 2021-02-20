import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: {
      '*': {
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      },
      '::-webkit-scrollbar': {
        backgroundColor: '#202324',
        color: '#aba499',
      },
      '::-webkit-scrollbar-corner': {
        backgroundColor: 'gray.900',
      },
      '::-webkit-scrollbar-thumb': {
        backgroundColor: 'gray.500',
      },
    },
  },
  components: {
    Alert: {
      baseStyle: {
        backgroundColor: ({ status }) => (status === 'error' ? '#231617' : '#FFF'),
      },
      status: {
        error: {
          backgroundColor: '#231617',
        },
      },
    },
  },
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
      900: '#181A1B',
      800: '#1C1E1F',
      700: '#1E2021',
      500: '#454A4D',
      300: '#ACA59A',
      200: '#D5D1CC',
      100: '#E8E6E3',
    },
    white: '#FFF',
    red: {
      900: '#231617',
    },
  },
  radii: {
    base: '0',
    sm: '0',
    md: '0',
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});
