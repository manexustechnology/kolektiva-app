export interface PropertyCardData {
  name: string;
  slug: string;
  location: string;
  img: string;
  price: string;
  isNew: boolean;
  isFeatured: boolean;
  isTraded: boolean;
}

export const propertyData: PropertyCardData[] = [
  {
    name: "Luxury Villa",
    slug: "luxury-villa",
    location: "Beverly Hills, CA",
    img: "/images/Property_Image.jpg",
    price: "82,500",
    isNew: true,
    isFeatured: true,
    isTraded: false,
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
  },
];
