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
import {
  FacebookLogo,
  XLogo,
  WhatsappLogo,
  Copy,
  CheckCircle,
} from "@phosphor-icons/react/dist/ssr";

interface AftermarketTradingMarketBuyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AftermarketTradingMarketBuyModal: React.FC<
  AftermarketTradingMarketBuyModalProps
> = ({ isOpen, onClose }) => {
  const handleIconClick = (url: string) => {
    window.open(url, "_blank");
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        alert("Failed to copy text: ");
      });
  };

  const textToCopy =
    "b6f6991d6d825d278009c8e129d3b662ae8c59c2d6e01e8a6c6a0b8e0ba0d820";

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
                    Market buy order competed
                  </p>

                  <p className="w-[300px] font-normal text-base leading-4 text-center text-neutral-700">
                    View your transaction on the blockchain with the code below
                  </p>
                </Flex>
                <div className="flex flex-row items-center mt-4 gap-2 w-[350px] h-[64px] bg-[#F0FDFA] rounded-full z-[2] p-[12px_24px_12px_12px]">
                  {/* Text */}
                  <p className="text-teal-600 text-base font-medium overflow-hidden truncate">
                    {textToCopy}
                  </p>

                  {/* Copy Button */}
                  <Button
                    onClick={() => handleCopy(textToCopy)}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="40px"
                    height="40px"
                    bg="white"
                    borderRadius="full"
                    _focus={{ boxShadow: "none" }} // Removes default focus box shadow if needed
                  >
                    <Icon
                      as={copied ? CheckCircle : Copy}
                      boxSize="16px"
                      weight="fill"
                      color={copied ? "#4CAF50" : "#0D9488"}
                    />
                  </Button>
                </div>
                <Button
                  marginTop={4}
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                  width="346px"
                  height="40px"
                  backgroundColor="#0D9488"
                  borderRadius="100px"
                  fontFamily="'DM Sans', sans-serif"
                  fontWeight="500"
                  fontSize="14px"
                  lineHeight="18px"
                  color="#FFFFFF"
                  _hover={{ bg: "#2C8B8B" }}
                  _active={{ bg: "#2C8B8B" }}
                  onClick={onClose}
                >
                  Close
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

export default AftermarketTradingMarketBuyModal;
