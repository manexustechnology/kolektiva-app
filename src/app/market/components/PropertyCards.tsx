"use client";

import { Box, Grid } from "@chakra-ui/react";
import PropertyCard from "./PropertyCard";

interface PropertyCardData {
  name: string;
  location: string;
  img: string;
  price: string;
}

interface PropertyCardsProps {
  cards?: PropertyCardData[];
}

const PropertyCards: React.FC<PropertyCardsProps> = ({ cards }) => {
  // Handle button click action
  const handleButtonClick = (name: string) => {
    alert(`Do you want to see details of ${name}?`);
  };

  // Test data
  const cardData: PropertyCardData[] = [
    {
      name: "Luxury Villa",
      location: "Beverly Hills, CA",
      img: "/images/Property_Image.jpg",
      price: "$1,500,000",
    },
    {
      name: "Modern Apartment",
      location: "New York, NY",
      img: "/images/Property_Image.jpg",
      price: "$850,000",
    },
    {
      name: "Modern Apartment2",
      location: "New York, NY",
      img: "/images/Property_Image.jpg",
      price: "$850,000",
    },
    {
      name: "Modern Apartment3",
      location: "New York, NY",
      img: "/images/Property_Image.jpg",
      price: "$850,000",
    },
    {
      name: "Cozy Cottage",
      location: "Aspen, CO",
      img: "/images/Property_Image.jpg",
      price: "$600,000",
    },
  ];

  // Use provided cards if available, otherwise use test data
  const cardsToDisplay = cards || cardData;

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
        {cardsToDisplay.map((card, index) => (
          <PropertyCard
            key={index}
            name={card.name}
            location={card.location}
            img={card.img}
            price={card.price}
            onButtonClick={() => handleButtonClick(card.name)} // Handle button click
          />
        ))}
      </Grid>
    </Box>
  );
};

export default PropertyCards;
