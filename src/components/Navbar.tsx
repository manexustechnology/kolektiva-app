'use client';

import { thirdwebClient } from "@/commons/thirdweb";
import { Box, Flex, Spacer, Image } from "@chakra-ui/react";
import Link from "next/link";
import { RefObject, useEffect, useRef, useState } from "react";
import { ConnectButton, useActiveAccount, useActiveWallet, useEnsAvatar } from "thirdweb/react";

interface NavbarProps {
  topNavHeightChange?: (height: number | undefined) => void;
}

const Navbar: React.FC<NavbarProps> = ({ topNavHeightChange }) => {
  const topNavRef = useRef<HTMLDivElement>(null);
  const activeAccount = useActiveAccount();

  useEffect(() => {
    if (topNavHeightChange) {
      topNavHeightChange(topNavRef.current?.offsetHeight)
    }
  }, [topNavRef.current?.offsetHeight, activeAccount]);

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
      h="auto"
      mx="auto"
      position="fixed"
      zIndex={100}
      ref={topNavRef}
    >
      <Box width="1238px" mx="auto">
        <div className="flex justify-between items-center">
          <Link href="/" passHref>
            <Flex align="center">
              <Image src="/images/Kolektiva_Logo.png" alt="kolektiva logo" />
              <span className="text-white ml-2">Kolektiva</span>
            </Flex>
          </Link>
          <ConnectButton
            client={thirdwebClient}
            appMetadata={{
              name: process.env.NEXT_PUBLIC_APP_NAME || 'kolektiva',
              url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
            }}
            connectButton={{
              className: '!bg-teal-600 !px-3 !py-2 !text-white !text-sm !font-medium !rounded-full',
              label: 'Connect Wallet',
            }}
            detailsButton={{
              className: '!bg-teal-600 !px-6 !py-2 !rounded-full'
            }}
          />
        </div>
      </Box>
    </Flex>
  );
};

export default Navbar;
