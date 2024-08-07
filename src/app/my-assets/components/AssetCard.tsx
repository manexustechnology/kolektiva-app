"use client";

import { Box, Image, Text, Heading, Button, Progress } from "@chakra-ui/react";
import {
  CaretUp,
  Download,
  UsersThree,
  CaretDown,
} from "@phosphor-icons/react/dist/ssr";

interface AssetCardProps {
  name: string;
  location: string;
  img: string;
  price: string;
  isNew: boolean;
  isFeatured: boolean;
  isTraded: boolean;
  profitPercentage?: number;
  lossPercentage?: number;
  onButtonClick: () => void;
}

const AssetCard: React.FC<AssetCardProps> = ({
  name,
  location,
  img,
  price,
  isNew,
  isFeatured,
  isTraded,
  profitPercentage,
  lossPercentage,
  onButtonClick,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="flex-start"
      padding="16px"
      gap="16px"
      width="1214px"
      height="157px"
      backgroundColor="#FFFFFF"
      boxShadow="0px 1px 2px rgba(16, 24, 40, 0.06), 0px 1px 3px rgba(16, 24, 40, 0.1)"
      borderRadius="16px"
    >
      <Image
        src={img}
        alt="Asset Image"
        boxSize="120px"
        objectFit="cover"
        borderRadius="12px"
      />

      {/* info box here */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap="12px"
        width="1037px"
        height="125px"
      >
        <Box
          position="relative"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-start"
          gap="16px"
          width="1037px"
          height="24px"
        >
          {/* Tag Box of trading*/}
          {isTraded ? (
            <Box
              backgroundColor="#F0FDFA"
              color="#0D9488"
              padding="2px 8px"
              borderWidth="1px"
              borderRadius="full"
              borderColor="#0D9488"
              fontSize="xs"
            >
              Aftermarket Trading
            </Box>
          ) : (
            <Box
              backgroundColor="#F7FEE7"
              color="#65A30D"
              padding="2px 8px"
              borderWidth="1px"
              borderRadius="full"
              borderColor="#65A30D"
              fontSize="xs"
            >
              Initial Offering
            </Box>
          )}

          <Box
            marginLeft="auto"
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap="24px"
            width="330px"
            height="18px"
          >
            {/* Button 1 */}
            <Button
              display="flex"
              flexDirection="row"
              alignItems="center"
              height="18px"
              backgroundColor="white"
              _hover={{ color: "#F7FEE7" }}
              leftIcon={<UsersThree weight="fill" size={16} color="#0D9488" />}
            >
              <p className="text-sm font-medium text-[#0D9488]">
                Go to community
              </p>
            </Button>

            {/* Button 2 */}
            <Button
              display="flex"
              flexDirection="row"
              alignItems="center"
              height="18px"
              backgroundColor="white"
              _hover={{ color: "#F7FEE7" }}
              leftIcon={<Download weight="fill" size={16} color="#0D9488" />}
            >
              <p className="text-sm font-medium text-[#0D9488]">
                Download documents
              </p>
            </Button>
          </Box>
        </Box>

        <div className="w-[482px] h-[24px] text-lg font-bold text-[#042F2E] leading-[24px] flex items-center">
          <span>{name}</span>
          <div className="flex space-x-2 ml-2">
            {profitPercentage !== undefined && profitPercentage > 0 && (
              <span className="flex items-center">
                <CaretUp size={16} color="#65A30D" weight="fill" />
                <span className="text-sm font-medium text-[#65A30D] leading-[18px] ml-1">
                  {profitPercentage}%
                </span>
              </span>
            )}
            {lossPercentage !== undefined && lossPercentage > 0 && (
              <span className="flex items-center">
                <CaretDown size={16} color="#DC2626" weight="fill" />
                <span className="text-sm font-medium text-[#DC2626] leading-[18px] ml-1">
                  {lossPercentage}%
                </span>
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-row justify-between items-center gap-4 w-[1037px] h-[40px]">
          {/* Column 1 */}
          <div className="flex flex-col items-start gap-1 w-[1/5] h-[40px]">
            <p className=" h-[16px] text-xs font-normal text-[#71717A]">
              Token owned
            </p>
            <div className="flex flex-row items-center gap-1 w-[207.4px] h-[18px]">
              <p className=" h-[18px] text-sm font-bold text-[#042F2E]">12</p>
              <p className=" h-[18px] text-sm font-normal text-[#71717A]">
                of 5386 (0.93%)
              </p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col items-start gap-1 w-[1/5] h-[40px]">
            <p className=" h-[16px] text-xs font-normal text-[#71717A]">
              Your CoC return
            </p>
            <div className="flex flex-row items-center gap-1 w-[207.4px] h-[18px]">
              <p className=" h-[18px] text-sm font-bold text-[#042F2E]">
                6.89%
              </p>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col items-start gap-1 w-[1/5] h-[40px]">
            <p className="text-xs font-normal text-[#71717A] flex items-center space-x-2">
              <span>Current value</span>
              {profitPercentage !== undefined && profitPercentage > 0 && (
                <span className="flex items-center space-x-1">
                  <CaretUp size={12} color="#65A30D" weight="fill" />
                  <span className="text-xs font-normal text-[#65A30D] leading-[18px]">
                    5.05%
                  </span>
                </span>
              )}
              {lossPercentage !== undefined && lossPercentage > 0 && (
                <span className="flex items-center ml-2">
                  <CaretDown size={16} color="#DC2626" weight="fill" />
                  <span className="text-xs font-normal text-[#DC2626] leading-[18px] ml-1">
                    {lossPercentage}%
                  </span>
                </span>
              )}
            </p>
            <div className="flex flex-row items-center gap-1 w-[207.4px] h-[18px]">
              <p className=" h-[18px] text-sm font-bold text-[#042F2E]">
                1200 LSK
              </p>
            </div>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col items-start gap-1 w-[1/5] h-[40px]">
            <p className=" h-[16px] text-xs font-normal text-[#71717A]">
              Current rent balance
            </p>
            <div className="flex flex-row items-center gap-1 w-[207.4px] h-[18px]">
              <p className=" h-[18px] text-sm font-bold text-[#042F2E]">
                69.69 LSK
              </p>
            </div>
          </div>

          {/* Column 5 */}
          <div className="flex flex-col items-start gap-1 w-[1/5] h-[40px]">
            <p className=" h-[16px] text-xs font-normal text-[#71717A]">
              Total rent earned
            </p>
            <div className="flex flex-row items-center gap-1 w-[207.4px] h-[18px]">
              <p className=" h-[18px] text-sm font-bold text-[#042F2E]">
                200.01 LSK
              </p>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default AssetCard;
