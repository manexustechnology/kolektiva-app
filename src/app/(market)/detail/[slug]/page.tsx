import { Metadata } from "next";
import MarketDetailClientPage from "../../components/market-detail/MarketDetailClientPage";

interface MarketDetailProps {
  searchParams: {
    sold: string;
  };
}

export const metadata: Metadata = {
  title: "Kolektiva",
  description: "Fractional Property",
};

const MarketDetailPage: React.FC<MarketDetailProps> = ({ searchParams }) => {
  const isSold = searchParams.sold ? true : false;

  return (
    <>
      <MarketDetailClientPage isSold={isSold} />
    </>
  );
};

export default MarketDetailPage;
