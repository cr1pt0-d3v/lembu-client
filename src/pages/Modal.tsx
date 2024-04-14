import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    background,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../store/use-store';
import React from 'react';

const ModalWindow = observer(() => {
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay] = React.useState(<OverlayOne />)
    const store = useStore();

    React.useEffect(() => {
        if (store.openModal) {
            onOpen();
        }
    }, [store.openModal, onOpen]);



    const onModalClose = () => {
        onClose();
        window.location.href = "/";
    }

    return (
        <>

            <Modal isCentered isOpen={isOpen} onClose={onModalClose} closeOnOverlayClick={false} >
                {overlay}
                <ModalContent style={{ backgroundColor: "#FF6602" }} className="chakra-heading">
                    <ModalHeader>X / Twitter account cannot be linked</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="chakra-heading">{store.modalText}</div>
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={onModalClose}>Got it Lembu</button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
})

export default ModalWindow;