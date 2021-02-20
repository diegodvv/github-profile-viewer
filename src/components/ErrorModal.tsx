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
} from '@chakra-ui/react';
import { ReactNode, useRef } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: ReactNode;
};
export const ErrorModal = ({ isOpen, onClose, title, description }: Props) => {
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
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription display='block'>{description}</AlertDescription>
          </Box>
          <AlertDialogCloseButton marginRight='-3' marginTop='-2' />
        </Alert>
      </AlertDialogContent>
    </AlertDialog>
  );
};
