// Add this at the top of your file
"use client";

import MarketDetailClientPage from "../../components/market-detail/MarketDetailClientPage";
import { useParams } from "next/navigation"; // Use this for App Router
import { useEffect, useState } from "react";
import { PropertyData } from "@/types/property";

interface MarketDetailProps {
  searchParams: {
    sold: string;
  };
}

const MarketDetailPage: React.FC<MarketDetailProps> = ({ searchParams }) => {
  const { slug } = useParams(); // Use useParams to get route parameters
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const fetchPropertyData = async () => {
        try {
          const response = await fetch(`https://kolektiva-be.vercel.app/property/${slug}`);
          const data: PropertyData = await response.json();
          setPropertyData(data);
        } catch (error) {
          console.error('Error fetching property data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchPropertyData();
    }
  }, [slug]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
    {propertyData && <MarketDetailClientPage propertyData={propertyData} />}
    </>
  );
};

export default MarketDetailPage;
