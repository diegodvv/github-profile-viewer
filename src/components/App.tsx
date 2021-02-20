import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import axios, { CancelTokenSource } from 'axios';
import { useEffect, useState } from 'react';
import { ThemeContainer } from '../theme/ThemeContainer';
import { UserNotFoundErrorModal } from './ErrorModal';
import { RepositoryCard } from './RepositoryCard';

function App() {
  const [axiosCancelToken, setAxiosCancelToken] = useState<CancelTokenSource | null>(null);
  const [inputText, setInputText] = useState('');
  const [
    { hasSearched, loading, name, repositories, followersCount, repositoriesCount, login, avatarUrl },
    setProfileDataState,
  ] = useState({
    hasSearched: false,
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
      url: string;
    }[],
  });
  const errorModalDisclosure = useDisclosure();

  useEffect(() => {
    return () => {
      axiosCancelToken?.cancel();
    };
  }, [axiosCancelToken]);

  const fetchUserData = async () => {
    const source = axios.CancelToken.source();
    setAxiosCancelToken(source);

    setProfileDataState((state) => ({ ...state, hasSearched: true, loading: true }));
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
      html_url: string;
    }[])
      .map(({ description, stargazers_count, name, html_url }) => ({
        description,
        starsCount: stargazers_count,
        name,
        url: html_url,
      }))
      .sort(({ starsCount: a }, { starsCount: b }) => -(a - b));

    setProfileDataState({
      hasSearched: true,
      loading: false,
      login,
      name,
      avatarUrl,
      followersCount,
      repositories,
      repositoriesCount,
    });
    setAxiosCancelToken(null);
  };

  return (
    <ThemeContainer>
      <UserNotFoundErrorModal login={inputText} {...errorModalDisclosure} />
      <Grid
        as='main'
        height='100vh'
        templateColumns='1fr 526px 526px 1fr'
        templateRows='minmax(60px, 0) 1fr 1fr minmax(60px, 0) '
        justifyContent='center'
        alignItems='flex-start'
        justifyItems='flex-start'
        templateAreas="
          '. . . .'
          '. profile repositories .'
          '. paddingBottom . .'
        "
        position='relative'
        backgroundColor='gray.800'>
        {loading && (
          <Box position='absolute' left='50%' top='50%'>
            <Flex position='relative' left='-50%' top='-50%'>
              <Button onClick={errorModalDisclosure.onOpen}>Discard</Button>
              {!hasSearched ? (
                <Text fontSize='md' color='gray.200'>
                  search for a user by typing it's username and hitting {'<enter>'}
                </Text>
              ) : (
                <>
                  <Spinner size='xl' />
                  <Text fontSize='lg' marginLeft='4'>
                    Loading...
                  </Text>
                </>
              )}
            </Flex>
          </Box>
        )}
        <Flex gridArea='profile' flexDir='column' alignItems='flex-start'>
          <VStack spacing='70px' alignItems='flex-start'>
            <Input
              fontSize='sm'
              placeholder='enter github username'
              width='128'
              background='gray.100'
              color='black'
              _placeholder={{ color: 'gray.600' }}
              value={inputText}
              onChange={(event) => setInputText(event.target.value)}
              onKeyPress={(event) => {
                if (event.key === 'Enter') fetchUserData();
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

        {!loading && (
          <Flex gridArea='repositories' flexDir='column' alignItems='flex-start'>
            <Heading>repositories</Heading>
            <VStack spacing='40px' marginTop='24px'>
              {repositories.map((repository, index) => (
                <RepositoryCard {...repository} key={index} />
              ))}
            </VStack>
          </Flex>
        )}
        <Box gridArea='paddingBottom' height='60px' width='1' />
      </Grid>
    </ThemeContainer>
  );
}

export default App;
