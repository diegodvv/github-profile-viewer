import { Flex, Grid, Heading, Image, Input, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ThemeContainer } from '../theme/ThemeContainer';
import { RepositoryCard } from './RepositoryCard';

type State = {
  loading: boolean;
  login: null | string;
  name: null | string;
  followersCount: null | number;
  repositoriesCount: null | number;
  avatarUrl: null | string;
  repositories: { name: string; description: string; starsCount: number }[];
};
function App() {
  const [
    { loading, name, repositories, followersCount, repositoriesCount, username, avatarUrl },
    setState,
  ] = useState({
    loading: false,
    login: null as null | string,
    name: null as null | string,
    followersCount: null as null | number,
    repositoriesCount: null as null | number,
    avatarUrl: null as null | string,
    repositories: [] as {
      name: string;
      description: string;
      starsCount: number;
    }[],
  });

  useEffect(() => {
    const source = axios.CancelToken.source();
    (async () => {
      const {
        login,
        avatar_url: avatarUrl,
        name,
        followers: followersCount,
        public_repos: repositoriesCount,
        repos_url,
      }: Omit<State, 'repositories'> = await axios.get('https://api.github.com/users/diegodvv', {
        cancelToken: source.token,
      });
    })();
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <ThemeContainer>
      <Grid
        as='main'
        height='100vh'
        templateColumns='1fr 526px 526px 1fr'
        templateRows='1fr 1fr 1fr 1fr'
        justifyContent='center'
        alignItems='flex-start'
        templateAreas="
          '. . . .'
          '. profile repositories .'
          '. . . .'
        ">
        <Flex gridArea='profile' flexDir='column' alignItems='flex-start'>
          <VStack spacing='70px' alignItems='flex-start'>
            <Input
              fontSize='sm'
              placeholder='enter github username'
              background='gray.100'
              color='black'
              _placeholder={{ color: 'gray.600' }}
            />

            {!loading && (
              <>
                <Flex flexDir='column'>
                  <Image
                    src='https://avatars.dicebear.com/4.5/api/male/asdasdasd.svg'
                    border='2px'
                    width='184px'
                    height='184px'
                  />

                  <Heading as='h1' fontSize='xl' marginTop='24px'>
                    {username}
                  </Heading>
                  <Heading as='h2' fontSize='md'>
                    {name}
                  </Heading>
                </Flex>

                <VStack flexDir='column' alignItems='flex-start' spacing='30px'>
                  <Flex flexDir='column'>
                    <Text fontSize='lg' fontWeight='bold' lineHeight='normal'>
                      {followersCount}
                    </Text>
                    <Text fontSize='md' lineHeight='normal'>
                      followers
                    </Text>
                  </Flex>
                  <Flex flexDir='column'>
                    <Text fontSize='lg' fontWeight='bold' lineHeight='normal'>
                      {repositoriesCount}
                    </Text>
                    <Text fontSize='md' lineHeight='normal'>
                      repositories
                    </Text>
                  </Flex>
                </VStack>
              </>
            )}
          </VStack>
        </Flex>
        <Flex gridArea='repositories' flexDir='column' alignItems='flex-start'>
          <Heading>repositories</Heading>
          {!loading && (
            <VStack spacing='40px' marginTop='24px'>
              {repositories.map((repository, index) => (
                <RepositoryCard {...repository} key={index} />
              ))}
            </VStack>
          )}
        </Flex>
      </Grid>
    </ThemeContainer>
  );
}

export default App;
