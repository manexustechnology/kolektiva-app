"use client";

import { Box, Image, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  TelegramLogo,
  DiscordLogo,
  LinkedinLogo,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";

const Footer: React.FC = () => {
  const router = useRouter();

  const handleIconClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <footer className="relative bottom-0 left-0 right-0 bg-[#042F2E] text-white flex flex-col items-center p-0 gap-2.5 w-screen">
      <div className="flex flex-col md:flex-row md:justify-between items-center p-6 gap-6 w-full max-w-[1238px] bg-[#042F2E] h-full">
        <div className="flex flex-col items-center md:items-start p-0 gap-6 w-full">
          <Link href="/" passHref>
            <div className="flex items-center">
              <Image src="/images/Kolektiva_Logo.png" alt="kolektiva logo" />
              <span className="text-white ml-2">Kolektiva</span>
            </div>
          </Link>
          <div className="flex gap-4 flex-wrap justify-center md:justify-start">
            <a
              href="/about"
              className="text-white text-sm font-normal hover:underline"
            >
              About us
            </a>
            <a
              href="/privacy-policy"
              className="text-white text-sm font-normal hover:underline"
            >
              Privacy policy
            </a>
            <a
              href="/terms-of-service"
              className="text-white text-sm font-normal hover:underline"
            >
              Terms of service
            </a>
            <a
              href="/contact"
              className="text-white text-sm font-normal hover:underline"
            >
              Contact us
            </a>
          </div>

          <div className="flex flex-row items-start gap-6 w-[168px] h-[24px]">
            <Icon
              as={TelegramLogo}
              boxSize="24px"
              color="white"
              weight="fill"
              onClick={() =>
                handleIconClick("https://t.me/KolektivaProperties")
              }
              className="cursor-pointer"
            />
            {/* <Icon
              as={DiscordLogo}
              boxSize="24px"
              color="white"
              weight="fill"
              onClick={() => handleIconClick("https://discord.gg/")}
              className="cursor-pointer"
            /> */}
            <Icon
              as={XLogo}
              boxSize="24px"
              color="white"
              weight="fill"
              onClick={() => handleIconClick("https://x.com/kolektiva_prop")}
              className="cursor-pointer"
            />
            {/* <Icon
              as={LinkedinLogo}
              boxSize="24px"
              color="white"
              weight="fill"
              onClick={() => handleIconClick("https://linkedin.com/in/")}
              className="cursor-pointer"
            /> */}
          </div>
        </div>
        <div className="flex justify-center md:justify-end items-end self-end d w-full">
          <p className="text-white text-sm font-normal">
            &copy; {new Date().getFullYear()} Kolektiva
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
