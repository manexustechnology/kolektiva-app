"use client";

import { LiskSepoliaTestnet } from "@/commons/networks";
import { thirdwebClient } from "@/commons/thirdweb";
import {
  Box,
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  BellSimple,
  Buildings,
  CaretDown,
  GearSix,
  SignOut,
  User,
  Wallet,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ConnectButton,
  useActiveAccount,
  useActiveWallet,
  useActiveWalletChain,
  useDisconnect,
  useWalletDetailsModal,
} from "thirdweb/react";

const Navbar: React.FC = () => {
  const activeAccount = useActiveAccount();
  const address = activeAccount?.address;
  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();
  const activeChain = useActiveWalletChain();
  const pathname = usePathname();
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);
  const detailsModal = useWalletDetailsModal();

  useEffect(() => {
    console.log(activeChain);
  }, [activeChain]);

  function handleWalletOpen() {
    detailsModal.open({ client: thirdwebClient });
  }

  return (
    <div className="flex justify-center items-center gap-2 px-4 bg-[#042F2E] h-[64px] z-[100] fixed w-screen">
      <div className="max-w-[1238px] w-full">
        <div className="flex justify-between items-center">
          <Link href="/" passHref>
            <Flex align="center">
              <Image src="/images/Kolektiva_Logo.png" alt="kolektiva logo" />
              <span className="text-white ml-2">Kolektiva</span>
            </Flex>
          </Link>
          <div>
            {!isConnected ? (
              <ConnectButton
                client={thirdwebClient}
                appMetadata={{
                  name: process.env.NEXT_PUBLIC_APP_NAME || "kolektiva",
                  url:
                    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
                }}
                connectButton={{
                  className:
                    "!bg-teal-600 !px-3 !py-2 !text-white !text-sm !font-medium !rounded-full",
                  label: "Connect Wallet",
                }}
                switchButton={{
                  className:
                    "!bg-teal-600 !px-3 !py-2 !text-white !text-sm !font-medium !rounded-full",
                }}
                detailsButton={{
                  className: "!bg-teal-600 !px-6 !py-2 !rounded-full",
                }}
                autoConnect={true}
                chain={LiskSepoliaTestnet}
                chains={[LiskSepoliaTestnet]}
                onConnect={() => setIsConnected(true)}
              />
            ) : (
              <div className="flex flex-row items-center gap-2 md:gap-6 h-6 mx-auto p-0">
                {pathname !== "/list-property" && (
                  <span
                    className=" text-xs font-normal md:text-sm md:font-medium text-[#14B8A6] cursor-pointer"
                    onClick={() => router.push("/list-property")}
                  >
                    List your property
                  </span>
                )}

                <BellSimple
                  weight="fill"
                  size={24}
                  color="#FFFFFF"
                  className="hidden md:flex"
                />
                <Flex
                  direction="row"
                  align="center"
                  gap="6px"
                  width="150px"
                  height="24px"
                  padding="0"
                >
                  <Flex
                    direction="row"
                    justify="center"
                    align="center"
                    gap="10px"
                    width="24px"
                    height="24px"
                    bg="#0D9488"
                    borderRadius="full"
                    marginLeft={1}
                  >
                    <User weight="fill" size={16} color="#FFFFFF" />
                  </Flex>
                  <Menu>
                    <MenuButton
                      as="button"
                      bg="teal.600"
                      color="white"
                      px="3"
                      py="2"
                      borderRadius="full"
                      fontSize="xs"
                      fontWeight="medium"
                      _hover={{ bg: "teal.700" }}
                      _active={{ bg: "teal.800" }}
                      display="flex"
                      alignItems="center"
                      gap="2"
                    >
                      <div className="flex items-center gap-2">
                        <p className="w-[83px] h-[18px] m-0 text-ellipsis overflow-hidden whitespace-nowrap text-white text-xs">
                          {address || "No Address"}
                        </p>
                        <CaretDown weight="fill" size={16} color="#FFFFFF" />
                      </div>
                    </MenuButton>
                    <MenuList
                      position="absolute"
                      top="100%"
                      right="-10"
                      width="300px"
                      p="3"
                      bg="white"
                      borderRadius="lg"
                      boxShadow="0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)"
                      height="265px"
                    >
                      <MenuItem
                        paddingBottom={4}
                        paddingTop={4}
                        marginTop={1}
                        marginBottom={1}
                        icon={
                          <Wallet weight="fill" size={18} color="#71717A" />
                        }
                        onClick={handleWalletOpen}
                      >
                        <p className="h-[18px] text-sm font-medium text-[#3F3F46] leading-[18px] cursor-pointer">
                          Wallet
                        </p>
                      </MenuItem>
                      <MenuItem
                        paddingBottom={4}
                        paddingTop={4}
                        marginTop={1}
                        marginBottom={1}
                        icon={
                          <Buildings weight="fill" size={18} color="#71717A" />
                        }
                        onClick={() => router.push("/my-assets")}
                      >
                        <p className="h-[18px] text-sm font-medium text-[#3F3F46] leading-[18px] cursor-pointer">
                          Your Assets
                        </p>
                      </MenuItem>
                      <MenuItem
                        paddingBottom={4}
                        paddingTop={4}
                        marginTop={1}
                        marginBottom={1}
                        isDisabled={true}
                        icon={
                          <GearSix weight="fill" size={18} color="#71717A" />
                        }
                      >
                        <p className="h-[18px] text-sm font-medium text-[#3F3F46] leading-[18px] cursor-pointer">
                          Settings
                        </p>
                      </MenuItem>
                      <Box
                        width="full"
                        height="1px"
                        backgroundColor="#E4E4E7"
                        flex="none"
                        order={1}
                        marginTop={2}
                        marginBottom={2}
                      />
                      <MenuItem
                        paddingBottom={4}
                        paddingTop={4}
                        marginTop={1}
                        marginBottom={1}
                        icon={
                          <SignOut weight="fill" size={18} color="#DC2626" />
                        }
                        onClick={() => {
                          if (wallet) {
                            disconnect(wallet);
                            setIsConnected(false);
                          }
                        }}
                      >
                        <p className="h-[18px] text-sm font-medium text-[#3F3F46] leading-[18px] cursor-pointer">
                          Logout
                        </p>
                      </MenuItem>
                      {/* Add more menu items here */}
                    </MenuList>
                  </Menu>
                </Flex>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
