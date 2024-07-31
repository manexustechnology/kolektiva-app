"use client";

import { Box, Grid, Button, Flex } from "@chakra-ui/react";
import PropertyCard from "./PropertyCard";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  CaretDoubleLeft,
  CaretLeft,
  CaretRight,
  CaretLineLeft,
  CaretLineRight,
} from "@phosphor-icons/react/dist/ssr";

interface PropertyCardData {
  name: string;
  slug: string;
  location: string;
  img: string;
  price: string;
  isNew: boolean;
  isFeatured: boolean;
}

interface PropertyCardsProps {
  cards?: PropertyCardData[];
}

const PropertyCards: React.FC<PropertyCardsProps> = ({ cards }) => {
  const router = useRouter();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  // Handle button click action
  const handleButtonClick = (slug: string) => {
    router.push("/detail/" + slug);
  };

  // Test data
  const cardData: PropertyCardData[] = [
    {
      name: "Luxury Villa",
      slug: "luxury-villa",
      location: "Beverly Hills, CA",
      img: "/images/Property_Image.jpg",
      price: "82,500",
      isNew: true,
      isFeatured: true,
    },
    {
      name: "Modern Apartment",
      slug: "modern-apartment",
      location: "New York, NY",
      img: "/images/Property_Image.jpg",
      price: "26,000",
      isNew: false,
      isFeatured: true,
    },
    {
      name: "The Den",
      slug: "the-den",
      location: "Los Angeles, LA",
      img: "/images/Property_Image.jpg",
      price: "9500",
      isNew: true,
      isFeatured: false,
    },
    {
      name: "Modern Apartment3",
      slug: "modern-apartment",
      location: "New York, NY",
      img: "/images/Property_Image.jpg",
      price: "15,000",
      isNew: false,
      isFeatured: false,
    },
    {
      name: "Cozy Cottage",
      slug: "cozy-cottage",
      location: "Aspen, CO",
      img: "/images/Property_Image.jpg",
      price: "69,200",
      isNew: true,
      isFeatured: true,
    },
  ];

  // Use provided cards if available, otherwise use test data
  const cardsToDisplay = cards || cardData;

  // Pagination logic
  const totalPages = Math.ceil(cardsToDisplay.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCards = cardsToDisplay.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Generate page numbers with ellipses
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showAdjacent = 2; // Number of adjacent pages to show

    // Show first page
    if (currentPage > 0) pages.push(1);

    // Show ellipsis if there is a gap between the first page and the current page
    if (currentPage > showAdjacent + 2) {
      pages.push("...");
    }

    // Show adjacent pages before and after the current page
    for (
      let i = Math.max(2, currentPage - showAdjacent);
      i <= Math.min(totalPages - 1, currentPage + showAdjacent);
      i++
    ) {
      pages.push(i);
    }

    // Show ellipsis if there is a gap between the last page and the current page
    if (currentPage < totalPages - showAdjacent - 1) {
      pages.push("...");
    }

    // Show last page
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <Box width={1238} pl={0} py={4}>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={4}
      >
        {currentCards.map((card, index) => (
          <PropertyCard
            key={index}
            name={card.name}
            location={card.location}
            img={card.img}
            price={card.price}
            isNew={card.isNew}
            isFeatured={card.isFeatured}
            onButtonClick={() => handleButtonClick(card.slug)} // Handle button click
          />
        ))}
      </Grid>

      {/*Pageation UI*/}
      <Flex
        mt={4}
        justifyContent="center"
        alignItems="center"
        gap={3}
        width="1214px"
        height="40px"
      >
        <Button
          onClick={() => setCurrentPage(1)}
          bg="#CCFBF1"
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={2}
          w={10}
          h={10}
          isDisabled={currentPage === 1}
          _disabled={{ bg: "gray.300", cursor: "not-allowed", opacity: 0.4 }}
        >
          <CaretLineLeft size={16} weight="fill" color="#0F766E" />
        </Button>

        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          bg="#CCFBF1"
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={2}
          w={10}
          h={10}
          isDisabled={currentPage === 1}
          _disabled={{ bg: "gray.300", cursor: "not-allowed", opacity: 0.4 }}
        >
          <CaretLeft size={16} weight="fill" color="#0F766E" />
        </Button>

        {getPageNumbers().map((page, index) => (
          <Button
            key={index}
            onClick={() => {
              if (typeof page === "number") {
                handlePageChange(page);
              }
            }}
            bg={page === currentPage ? "#B91C1C" : "#CCFBF1"} // Dark red for current page
            color={page === currentPage ? "#FFF" : "#0F766E"}
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={2}
            w={10}
            h={10}
            isDisabled={page === "..."}
            _disabled={{ bg: "gray.300", cursor: "not-allowed", opacity: 0.4 }}
          >
            {page}
          </Button>
        ))}

        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          bg="#CCFBF1"
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={2}
          w={10}
          h={10}
          isDisabled={currentPage === totalPages}
          _disabled={{ bg: "gray.300", cursor: "not-allowed", opacity: 0.4 }}
        >
          <CaretRight size={16} weight="fill" color="#0F766E" />
        </Button>
        <Button
          onClick={() => setCurrentPage(totalPages)}
          bg="#CCFBF1"
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={2}
          w={10}
          h={10}
          isDisabled={currentPage === totalPages}
          _disabled={{ bg: "gray.300", cursor: "not-allowed", opacity: 0.4 }}
        >
          <CaretLineRight size={16} weight="fill" color="#0F766E" />
        </Button>
      </Flex>
    </Box>
  );
};

export default PropertyCards;
