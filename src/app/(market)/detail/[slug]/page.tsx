// Add this at the top of your file
"use client";

import MarketDetailClientPage from "../../components/market-detail/MarketDetailClientPage";
import { useParams } from "next/navigation"; // Use this for App Router
import { useEffect, useState } from "react";
import { PropertyData } from "@/types/property";
import { Spinner, Stack } from "@chakra-ui/react";
import { useActiveWalletChain } from "thirdweb/react";

interface MarketDetailProps {
  searchParams: {
    sold: string;
  };
}

const MarketDetailPage: React.FC<MarketDetailProps> = ({ searchParams }) => {
  const { slug } = useParams(); // Use useParams to get route parameters
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null);
  const [loading, setLoading] = useState(true);
  const chain = useActiveWalletChain()!;

  useEffect(() => {
    if (slug) {
      const fetchPropertyData = async () => {
        try {
          const response = await fetch(
            `https://kolektiva-be.vercel.app/property/${slug}`
          );
          const data: PropertyData = await response.json();
          setPropertyData(data);
        } catch (error) {
          console.error("Error fetching property data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchPropertyData();
    }
  }, [slug]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Stack direction="row" spacing={5}>
          <Spinner size="xl" color="teal.500" thickness="4px" speed="0.65s" />
        </Stack>
      </div>
    );

  return (
    <>
      {propertyData && <MarketDetailClientPage propertyData={propertyData} />}
    </>
  );
};

export default MarketDetailPage;
