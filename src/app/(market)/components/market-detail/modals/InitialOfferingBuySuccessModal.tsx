import React from "react";
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
} from "@phosphor-icons/react/dist/ssr";

interface InitialOfferingBuySuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InitialOfferingBuySuccessModal: React.FC<
  InitialOfferingBuySuccessModalProps
> = ({ isOpen, onClose }) => {
  const handleIconClick = (url: string) => {
    window.open(url, "_blank");
  };

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
            <ModalHeader marginTop={16}>
              <CloseButton
                onClick={onClose}
                position="absolute"
                top="16px"
                right="16px"
                backgroundColor="white"
                rounded="full"
              />
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
                />
              </Flex>
            </ModalHeader>
            <ModalBody>
              <Flex
                direction="column"
                justify="center"
                align="center"
                width="346px"
              >
                <Flex
                  direction="column"
                  justify="center"
                  align="center"
                  gap="8px"
                  width="346px"
                >
                  <p className="w-[346px]  font-bold text-2xl leading-7 text-center text-teal-600">
                    You just bought some real estate
                  </p>

                  <p className="w-[300px] font-normal text-base leading-4 text-center text-neutral-700">
                    You are now officially an owner of Jl Pinangsia Raya Komplek
                    Glodok Plaza Bl B-22 in DKI Jakarta
                  </p>
                </Flex>

                <div className="flex flex-row items-center mt-4 gap-2 w-[249px] h-[64px] bg-[#F0FDFA] rounded-full z-[2] p-[12px_24px_12px_12px]">
                  <div className="flex flex-row items-center gap-2">
                    <p className="  font-medium text-[14px] leading-[18px] text-[#0F766E]">
                      Share via
                    </p>
                    <Button
                      display="flex"
                      flexDirection="row"
                      justifyContent="center"
                      alignItems="center"
                      padding="12px 16px"
                      gap="6px"
                      width="40px"
                      height="40px"
                      bg="#0D9488"
                      borderRadius="100px"
                      _focus={{ boxShadow: "none" }}
                      onClick={() => handleIconClick("https://facebook.com/")}
                    >
                      <Icon
                        as={FacebookLogo}
                        boxSize="16px"
                        weight="fill"
                        color="white"
                      />
                    </Button>
                    <Button
                      display="flex"
                      flexDirection="row"
                      justifyContent="center"
                      alignItems="center"
                      padding="12px 16px"
                      gap="6px"
                      width="40px"
                      height="40px"
                      bg="#0D9488"
                      borderRadius="100px"
                      _focus={{ boxShadow: "none" }}
                      onClick={() => handleIconClick("https://x.com/")}
                    >
                      <Icon
                        as={XLogo}
                        boxSize="16px"
                        weight="fill"
                        color="white"
                      />
                    </Button>
                    <Button
                      display="flex"
                      flexDirection="row"
                      justifyContent="center"
                      alignItems="center"
                      padding="12px 16px"
                      gap="6px"
                      width="40px"
                      height="40px"
                      bg="#0D9488"
                      borderRadius="100px"
                      _focus={{ boxShadow: "none" }}
                      onClick={() => handleIconClick("https://wa.me/")}
                    >
                      <Icon
                        as={WhatsappLogo}
                        boxSize="16px"
                        weight="fill"
                        color="white"
                      />
                    </Button>
                  </div>
                </div>
              </Flex>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </Flex>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default InitialOfferingBuySuccessModal;
