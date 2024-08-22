export function formatUSDTBalance(rawBalance: number | string): string {
  const balanceInUSDT = Number(rawBalance) / 10 ** 6; // Convert to proper USDT value
  return balanceInUSDT.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
}
