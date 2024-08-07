"use client";

import { Box, Grid, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  CaretDoubleLeft,
  CaretLeft,
  CaretRight,
  CaretLineLeft,
  CaretLineRight,
  FileMagnifyingGlass,
} from "@phosphor-icons/react/dist/ssr";
import AssetCard from "./AssetCard";

interface PropertyCardData {
  name: string;
  slug: string;
  location: string;
  img: string;
  price: string;
  isNew: boolean;
  isFeatured: boolean;
  isTraded: boolean;
  profitPercentage?: number;
  lossPercentage?: number;
}

interface AssetCardsProps {
  cards?: PropertyCardData[];
}

const AssetCards: React.FC<AssetCardsProps> = ({ cards }) => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleButtonClick = (slug: string) => {
    router.push("/detail/" + slug);
  };

  const cardData: PropertyCardData[] = [
    {
      name: "Luxury Villa",
      slug: "luxury-villa",
      location: "Beverly Hills, CA",
      img: "/images/Property_Image.jpg",
      price: "82,500",
      isNew: true,
      isFeatured: true,
      isTraded: false,
      profitPercentage: 10,
      lossPercentage: 0,
    },
    {
      name: "Modern Apartment",
      slug: "modern-apartment",
      location: "New York, NY",
      img: "/images/Property_Image.jpg",
      price: "26,000",
      isNew: false,
      isFeatured: true,
      isTraded: false,
      profitPercentage: 0,
      lossPercentage: 32.5,
    },
    {
      name: "The Den",
      slug: "the-den",
      location: "Los Angeles, LA",
      img: "/images/Property_Image.jpg",
      price: "9500",
      isNew: true,
      isFeatured: false,
      isTraded: true,
      profitPercentage: 6.9,
      lossPercentage: 0,
    },
    {
      name: "Modern Apartment3",
      slug: "modern-apartment3",
      location: "New York, NY",
      img: "/images/Property_Image.jpg",
      price: "15,000",
      isNew: false,
      isFeatured: false,
      isTraded: false,
      profitPercentage: 0,
      lossPercentage: 0,
    },
    {
      name: "Cozy Cottage",
      slug: "cozy-cottage",
      location: "Aspen, CO",
      img: "/images/Property_Image.jpg",
      price: "69,200",
      isNew: true,
      isFeatured: true,
      isTraded: true,
      profitPercentage: 7.9,
      lossPercentage: 0,
    },
    {
      name: "Luxury Villa",
      slug: "luxury-villa",
      location: "Beverly Hills, CA",
      img: "/images/Property_Image.jpg",
      price: "82,500",
      isNew: true,
      isFeatured: true,
      isTraded: false,
      profitPercentage: 0,
      lossPercentage: 10.01,
    },
    {
      name: "Modern Apartment",
      slug: "modern-apartment",
      location: "New York, NY",
      img: "/images/Property_Image.jpg",
      price: "26,000",
      isNew: false,
      isFeatured: true,
      isTraded: true,
      profitPercentage: 0,
      lossPercentage: 1.1,
    },
    {
      name: "The Den",
      slug: "the-den",
      location: "Los Angeles, LA",
      img: "/images/Property_Image.jpg",
      price: "9500",
      isNew: true,
      isFeatured: false,
      isTraded: true,
      profitPercentage: 0,
      lossPercentage: 0,
    },
    {
      name: "Modern Apartment3",
      slug: "modern-apartment3",
      location: "New York, NY",
      img: "/images/Property_Image.jpg",
      price: "15,000",
      isNew: false,
      isFeatured: false,
      isTraded: true,
      profitPercentage: 27.14,
      lossPercentage: 0,
    },
    {
      name: "Cozy Cottage",
      slug: "cozy-cottage",
      location: "Aspen, CO",
      img: "/images/Property_Image.jpg",
      price: "69,200",
      isNew: true,
      isFeatured: true,
      isTraded: true,
      profitPercentage: 0,
      lossPercentage: 0,
    },
  ];

  const cardsToDisplay = cards || cardData;

  const totalPages = Math.ceil(cardsToDisplay.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCards = cardsToDisplay.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showAdjacent = 2;

    if (currentPage > 0) pages.push(1);

    if (currentPage > showAdjacent + 2) {
      pages.push("...");
    }

    for (
      let i = Math.max(2, currentPage - showAdjacent);
      i <= Math.min(totalPages - 1, currentPage + showAdjacent);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - showAdjacent - 1) {
      pages.push("...");
    }

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <Box width={1238} pl={0} py={4}>
      {cardsToDisplay.length === 0 ? (
        <div className="flex flex-col justify-center items-center p-12 gap-1 w-[1214px] h-[404px] ">
          <div className="flex flex-row items-center p-3 gap-2 w-14 h-14 bg-zinc-100 rounded-full">
            <div className=" relative flex items-center justify-center">
              <FileMagnifyingGlass size={32} weight="fill" color="#A1A1AA" />
            </div>
          </div>
          <p>No Result Found</p>
          <p>Please try another filter combination</p>
        </div>
      ) : (
        <>
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(1, 1fr)",
              lg: "repeat(1, 1fr)",
            }}
            gap={4}
          >
            {currentCards.map((card, index) => (
              <AssetCard
                key={index}
                name={card.name}
                location={card.location}
                img={card.img}
                price={card.price}
                isNew={card.isNew}
                isFeatured={card.isFeatured}
                isTraded={card.isTraded}
                profitPercentage={card.profitPercentage}
                lossPercentage={card.lossPercentage}
                onButtonClick={() => handleButtonClick(card.slug)}
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
              _disabled={{
                bg: "gray.300",
                cursor: "not-allowed",
                opacity: 0.4,
              }}
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
              _disabled={{
                bg: "gray.300",
                cursor: "not-allowed",
                opacity: 0.4,
              }}
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
                bg={page === currentPage ? "#0D9488" : "#F4F4F5"}
                color={page === currentPage ? "white" : "black"}
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={2}
                w={10}
                h={10}
                isDisabled={page === "..."}
                _disabled={{
                  bg: "gray.300",
                  cursor: "not-allowed",
                  opacity: 0.4,
                }}
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
              _disabled={{
                bg: "gray.300",
                cursor: "not-allowed",
                opacity: 0.4,
              }}
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
              _disabled={{
                bg: "gray.300",
                cursor: "not-allowed",
                opacity: 0.4,
              }}
            >
              <CaretLineRight size={16} weight="fill" color="#0F766E" />
            </Button>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default AssetCards;
