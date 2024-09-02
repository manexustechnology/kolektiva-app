import { useReadContractHook } from "@/utils/hooks";
import { useState, useEffect } from "react";

interface Order {
  amount: number;
  price: number;
}

interface SellOrderEventProps {
  contractAddress: string;
  index: number;
}

export const SellOrderEvent: React.FC<SellOrderEventProps> = ({
  contractAddress,
  index,
}) => {
  const [sellOrder, setSellOrder] = useState<Order>();

  const { data: sellOrderByIndex } = useReadContractHook({
    contractName: "KolektivaMarket",
    functionName: "getSellOrderByIndex",
    contractAddress,
    args: [index], // pass the index as an argument
  });

  useEffect(() => {
    if (sellOrderByIndex) {
      console.log("sellOrderByIndex", sellOrderByIndex);

      const { amount, price } = sellOrderByIndex;
      setSellOrder({
        price: Number(price),
        amount: Number(amount),
      });
    }
  }, [index, sellOrderByIndex]);
  return (
    <div>
      {/* Your component JSX here */}
      {sellOrder && (
        <div key={index}>
          Amount: {sellOrder.amount}, Price: {sellOrder.price}
        </div>
      )}
    </div>
  );
};
