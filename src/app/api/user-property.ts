import axios from "axios";

interface CreateUserProperty {
  walletAddress: string;
  propertyId: string;
}

interface GetUserProperties {
  walletAddress: string;
  filters: any;
}

export const createUserProperty = async (
  createUserProperty: CreateUserProperty
) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_HOST}/user-property`,
    createUserProperty
  );
};

export const getUserProperties = async (
  getUserProperties: GetUserProperties
) => {
  const { walletAddress, filters } = getUserProperties;
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_HOST
    }/user-property/${walletAddress}?${new URLSearchParams(
      filters as any
    ).toString()}`
  );

  const data = await response.json();

  return data.map((property: any) => ({
    name: property.address,
    propertyId: property.id,
    location: `${property.city}, ${property.state}, ${property.country}`,
    img:
      property.images?.[0]?.image ||
      "https://messagetech.com/wp-content/themes/ml_mti/images/no-image.jpg",
    price: property.price || "-",
    marketAddress: property.marketAddress,
    tokenAddress: property.tokenAddress,
    isAftermarket: property.isAftermarket,
  }));
};
