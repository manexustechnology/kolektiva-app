"use client";

import { Box, Image, Text, Heading, Button, Progress } from "@chakra-ui/react";

interface PropertyCardProps {
  name: string;
  location: string;
  img: string;
  price: string;
  isNew: boolean;
  isFeatured: boolean;
  onButtonClick: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  name,
  location,
  img,
  price,
  isNew,
  isFeatured,
  onButtonClick,
}) => {
  return (
    <Box
      position="relative"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      rounded={16}
      backgroundColor="white"
      boxShadow="md"
      width={394}
      height={321}
      onClick={onButtonClick}
    >
      {/* Tag Box */}
      {isFeatured && (
        <Box
          position="absolute"
          top={2}
          right={2}
          backgroundColor="#FFFBEB"
          color="#D97706"
          padding="2px 8px"
          borderWidth="1px"
          borderRadius="full"
          borderColor="#D97706"
          fontSize="xs"
          zIndex={100}
        >
          Featured
        </Box>
      )}

      {/*Image*/}
      <div className="relative w-[394px] h-[140px]">
        <Image
          src={img}
          width={394}
          height={140}
          alt={name}
          objectFit="cover"
          className="w-full h-full"
        />
        {isNew && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center bg-[#0D9488] py-1">
            <p className="font-medium text-[10px] leading-[10px] text-white">
              New Listing
            </p>
          </div>
        )}
      </div>

      <Box paddingTop={2} marginLeft={2} marginRight={2}>
        <p className="font-bold text-sm leading-4 text-[#042F2E]">{name}</p>

        <p className=" font-normal text-xs leading-4 text-[#71717A]">
          {location}
        </p>

        {/* Progress Bar */}
        <Box
          marginTop={2}
          display="flex"
          alignItems="center"
          gap={2}
          width="374px"
          height="10px"
        >
          <Progress
            value={50}
            size="sm"
            colorScheme="teal"
            width="340px"
            height="6px"
            borderRadius="full"
          />
          {/* Progress Percentage */}
          <p className="w-[26px]  font-medium text-[10px] leading-[10px] text-right text-[#0D9488]">
            50%
          </p>
        </Box>

        {/*Info*/}
        <Box
          marginTop={4}
          display="flex"
          flexDirection="row"
          alignItems="flex-start"
          gap={6}
          width="374px"
          height="28px"
        >
          {/* Price Section */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            width="184px"
            height="28px"
            gap={2}
          >
            <p className=" font-normal text-[10px] leading-[10px] text-[#71717A]">
              Starting at
            </p>

            <p className=" font-bold text-[12px] leading-[16px] text-[#0D9488]">
              {price} LSK
            </p>
          </Box>

          {/* Tokens Section */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
            width="184px"
            height="28px"
            gap={2}
          >
            <p className=" font-normal text-[10px] leading-[10px] text-right text-[#71717A]">
              Available Tokens
            </p>
            <p className=" font-medium text-[12px] leading-[16px] text-right text-[#042F2E]">
              1000 Token
            </p>
          </Box>
        </Box>

        {/*Annual Return & Something*/}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          padding={2}
          gap={1.5}
          width="374px"
          height="49px"
          background="#F4F4F5"
          borderRadius="8px"
          flex="none"
          marginTop={4}
        >
          {/* Projected Annual Return */}
          <Box
            display="flex"
            flexDirection="row"
            alignItems="flex-start"
            padding={0}
            gap={2} // 8px
            width="358px"
            height="10px"
            flex="none"
            order={0}
            alignSelf="stretch"
            flexGrow={0}
          >
            {/* Projected Annual Return */}
            <p className="w-[327px] font-normal text-[10px] leading-[10px] text-[#71717A]">
              Projected Annual Return
            </p>

            <p className="w-[80px] font-medium text-[10px] leading-[10px] text-right text-[#042F2E]">
              8.7%
            </p>
          </Box>

          {/* Dividing Line */}
          <Box
            height="1px"
            backgroundColor="#E4E4E7"
            alignSelf="stretch"
            flexGrow={0}
          />

          {/* Projected Rental Yield */}
          <Box
            display="flex"
            flexDirection="row"
            alignItems="flex-start"
            padding={0}
            gap={2} // 8px
            width="358px"
            height="10px"
            flex="none"
            order={0}
            alignSelf="stretch"
            flexGrow={0}
          >
            {/* Projected Rental Yield */}
            <p className="w-[327px] font-normal text-[10px] leading-[10px] text-[#71717A]">
              Projected Rental Yield
            </p>

            <p className="w-[80px] font-medium text-[10px] leading-[10px] text-right text-[#042F2E]">
              18.6%
            </p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PropertyCard;
