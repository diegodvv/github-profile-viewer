import { Flex, Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { ProfileData } from './App';
import { RepositoryCard } from './RepositoryCard';

type Props = {
  repositories: ProfileData['repositories'];
};
const Repositories = ({ repositories }: Props) => {
  return (
    <Flex gridArea='repositories' flexDir='column' alignItems='flex-start'>
      <Heading>repositories</Heading>
      <VStack spacing='40px' marginTop='24px'>
        {repositories.map((repository, index) => (
          <RepositoryCard {...repository} key={index} />
        ))}
      </VStack>
    </Flex>
  );
};

export default Repositories;
