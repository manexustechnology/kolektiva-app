"use client";

import { useContractEventHook, useReadContractHook } from "@/utils/hooks";
import { getOrderbookWidthStyle } from "@/utils/style";
import { ListBullets } from "@phosphor-icons/react/dist/ssr";
import { Divider } from "antd";
import { useEffect, useState } from "react";
// import { BuyOrderEvent } from "./MarketBuyOrderEvent";
// import { SellOrderEvent } from "./MarketSellOrderEvent";
import { readContractFetch } from "@/utils/fetch";
import { PropertyData } from "@/types/property";
import { formatUSDTBalance } from "@/utils/formatter";

interface MarketDetailOrderbookPanelProps {
  propertyData: PropertyData;
  allowTrade?: boolean;
}

interface Order {
  amount: number;
  price: number;
}

// Contract address should be dynamic, fetched from backend

const MarketDetailOrderbookPanel: React.FC<MarketDetailOrderbookPanelProps> = ({
  propertyData,
  allowTrade = false,
}) => {
  const [buyOrders, setBuyOrders] = useState<Order[]>([]);
  const [loadingBuy, setLoadingBuy] = useState<boolean>(true);
  const [buyOrdersCount, setBuyOrdersCount] = useState<number | null>(null);

  const [sellOrders, setSellOrders] = useState<Order[]>([]);
  const [loadingSell, setLoadingSell] = useState<boolean>(true);
  const [sellOrdersCount, setSellOrdersCount] = useState<number | null>(null);

  const { data: InitialOfferingPurchaseEvent } = useContractEventHook({
    contractName: "KolektivaMarket",
    eventName: "InitialOfferingPurchase",
    contractAddress: propertyData.marketAddress,
    fromBlock: BigInt(8906493),
  });

  const { data: OrderFulfilledEvent } = useContractEventHook({
    contractName: "KolektivaMarket",
    eventName: "OrderFulfilled",
    contractAddress: propertyData.marketAddress,
    fromBlock: BigInt(8906493),
  });

  const { data: sellOrdersCountData } = useReadContractHook({
    contractName: "KolektivaMarket",
    functionName: "getSellOrdersCount",
    contractAddress: propertyData.marketAddress,
    args: [],
  });

  const { data: buyOrdersCountData } = useReadContractHook({
    contractName: "KolektivaMarket",
    functionName: "getBuyOrdersCount",
    contractAddress: propertyData.marketAddress,
    args: [],
  });

  useEffect(() => {
    if (buyOrdersCountData) {
      setBuyOrdersCount(Number(buyOrdersCountData));
    }
  }, [buyOrdersCountData]);

  useEffect(() => {
    if (sellOrdersCountData) {
      setSellOrdersCount(Number(sellOrdersCountData));
    }
  }, [sellOrdersCountData]);

  // Fetch buy orders based on count and index
  useEffect(() => {
    const fetchBuyOrders = async () => {
      if (buyOrdersCount === null) {
        setLoadingBuy(false);
        return;
      }

      const orders: { amount: number; price: number }[] = [];

      for (let i = 0; i < buyOrdersCount; i++) {
        const orderData = await readContractFetch({
          contractName: "KolektivaMarket",
          functionName: "getBuyOrderByIndex",
          contractAddress: propertyData.marketAddress,
          args: [i],
        });

        console.log("from fetch buy", orderData);
        if (orderData) {
          let { amount, price } = orderData as any;
          amount = Number(amount);
          price = Number(price);

          const existingOrder = orders.find((o) => o.price === price);
          if (existingOrder) {
            existingOrder.amount += amount;
          } else {
            orders.push({ amount, price });
          }
        }
      }
      setLoadingBuy(false);
      setBuyOrders(orders);
    };

    fetchBuyOrders();
  }, [buyOrdersCount]);

  useEffect(() => {
    const fetchSellOrders = async () => {
      if (sellOrdersCount === null) {
        setLoadingSell(false);
        return;
      }

      const orders: { amount: number; price: number }[] = [];

      for (let i = 0; i < sellOrdersCount; i++) {
        const orderData = await readContractFetch({
          contractName: "KolektivaMarket",
          functionName: "getSellOrderByIndex",
          contractAddress: propertyData.marketAddress,
          args: [i],
        });

        console.log("from fetch sell", orderData);
        if (orderData) {
          let { amount, price } = orderData as any;
          amount = Number(amount);
          price = Number(price);
          const existingOrder = orders.find((o) => o.price === price);
          if (existingOrder) {
            existingOrder.amount += amount;
          } else {
            orders.push({ amount, price });
          }
        }
      }
      setLoadingSell(false);
      setSellOrders(orders);
    };

    fetchSellOrders();
  }, [sellOrdersCount]);

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 w-full">
            <div className="flex flex-col gap-2 w-full rounded-2xl shadow-md p-4">
              <p className="text-base font-medium text-zinc-700">Last trade</p>
              <p className="text-xl font-bold text-teal-600">600,000 USDT</p>
              <p className="text-sm font-normal text-zinc-500">
                Last traded value
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full rounded-2xl shadow-md p-4">
              <p className="text-base font-medium text-zinc-700">
                Estimated value
              </p>
              <p className="text-xl font-bold text-teal-600">600,000 USDT</p>
              <p className="text-sm font-normal text-zinc-500">
                Market price analysis
              </p>
            </div>
          </div>
          <div className="flex gap-4 w-full">
            <div className="flex flex-col gap-2 w-full rounded-2xl shadow-md p-4">
              <p className="text-base font-medium text-zinc-700">
                Trade volume
              </p>
              <p className="text-xl font-bold text-teal-600">89,772,113 USDT</p>
              <p className="text-sm font-normal text-zinc-500">Last 4 weeks</p>
            </div>
            <div className="flex flex-col gap-2 w-full rounded-2xl shadow-md p-4">
              <p className="text-base font-medium text-zinc-700">Market cap</p>
              <p className="text-xl font-bold text-teal-600">
                389,772,113 USDT
              </p>
              <p className="text-sm font-normal text-zinc-500">49,760 tokens</p>
            </div>
          </div>
        </div>
        <Divider className="border-zinc-200 !m-0" />
        <div className="flex flex-col gap-2">
          <p className="text-base font-medium text-zinc-700">Open orders</p>
          {allowTrade &&
          (buyOrdersCount || 0 > 0 || sellOrdersCount || 0 > 0) ? (
            <div className="flex gap-4">
              <div className="flex flex-col w-full">
                <div className="-m-1.5 overflow-x-auto">
                  <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="border rounded-2xl shadow-md overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-zinc-100">
                          <tr>
                            <th
                              scope="col"
                              className="py-3 px-4 text-left font-normal text-sm"
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              className="py-3 px-4 text-left font-normal text-sm"
                            >
                              Buy Order
                            </th>
                          </tr>
                        </thead>
                        {buyOrders.length > 0 && (
                          <tbody className="divide-y divide-gray-200">
                            {buyOrders.map((order, index) => (
                              <tr className="relative" key={index}>
                                <td
                                  width="50%"
                                  className="py-3 px-4 text-sm font-normal relative z-10"
                                >
                                  {formatUSDTBalance(order.price)} USDT
                                </td>
                                <td
                                  width="50%"
                                  className="py-3 px-4 text-sm font-medium"
                                >
                                  <div
                                    style={getOrderbookWidthStyle(1, 4)}
                                  ></div>
                                  <span className="relative z-10">
                                    {order.amount} Token
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        )}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full">
                <div className="-m-1.5 overflow-x-auto">
                  <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="border rounded-2xl shadow-md overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-zinc-100">
                          <tr>
                            <th
                              scope="col"
                              className="py-3 px-4 text-left font-normal text-sm"
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              className="py-3 px-4 text-left font-normal text-sm"
                            >
                              Sell Order
                            </th>
                          </tr>
                        </thead>
                        {sellOrders.length > 0 && (
                          <tbody className="divide-y divide-gray-200">
                            {sellOrders.map((order, index) => (
                              <tr className="relative" key={index}>
                                <td
                                  width="50%"
                                  className="py-3 px-4 text-sm font-normal relative z-10"
                                >
                                  {formatUSDTBalance(order.price)} USDT
                                </td>
                                <td
                                  width="50%"
                                  className="py-3 px-4 text-sm font-medium"
                                >
                                  <div
                                    style={getOrderbookWidthStyle(1, 4)}
                                  ></div>
                                  <span className="relative z-10">
                                    {order.amount} Token
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        )}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="rounded-full p-3 bg-zinc-100">
                <ListBullets
                  weight="fill"
                  size={32}
                  className="text-zinc-400"
                />
              </div>
              <p className="text-sm font-normal text-zinc-500">
                No open orders
              </p>
            </div>
          )}
        </div>
        <Divider className="border-zinc-200 !m-0" />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <p className="text-base font-medium text-zinc-700">
              Recently filled orders
            </p>
            <p className="text-sm font-normal text-zinc-500">
              Only showing 10 most recent orders
            </p>
          </div>
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="border rounded-2xl shadow-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-zinc-100">
                      <tr>
                        <th
                          scope="col"
                          className="py-3 px-4 text-left font-normal text-sm"
                        >
                          Filled
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-4 text-left font-normal text-sm"
                        >
                          Size
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-4 text-left font-normal text-sm"
                        >
                          Transacted Price
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-4 text-left font-normal text-sm"
                        >
                          Type
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-3 px-4 text-sm font-normal">
                          25 July 2024
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">
                          1 Token
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">
                          600,000 USDT
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">Buy</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm font-normal">
                          25 July 2024
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">
                          1 Token
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">
                          600,000 USDT
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">Buy</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm font-normal">
                          25 July 2024
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">
                          2 Token
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">
                          1,200,000 USDT
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">Buy</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm font-normal">
                          25 July 2024
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">
                          1 Token
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">
                          600,000 USDT
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">Buy</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm font-normal">
                          25 July 2024
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">
                          1 Token
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">
                          600,000 USDT
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">Buy</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm font-normal">
                          25 July 2024
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">
                          3 Token
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">
                          1,800,000 USDT
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">Buy</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm font-normal">
                          25 July 2024
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">
                          1 Token
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">
                          600,000 USDT
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">Buy</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm font-normal">
                          25 July 2024
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">
                          4 Token
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">
                          2,400,000 USDT
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">Buy</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm font-normal">
                          25 July 2024
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">
                          1 Token
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">
                          600,000 USDT
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">Buy</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm font-normal">
                          25 July 2024
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">
                          1 Token
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">
                          600,000 USDT
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">Buy</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketDetailOrderbookPanel;
