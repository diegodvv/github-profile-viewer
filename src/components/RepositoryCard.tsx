import { Flex, Heading, Text } from '@chakra-ui/react';
import { theme } from '../theme/theme';

const StarIcon = () => {
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M12.81 7.12L20 7.74L14.55 12.47L16.18 19.5L10 15.77L3.82 19.5L5.46 12.47L0 7.74L7.19 7.13L10 0.5L12.81 7.12ZM6.24 16.17L10 13.9L13.77 16.18L12.77 11.9L16.09 9.02L11.71 8.64L10 4.6L8.3 8.63L3.92 9.01L7.24 11.89L6.24 16.17Z'
        fill={theme.colors.gray[300]}
      />
    </svg>
  );
};

export const RepositoryCard = () => {
  return (
    <Flex flexDir='column' backgroundColor='gray.100' maxHeight='118px'>
      <Flex justifyContent='space-between'>
        <Heading as='h3' color='black'>
          google-homepage
        </Heading>
        <Flex>
          <Text color='gray.300'>50</Text>
          <StarIcon />
        </Flex>
      </Flex>
      <Text color='gray.900' textOverflow='ellipsis' overflow='hidden'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna a...{' '}
      </Text>
    </Flex>
  );
};
