export function formatUSDTBalance(rawBalance: number | string): string {
  const balanceInUSDT = Number(rawBalance) / 10 ** 6; // Convert to proper USDT value
  return balanceInUSDT.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
}

export function parseUSDTBalance(formattedBalance: number | string): number {
  let numericValue: number;

  // Check if the input is a number or a string
  if (typeof formattedBalance === "number") {
    numericValue = formattedBalance;
  } else {
    // Remove any non-numeric characters except for the decimal point
    const cleanedString = formattedBalance.replace(/[^0-9.]/g, "");

    // Convert to number, handling any potential edge cases like multiple dots
    numericValue = parseFloat(cleanedString);

    // If parseFloat returns NaN, fall back to 0
    if (isNaN(numericValue)) {
      numericValue = 0;
    }
  }

  // Convert to raw balance by multiplying with 10^6 (assuming USDT with 6 decimals)
  const rawBalance = Math.round(numericValue * 10 ** 6);

  return rawBalance;
}
