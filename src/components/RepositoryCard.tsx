import { createIcon, Flex, Heading, Text } from '@chakra-ui/react';
import { theme } from '../theme/theme';

const StarIcon = createIcon({
  displayName: 'StarIcon',
  path: (
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12.81 7.12L20 7.74L14.55 12.47L16.18 19.5L10 15.77L3.82 19.5L5.46 12.47L0 7.74L7.19 7.13L10 0.5L12.81 7.12ZM6.24 16.17L10 13.9L13.77 16.18L12.77 11.9L16.09 9.02L11.71 8.64L10 4.6L8.3 8.63L3.92 9.01L7.24 11.89L6.24 16.17Z'
      fill={theme.colors.gray[300]}
    />
  ),
  viewBox: '0 0 20 20',
  defaultProps: { width: '20px', height: '20px' },
});

type Props = {
  name: string;
  description: string;
  starsCount: number;
  url: string;
};
export const RepositoryCard = ({ name, description, starsCount, url }: Props) => {
  return (
    <Flex
      flexDir='column'
      backgroundColor='gray.100'
      maxHeight='118px'
      width='526px'
      paddingX='24px'
      paddingTop='16px'
      paddingBottom='24px'
      boxShadow='lg'
      _hover={{ backgroundColor: 'white', cursor: 'pointer' }}
      onClick={() => window.open(url, '_blank')}>
      <Flex justifyContent='space-between'>
        <Heading as='h3' color='black' fontSize='24px' isTruncated>
          {name}
        </Heading>
        <Flex align='flex-start' paddingLeft='8px' paddingTop='4px'>
          <Text color='gray.300'>{starsCount}</Text>
          <StarIcon marginLeft='6px' />
        </Flex>
      </Flex>
      <Text color='gray.900' marginTop='11px' lineHeight='normal' noOfLines={2} isTruncated>
        {description}
      </Text>
    </Flex>
  );
};
