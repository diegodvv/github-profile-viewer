import { Flex, Grid, Heading, Image, Input, Text, VStack } from '@chakra-ui/react';
import axios, { CancelTokenSource } from 'axios';
import { useEffect, useState } from 'react';
import { ThemeContainer } from '../theme/ThemeContainer';
import { RepositoryCard } from './RepositoryCard';

function App() {
  const [axiosCancelToken, setAxiosCancelToken] = useState<CancelTokenSource | null>(null);
  const [inputText, setInputText] = useState('');
  const [
    { loading, name, repositories, followersCount, repositoriesCount, login, avatarUrl },
    setState,
  ] = useState({
    loading: true,
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
    return () => {
      axiosCancelToken?.cancel();
    };
  }, [axiosCancelToken]);

  const fetchUserData = async () => {
    const source = axios.CancelToken.source();
    setAxiosCancelToken(source);

    setState((state) => ({ ...state, loading: true }));
    const {
      login,
      avatar_url: avatarUrl,
      name,
      followers: followersCount,
      public_repos: repositoriesCount,
      repos_url,
    } = (
      await axios.get(`https://api.github.com/users/${inputText}`, {
        cancelToken: source.token,
      })
    ).data as {
      login: string;
      avatar_url: string;
      name: string;
      followers: number;
      public_repos: number;
      repos_url: string;
    };

    const repositories = ((await axios.get(repos_url, { cancelToken: source.token })).data as {
      description: string;
      stargazers_count: number;
      name: string;
    }[])
      .map(({ description, stargazers_count, name }) => ({
        description,
        starsCount: stargazers_count,
        name,
      }))
      .sort(({ starsCount: a }, { starsCount: b }) => -(a - b));

    setState({ loading: false, login, name, avatarUrl, followersCount, repositories, repositoriesCount });
    setAxiosCancelToken(null);
  };

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
              value={inputText}
              onChange={(event) => setInputText(event.target.value)}
              onKeyPress={(event) => {
                if (event.code === 'Enter') fetchUserData();
              }}
            />

            {!loading && (
              <>
                <Flex flexDir='column'>
                  <Image src={avatarUrl!} border='2px' width='184px' height='184px' />

                  <Heading as='h1' fontSize='xl' marginTop='24px'>
                    {login}
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
