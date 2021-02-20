import { Box, Flex, Grid, Input, Spinner, Text, VStack } from '@chakra-ui/react';
import axios, { AxiosError, CancelTokenSource } from 'axios';
import { ReactNode, useEffect, useState } from 'react';
import { ThemeContainer } from '../theme/ThemeContainer';
import ColorModeSwitch from './ColorModeSwitch';
import { ErrorModal as ErrorModal } from './ErrorModal';
import { ProfileInformation } from './ProfileInformation';
import Repositories from './Repositories';

export type ProfileData = {
  login: string;
  name: string;
  followersCount: number;
  repositoriesCount: number;
  avatarUrl: string;
  repositories: {
    name: string;
    description: string;
    starsCount: number;
    url: string;
  }[];
};
function App() {
  const [axiosCancelToken, setAxiosCancelToken] = useState<CancelTokenSource | null>(null);
  const [inputText, setInputText] = useState('');
  const [{ hasSearched, loading, profileData }, setProfileDataState] = useState({
    hasSearched: false,
    loading: true,
    profileData: null as null | ProfileData,
  });
  const [errorModalState, setErrorModalState] = useState<{
    isOpen: boolean;
    title: string;
    description: ReactNode;
  }>({ isOpen: false, title: '', description: '' });

  useEffect(() => {
    return () => {
      axiosCancelToken?.cancel();
    };
  }, [axiosCancelToken]);

  const fetchUserData = async () => {
    const source = axios.CancelToken.source();
    setAxiosCancelToken(source);

    setProfileDataState((state) => ({ ...state, hasSearched: true, loading: true }));

    try {
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
        profileData: {
          login,
          name,
          avatarUrl,
          followersCount,
          repositories,
          repositoriesCount,
        },
      });
    } catch (error) {
      if ((error as AxiosError).response) {
        if ((error as AxiosError).response!.status === 404)
          setErrorModalState((state) => ({
            ...state,
            isOpen: true,
            title: 'User not found!',
            description: (
              <>
                The user{' '}
                <Text fontWeight='medium' display='inline'>
                  {inputText}
                </Text>{' '}
                was not found. Please check if you mistyped anything if you think this is wrong.
              </>
            ),
          }));
        else
          setErrorModalState((state) => ({
            ...state,
            isOpen: true,
            title: 'Unknown server error!',
            description: 'The server responded with an unknown error. Please try again later.',
          }));
      } else if ((error as AxiosError).request && (error as AxiosError).message === 'Network Error') {
        setErrorModalState((state) => ({
          ...state,
          isOpen: true,
          title: 'Network error!',
          description: 'Please check if you have an active internet connection and try again.',
        }));
      } else {
        setErrorModalState((state) => ({
          ...state,
          isOpen: true,
          title: 'Unknown error!',
          description: 'It was not possible to fetch the user information due to an unknown error.',
        }));
      }

      setProfileDataState((state) => ({
        ...state,
        hasSearched: false,
        loading: true,
      }));
    }

    setAxiosCancelToken(null);
  };

  return (
    <ThemeContainer>
      <ErrorModal
        {...errorModalState}
        onClose={() => setErrorModalState((state) => ({ ...state, isOpen: false }))}
      />
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
              {!hasSearched ? (
                <Text fontSize='md' color='gray.200' textAlign='center'>
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

        <ColorModeSwitch position='absolute' top='4' right='4' />
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

            {!loading && <ProfileInformation {...profileData!} />}
          </VStack>
        </Flex>

        {!loading && <Repositories repositories={profileData!.repositories} />}
        <Box gridArea='paddingBottom' height='60px' width='1' />
      </Grid>
    </ThemeContainer>
  );
}

export default App;
