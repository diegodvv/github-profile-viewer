import { Flex, Heading, Image, Text, VStack } from '@chakra-ui/react';

type Props = {
  avatarUrl: string;
  login: string;
  name: string;
  followersCount: number;
  repositoriesCount: number;
};
export const ProfileInformation = ({ avatarUrl, login, name, followersCount, repositoriesCount }: Props) => {
  return (
    <>
      <Flex flexDir='column'>
        <Image src={avatarUrl} border='2px' width='184px' height='184px' />

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
  );
};
