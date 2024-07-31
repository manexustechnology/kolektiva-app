export const renderWalletAddress = (address?: string | null): string => {
  if (address) {
    return `${address.substring(0, 4)}...${address.substring(
      address.length - 3,
      address.length
    )}`;
  }
  return "";
};
