"use client";

import { getOrderbookWidthStyle } from "@/utils/style";
import { ListBullets } from "@phosphor-icons/react/dist/ssr";
import { Divider } from "antd";

interface MarketDetailOrderbookPanelProps {
  isSold?: boolean;
}

const MarketDetailOrderbookPanel: React.FC<MarketDetailOrderbookPanelProps> = ({
  isSold = false,
}) => {
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 w-full">
            <div className="flex flex-col gap-2 w-full rounded-2xl shadow-md p-4">
              <p className="text-base font-medium text-zinc-700">Last trade</p>
              <p className="text-xl font-bold text-teal-600">600,000 LSK</p>
              <p className="text-sm font-normal text-zinc-500">
                Last traded value
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full rounded-2xl shadow-md p-4">
              <p className="text-base font-medium text-zinc-700">
                Estimated value
              </p>
              <p className="text-xl font-bold text-teal-600">600,000 LSK</p>
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
              <p className="text-xl font-bold text-teal-600">89,772,113 LSK</p>
              <p className="text-sm font-normal text-zinc-500">Last 4 weeks</p>
            </div>
            <div className="flex flex-col gap-2 w-full rounded-2xl shadow-md p-4">
              <p className="text-base font-medium text-zinc-700">Market cap</p>
              <p className="text-xl font-bold text-teal-600">389,772,113 LSK</p>
              <p className="text-sm font-normal text-zinc-500">49,760 tokens</p>
            </div>
          </div>
        </div>
        <Divider className="border-zinc-200 !m-0" />
        <div className="flex flex-col gap-2">
          <p className="text-base font-medium text-zinc-700">Open orders</p>
          {isSold ? (
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
                        <tbody className="divide-y divide-gray-200">
                          <tr className="relative">
                            <td
                              width="50%"
                              className="py-3 px-4 text-sm font-normal relative z-10"
                            >
                              $52.00
                            </td>
                            <td
                              width="50%"
                              className="py-3 px-4 text-sm font-medium"
                            >
                              <div style={getOrderbookWidthStyle(1, 4)}></div>
                              <span className="relative z-10">1 Token</span>
                            </td>
                          </tr>
                          <tr className="relative">
                            <td
                              width="50%"
                              className="py-3 px-4 text-sm font-normal relative z-10"
                            >
                              $52.00
                            </td>
                            <td
                              width="50%"
                              className="py-3 px-4 text-sm font-medium"
                            >
                              <div style={getOrderbookWidthStyle(2, 4)}></div>
                              <span className="relative z-10">2 Token</span>
                            </td>
                          </tr>
                          <tr className="relative">
                            <td
                              width="50%"
                              className="py-3 px-4 text-sm font-normal relative z-10"
                            >
                              $52.00
                            </td>
                            <td
                              width="50%"
                              className="py-3 px-4 text-sm font-medium"
                            >
                              <div style={getOrderbookWidthStyle(3, 4)}></div>
                              <span className="relative z-10">3 Token</span>
                            </td>
                          </tr>
                          <tr className="relative">
                            <td
                              width="50%"
                              className="py-3 px-4 text-sm font-normal relative z-10"
                            >
                              $52.00
                            </td>
                            <td
                              width="50%"
                              className="py-3 px-4 text-sm font-medium"
                            >
                              <div style={getOrderbookWidthStyle(4, 4)}></div>
                              <span className="relative z-10">4 Token</span>
                            </td>
                          </tr>
                        </tbody>
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
                        <tbody className="divide-y divide-gray-200">
                          <tr className="relative">
                            <td
                              width="50%"
                              className="py-3 px-4 text-sm font-normal relative z-10"
                            >
                              $52.00
                            </td>
                            <td
                              width="50%"
                              className="py-3 px-4 text-sm font-medium"
                            >
                              <div style={getOrderbookWidthStyle(1, 4)}></div>
                              <span className="relative z-10">1 Token</span>
                            </td>
                          </tr>
                          <tr className="relative">
                            <td
                              width="50%"
                              className="py-3 px-4 text-sm font-normal relative z-10"
                            >
                              $52.00
                            </td>
                            <td
                              width="50%"
                              className="py-3 px-4 text-sm font-medium"
                            >
                              <div style={getOrderbookWidthStyle(2, 4)}></div>
                              <span className="relative z-10">2 Token</span>
                            </td>
                          </tr>
                          <tr className="relative">
                            <td
                              width="50%"
                              className="py-3 px-4 text-sm font-normal relative z-10"
                            >
                              $52.00
                            </td>
                            <td
                              width="50%"
                              className="py-3 px-4 text-sm font-medium"
                            >
                              <div style={getOrderbookWidthStyle(3, 4)}></div>
                              <span className="relative z-10">3 Token</span>
                            </td>
                          </tr>
                          <tr className="relative">
                            <td
                              width="50%"
                              className="py-3 px-4 text-sm font-normal relative z-10"
                            >
                              $52.00
                            </td>
                            <td
                              width="50%"
                              className="py-3 px-4 text-sm font-medium"
                            >
                              <div style={getOrderbookWidthStyle(4, 4)}></div>
                              <span className="relative z-10">4 Token</span>
                            </td>
                          </tr>
                        </tbody>
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
                          600,000 LSK
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
                          600,000 LSK
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
                          1,200,000 LSK
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
                          600,000 LSK
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
                          600,000 LSK
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
                          1,800,000 LSK
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
                          600,000 LSK
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
                          2,400,000 LSK
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
                          600,000 LSK
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
                          600,000 LSK
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
