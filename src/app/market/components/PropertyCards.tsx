"use client";

import { Box, Grid } from "@chakra-ui/react";
import PropertyCard from "./PropertyCard";

interface PropertyCardData {
  name: string;
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
      price: "82,500",
      isNew: true,
      isFeatured: true,
    },
    {
      name: "Modern Apartment",
      location: "New York, NY",
      img: "/images/Property_Image.jpg",
      price: "26,000",
      isNew: false,
      isFeatured: true,
    },
    {
      name: "The Den",
      location: "Los Angeles, LA",
      img: "/images/Property_Image.jpg",
      price: "9500",
      isNew: true,
      isFeatured: false,
    },
    {
      name: "Modern Apartment3",
      location: "New York, NY",
      img: "/images/Property_Image.jpg",
      price: "15,000",
      isNew: false,
      isFeatured: false,
    },
    {
      name: "Cozy Cottage",
      location: "Aspen, CO",
      img: "/images/Property_Image.jpg",
      price: "69,200",
      isNew: true,
      isFeatured: true,
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
            isNew={card.isNew}
            isFeatured={card.isFeatured}
            onButtonClick={() => handleButtonClick(card.name)} // Handle button click
          />
        ))}
      </Grid>
    </Box>
  );
};

export default PropertyCards;
