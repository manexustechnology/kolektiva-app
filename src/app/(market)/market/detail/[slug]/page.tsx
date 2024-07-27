'use client';

import MarketDetailClientPage from "@/app/(market)/components/market-detail/MarketDetailClientPage";
import { useSearchParams } from "next/navigation";

interface MarketDetailProps {
  searchParams: {
    sold: string;
  }
}

const MarketDetailPage: React.FC<MarketDetailProps> = ({ searchParams }) => {
  const isSold = searchParams.sold ? true : false;

  return (
    <>
      <MarketDetailClientPage isSold={isSold} />
    </>
  )
}

export default MarketDetailPage;