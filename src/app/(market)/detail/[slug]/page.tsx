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
  const allowTrade = searchParams.sold ? true : false;

  return (
    <>
      <MarketDetailClientPage allowTrade={allowTrade} />
    </>
  );
};

export default MarketDetailPage;
