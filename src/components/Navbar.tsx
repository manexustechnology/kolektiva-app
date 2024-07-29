import { Box, Flex, Spacer, Button, Image } from "@chakra-ui/react";
import Link from "next/link";
import { RefObject } from "react";

interface NavbarProps {
  navbarRef: RefObject<HTMLDivElement>
}

const Navbar: React.FC<NavbarProps> = ({
  navbarRef
}) => {
  return (
    <Flex
      as="div"
      direction="row"
      justify="center"
      align="center"
      p={3}
      px={32}
      gap={2}
      bg="#042F2E"
      w="100%"
      h="56px"
      mx="auto"
      position="fixed"
      zIndex={100}
      ref={navbarRef}
    >
      <div className="flex justify-between items-center max-w-[1238px] w-full p-2">
        <Link href="/" passHref>
          <Flex align="center">
            <Image src="/images/Kolektiva_Logo.png" alt="kolektiva logo" />
            <span className="text-white ml-2">Kolektiva</span>
          </Flex>
        </Link>

        <Spacer />
        <Button rounded="full" color="white" bg="#0D9488">
          Connect Wallet
        </Button>
      </div>
    </Flex>
  );
};

export default Navbar;
