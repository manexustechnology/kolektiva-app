import { Box, Button, Image } from "@chakra-ui/react";
import { ArrowUpRight, CaretUp } from "@phosphor-icons/react/dist/ssr";
import React from "react";
import MyAssetListing from "./components/MyAssetListing";

const MyAssets: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2.5">
      <div className="flex flex-col items-start justify-start pt-[16px] gap-3 w-[1238px] max-w-[1238px]">
        <p className="text-2xl font-bold">Assets overview</p>

        {/*Cards*/}
        <div className=" flex flex-row w-full gap-4">
          <div className="flex flex-col items-start p-4 gap-2 w-[394px] h-[180px] bg-white shadow-md rounded-2xl relative z-10 overflow-hidden">
            {/* Background Ellipse */}
            <Box
              position="absolute"
              width="300px"
              height="485px"
              right="-100px"
              top="-240px"
              bg="#5EEAD4"
              filter="blur(50px)"
              zIndex="-1"
              borderRadius="50%"
            />
            <Image
              src="/images/Kolektiva_MyAsset.png"
              alt="Kolektiva Asset"
              position="absolute"
              width="170px"
              height="170px"
              right="-8px"
              bottom="-4px"
              zIndex="2"
            />
            <div className="flex flex-col items-start gap-2 w-[362px] h-12">
              <p className="w-full h-4 text-sm font-normal text-[#71717A] leading-[18px]">
                Current rent balance
              </p>
              <p className="w-full h-6 text-lg font-bold text-[#042F2E] leading-[24px]">
                1,233.92 USD
              </p>
            </div>
            <div className="mt-auto w-full flex justify-start">
              <Button
                display="flex"
                alignItems="center"
                justifyContent="center"
                padding="12px 16px"
                width="119px"
                height="40px"
                backgroundColor="#0D9488"
                borderRadius="full"
                color="white"
                fontSize="14px"
                fontWeight="500"
                lineHeight="18px"
                _hover={{ bg: "#0A7A6A" }}
                leftIcon={<ArrowUpRight weight="fill" size={16} />}
              >
                Withdraw
              </Button>
            </div>
          </div>

          <div className=" flex flex-col gap-4">
            <div className="flex flex-col items-start p-4 gap-2.5 w-[394px] h-[82px] bg-white shadow-md rounded-lg">
              <p className="w-[362px] h-[18px] text-sm font-normal text-[#71717A] leading-[18px]">
                Current account value
              </p>
              <p className="w-[362px] h-[24px] text-lg font-bold text-[#042F2E] leading-[24px]">
                19,472.09 USD
              </p>
            </div>

            <div className="flex flex-col items-start p-4 gap-2.5 w-[394px] h-[82px] bg-white shadow-md rounded-lg">
              <p className="w-[362px] h-[18px] text-sm font-normal text-[#71717A] leading-[18px]">
                Total property value
              </p>
              <p className="w-[362px] h-[24px] text-lg font-bold text-[#042F2E] leading-[24px] flex items-center">
                <span>19,472.09 USD</span>
                <span className="flex items-center ml-2">
                  <CaretUp size={16} color="#65A30D" weight="fill" />
                  <span className="text-sm font-medium text-[#65A30D] leading-[18px] ml-1">
                    5.05%
                  </span>
                </span>
              </p>
            </div>
          </div>
          <div className=" flex flex-col gap-4">
            <div className="flex flex-col items-start p-4 gap-2.5 w-[394px] h-[82px] bg-white shadow-md rounded-lg">
              <p className="w-[362px] h-[18px] text-sm font-normal text-[#71717A] leading-[18px]">
                Total Rent Earned
              </p>
              <p className="w-[362px] h-[24px] text-lg font-bold text-[#042F2E] leading-[24px]">
                19,472.09 USD
              </p>
            </div>

            <div className="flex flex-col items-start p-4 gap-2.5 w-[394px] h-[82px] bg-white shadow-md rounded-lg">
              <p className="w-[362px] h-[18px] text-sm font-normal text-[#71717A] leading-[18px]">
                Property owned
              </p>
              <p className="w-[362px] h-[24px] text-lg font-bold text-[#042F2E] leading-[24px]">
                11
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div className="w-[1214px] h-[1px] bg-[#E4E4E7] self-stretch mb-2 mt-2" />
          <p className="text-2xl font-bold">Your Assets</p>
        </div>
        <MyAssetListing />
      </div>
    </div>
  );
};

export default MyAssets;
