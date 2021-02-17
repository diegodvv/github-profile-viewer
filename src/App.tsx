import { Flex, Grid, Heading } from '@chakra-ui/react';
import { ThemeContainer } from './theme/ThemeContainer';

function App() {
  return (
    <ThemeContainer>
      <Grid
        as='main'
        height='100vh'
        templateColumns='1fr 1fr 1fr 1fr'
        templateRows='1fr 1fr 1fr 1fr'
        justifyContent='center'
        alignItems='flex-start'
        templateAreas="
          '. . . .'
          '. profile repositories .'
          '. . . .'
        ">
        <Flex gridArea='profile' flexDir='column' alignItems='flex-start'>
          <Heading as='h1'>Hello Left!</Heading>
        </Flex>
        <Flex gridArea='repositories' flexDir='column' alignItems='flex-start'>
          <Heading as='h1'>Hello Right!</Heading>
        </Flex>
      </Grid>
    </ThemeContainer>
  );
}

export default App;
