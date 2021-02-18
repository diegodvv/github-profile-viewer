import { Flex, Grid, Heading, Image, Input, Text } from '@chakra-ui/react';
import { ThemeContainer } from '../theme/ThemeContainer';
import { RepositoryCard } from './RepositoryCard';

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
          <Input
            fontSize='sm'
            placeholder='enter github username'
            background='gray.100'
            color='black'
            _placeholder={{ color: 'gray.600' }}
          />
          <Image src='https://avatars.dicebear.com/4.5/api/male/asdasdasd.svg' border='2px' />
          <Heading as='h1' fontSize='xl'>
            diegodvv
          </Heading>
          <Heading as='h2' fontSize='md'>
            Diego Vieira
          </Heading>

          <Flex flexDir='column'>
            <Text fontSize='lg' fontWeight='bold'>
              50
            </Text>
            <Text fontSize='md'>followers</Text>
          </Flex>
          <Flex flexDir='column'>
            <Text fontSize='lg' fontWeight='bold'>
              50
            </Text>
            <Text fontSize='md'>repositories</Text>
          </Flex>
        </Flex>
        <Flex gridArea='repositories' flexDir='column' alignItems='flex-start'>
          <Heading>repositories</Heading>
          <Flex flexDir='column'>
            <RepositoryCard />
          </Flex>
        </Flex>
      </Grid>
    </ThemeContainer>
  );
}

export default App;
