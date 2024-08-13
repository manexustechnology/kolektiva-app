import { useReadContractHook } from "@/utils/hooks";
import { useState, useEffect } from "react";

interface Order {
  amount: number;
  price: number;
}

interface BuyOrderEventProps {
  contractAddress: string;
  index: number;
}

export const BuyOrderEvent: React.FC<BuyOrderEventProps> = ({
  contractAddress,
  index,
}) => {
  const [buyOrder, setBuyOrder] = useState<Order>();

  const { data: buyOrderByIndex } = useReadContractHook({
    contractName: "KolektivaMarket",
    functionName: "getBuyOrderByIndex",
    contractAddress, // market contract address
    args: [index], // pass the index as an argument
  });

  useEffect(() => {
    if (buyOrderByIndex) {
      const { amount, price } = buyOrderByIndex;
      setBuyOrder({
        price: Number(price),
        amount: Number(amount),
      });
    }
  }, [buyOrderByIndex]);
  return (
    <div>
      {/* Your component JSX here */}
      {buyOrder && (
        <div key={index}>
          Amount: {buyOrder.amount}, Price: {buyOrder.price}
        </div>
      )}
    </div>
  );
};
