"use client";

import { Box, Image, Text, Heading, Button, Progress } from "@chakra-ui/react";

interface PropertyCardProps {
  name: string;
  location: string;
  img: string;
  price: string;
  onButtonClick: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  name,
  location,
  img,
  price,
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
      <Box
        position="absolute"
        top={2} // Adjust as needed
        right={2} // Adjust as needed
        backgroundColor="#FFFBEB" // Change to desired color
        color="#D97706" // Change text color if needed
        padding="2px 8px"
        borderWidth="1px"
        borderRadius="full"
        borderColor="#D97706"
        fontSize="xs"
        zIndex={100}
      >
        Featured
      </Box>

      {/*Image*/}
      <Image src={img} width={394} height={134} alt={name} objectFit="cover" />
      <Box paddingTop={2} marginLeft={2} marginRight={2}>
        <Text
          fontFamily="'DM Sans'"
          fontWeight={700}
          fontSize="14px"
          lineHeight="18px"
          color="#042F2E"
        >
          {name}
        </Text>
        <Text
          fontFamily="'DM Sans'"
          fontWeight={400}
          fontSize="12px"
          lineHeight="16px"
          color="#71717A"
        >
          {location}
        </Text>

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
          <Text
            width="26px"
            fontFamily="'DM Sans'"
            fontWeight="medium"
            fontSize="10px"
            lineHeight="10px"
            textAlign="right"
            color="#0D9488"
          >
            50%
          </Text>
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
            <Text
              fontFamily="'DM Sans'"
              fontWeight="400"
              fontSize="10px"
              lineHeight="10px"
              color="#71717A"
            >
              Starting at
            </Text>
            <Text
              fontFamily="'DM Sans'"
              fontWeight="700"
              fontSize="12px"
              lineHeight="16px"
              color="#0D9488"
            >
              {price}
            </Text>
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
            <Text
              fontFamily="'DM Sans'"
              fontWeight="400"
              fontSize="10px"
              lineHeight="10px"
              color="#71717A"
              textAlign="right"
            >
              Available Tokens
            </Text>
            <Text
              fontFamily="'DM Sans'"
              fontWeight="500"
              fontSize="12px"
              lineHeight="16px"
              color="#042F2E"
              textAlign="right"
            >
              1000 Token
            </Text>
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
            <Text
              width="327px"
              height="10px"
              fontFamily="'DM Sans', sans-serif"
              fontStyle="normal"
              fontWeight={400}
              fontSize="10px"
              lineHeight="10px"
              color="#71717A"
              flex="none"
              order={0}
              flexGrow={1}
            >
              Projected Annual Return
            </Text>

            {/* 6.0% */}
            <Text
              width="23px"
              height="10px"
              fontFamily="'DM Sans', sans-serif"
              fontStyle="normal"
              fontWeight={500}
              fontSize="10px"
              lineHeight="10px"
              color="#042F2E"
              textAlign="right"
              flex="none"
              order={1}
              flexGrow={0}
            >
              6.0%
            </Text>
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
            <Text
              width="327px"
              height="10px"
              fontFamily="'DM Sans', sans-serif"
              fontStyle="normal"
              fontWeight={400}
              fontSize="10px"
              lineHeight="10px"
              color="#71717A"
              flex="none"
              order={0}
              flexGrow={1}
            >
              Projected Rental Yield
            </Text>

            {/* 8.6% */}
            <Text
              width="23px"
              height="10px"
              fontFamily="'DM Sans', sans-serif"
              fontStyle="normal"
              fontWeight={500}
              fontSize="10px"
              lineHeight="10px"
              color="#042F2E"
              textAlign="right"
              flex="none"
              order={1}
              flexGrow={0}
            >
              8.6%
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PropertyCard;
