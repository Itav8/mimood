import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton
} from "@chakra-ui/react";
interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = (props: ModalProps) => {
  return (
    <ChakraModal isOpen={props.open} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent p={3}>
        <ModalCloseButton />
        <div className="modal__content">
          {props.children}
        </div>
      </ModalContent>
    </ChakraModal>
  );
};
