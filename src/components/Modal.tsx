import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Text,
  Center,
  Heading,
  Button,
} from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/use-store';
import React from 'react';

const ModalWindow = observer(() => {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay] = React.useState(<OverlayOne />);
  const store = useStore();

  React.useEffect(() => {
    if (store.openModal) {
      onOpen();
    }
  }, [store.openModal, onOpen]);

  const onModalClose = () => {
    onClose();
    window.location.href = '/';
  };

  return (
    <>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onModalClose}
        closeOnOverlayClick={false}
      >
        {overlay}
        <ModalContent
          bgGradient="linear(to-b, #7928CA, #FF0080)"
          color="gray.50"
          rounded="lg"
          className="chakra-heading"
          textAlign="center"
        >
          <ModalHeader>
            <Center>
              <Heading size="md">X / Twitter account cannot be linked</Heading>
            </Center>
          </ModalHeader>
          <ModalBody>
            <Text className="chakra-heading">{store.modalText}</Text>
          </ModalBody>
          <ModalFooter alignSelf="center">
            <Button onClick={onModalClose} color="#FF0080" rounded="2xl">
              Return to homepage
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});

export default ModalWindow;
