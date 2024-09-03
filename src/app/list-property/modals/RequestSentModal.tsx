import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Flex,
  CloseButton,
  Box,
  Image,
  Icon,
} from "@chakra-ui/react";
import { ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";
import { getTransactionStatus } from "@/app/api/tx-hash";

interface RequestSentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RequestSentModal: React.FC<RequestSentModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="rgba(4, 47, 46, 0.5)" />
      <ModalContent
        width="394px"
        height="506px"
        bg="white"
        boxShadow="0px 1px 2px rgba(16, 24, 40, 0.06), 0px 1px 3px rgba(16, 24, 40, 0.1)"
        borderRadius="16px"
        overflow="hidden"
      >
        <Box position="relative" width="100%" height="100%">
          {/* Background Ellipse */}
          <Box
            position="absolute"
            width="635px"
            height="485px"
            left="-121px"
            top="-243px"
            bg="#CCFBF1"
            filter="blur(50px)"
            zIndex="-1"
            borderRadius="50%"
          />
          <Flex direction="column" h="100%" gap={6}>
            <ModalHeader>
              <CloseButton
                onClick={onClose}
                position="absolute"
                top="16px"
                right="16px"
                backgroundColor="white"
                rounded="full"
              />
            </ModalHeader>
            <ModalBody>
              <Flex
                direction="column"
                justify="center"
                align="center"
                width="346px"
              >
                {" "}
                <Flex
                  justify="center"
                  align="center"
                  position="relative"
                  padding="16px"
                >
                  {/* Kolektiva Image */}
                  <Image
                    src="/images/Kolektiva@2.png"
                    alt="Building"
                    width="140px"
                    height="140px"
                    objectFit="cover"
                    marginBottom={10}
                  />
                </Flex>
                <Flex
                  direction="column"
                  justify="center"
                  align="center"
                  gap="8px"
                  width="346px"
                >
                  <p className="w-[346px]  font-bold text-2xl leading-7 text-center text-teal-600">
                    Property listing request has sent
                  </p>

                  <p className="w-[300px] font-normal text-base leading-4 text-center text-neutral-700">
                    Your property listing request is under review. Our team will
                    contact you shortly.
                  </p>
                </Flex>
                <Button
                  marginTop={16}
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                  width="346px"
                  height="40px"
                  boxShadow="0px 1px 2px rgba(16, 24, 40, 0.06), 0px 1px 3px rgba(16, 24, 40, 0.1)"
                  backgroundColor="#FFFFFF"
                  borderRadius="100px"
                  fontFamily="'DM Sans', sans-serif"
                  fontWeight="500"
                  fontSize="14px"
                  lineHeight="18px"
                  color="black"
                  _hover={{
                    boxShadow:
                      "0px 2px 4px rgba(16, 24, 40, 0.12), 0px 2px 6px rgba(16, 24, 40, 0.15)",
                  }}
                  onClick={onClose}
                >
                  Back to explore
                </Button>
              </Flex>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </Flex>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default RequestSentModal;
