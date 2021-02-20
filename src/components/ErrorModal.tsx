import {
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertIcon,
  AlertTitle,
  Box,
  Text,
} from '@chakra-ui/react';
import { useRef } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  login: string;
};
export const UserNotFoundErrorModal = ({ isOpen, onClose, login }: Props) => {
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      motionPreset='slideInBottom'
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered>
      <AlertDialogOverlay />

      <AlertDialogContent>
        <Alert status='error' backgroundColor='red.900' alignItems='flex-start'>
          <AlertIcon />
          <Box flex='1'>
            <AlertTitle>User not found!</AlertTitle>
            <AlertDescription display='block'>
              The user{' '}
              <Text fontWeight='medium' display='inline'>
                {login}
              </Text>{' '}
              was not found. Please check if you mistyped anything if you think this is wrong.
            </AlertDescription>
          </Box>
          <AlertDialogCloseButton marginRight='-3' marginTop='-2' />
        </Alert>
      </AlertDialogContent>
    </AlertDialog>
  );
};
