import { Heading } from '@chakra-ui/react';
import { ThemeContainer } from './theme/ThemeContainer';

function App() {
  return (
    <ThemeContainer>
      <Heading as='h1'>Hello World!</Heading>
    </ThemeContainer>
  );
}

export default App;
