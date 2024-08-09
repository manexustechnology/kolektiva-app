"use client";

import { interGlobalFont } from "@/commons/font";
import {
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { Divider } from "antd";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";

const MarketDetailFinancialPanel: React.FC = () => {
  // https://blog.nirdeshpokhrel.com.np/nextjs-window-is-not-defined-react-apexcharts
  const [ReactApexChart, setReactApexChart] = useState<any>();
  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setReactApexChart(() => mod.default);
    });
  }, []);

  const [tokensPurchasedSliderValue, setTokensPurchasedSliderValue] =
    useState<number>(2519);
  const [appreciationSliderValue, setAppreciationSliderValue] =
    useState<number>(46);
  const [cocReturnSliderValue, setCocReturnSliderValue] = useState<number>(18);

  const [cumChartSeries, setCumChartSeries] = useState<ApexOptions["series"]>([
    {
      name: "Cum. Net Cash Flow",
      data: Array.from({ length: 30 }, (_, i) => i + 4),
    },
    {
      name: "Cum. Appreciation",
      data: Array.from({ length: 30 }, (_, i) => i + 4),
    },
    {
      name: "Your Investment",
      data: Array.from({ length: 30 }, (_, i) => 10),
    },
  ]);
  const [cumChartOptions, setCumChartOptions] = useState<ApexOptions>({
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: false,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 2,
        borderRadiusApplication: "end", // 'around', 'end'
        borderRadiusWhenStacked: "last", // 'all', 'last'
      },
    },
    xaxis: {
      title: {
        text: "Year",
        style: {
          fontFamily: interGlobalFont.style.fontFamily,
          fontWeight: 500,
        },
      },
      categories: Array.from({ length: 30 }, (_, i) => (i + 1).toString()),
    },
    colors: ["#0D9488", "#F59E0B", "#65A30D"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "bottom",
      markers: {
        shape: "circle",
      },
    },
    fill: {
      opacity: 1,
    },
  });

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex gap-4 w-full">
          <div className="flex flex-col gap-3 w-full rounded-2xl shadow-md p-4">
            <div className="flex flex-col gap-1">
              <p className="text-base font-medium text-zinc-700">
                Total Investment Value
              </p>
              <p className="text-xl font-bold text-teal-600">389,772,113 USD</p>
            </div>
            <Divider className="border-zinc-200 !m-0" />
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <p className="text-sm text-zinc-500">Underlying asset price</p>
                <p className="text-sm font-medium text-zinc-700">
                  370,700,100 USD
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-zinc-500">Closing costs</p>
                <p className="text-sm font-medium text-zinc-700">500,000 USD</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-zinc-500">Upfront DAO LLC fees</p>
                <p className="text-sm font-medium text-zinc-700">60,000 USD</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-zinc-500">Operating reserve (2%)</p>
                <p className="text-sm font-medium text-zinc-700">
                  0 USD/ 4,000,000 USD
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-zinc-500">
                  Kolektiva AI listing fee (5%)
                </p>
                <p className="text-sm font-medium text-zinc-700">
                  5,000,000 USD
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full rounded-2xl shadow-md p-4">
            <div className="flex flex-col gap-1">
              <p className="text-base font-medium text-zinc-700">
                Projected Annual Return
              </p>
              <p className="text-xl font-bold text-teal-600">8.60%</p>
            </div>
            <Divider className="border-zinc-200 !m-0" />
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <p className="text-sm text-zinc-500">Projected Rental Yield</p>
                <p className="text-sm font-medium text-zinc-700">6.00%</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-zinc-500">Projected Appreciation</p>
                <p className="text-sm font-medium text-zinc-700">2.60%</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-zinc-500">Rental Yield</p>
                <p className="text-sm font-medium text-zinc-700">6.00%</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full rounded-2xl shadow-md p-4">
          <div className="flex flex-col gap-1">
            <p className="text-base font-medium text-zinc-700">
              Annual gross rents
            </p>
            <p className="text-xl font-bold text-teal-600">32,033,896 USD</p>
          </div>
          <Divider className="border-zinc-200 !m-0" />
          <div className="flex gap-4">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col">
                <p className="text-sm text-zinc-500">Property taxes</p>
                <p className="text-sm font-medium text-zinc-700">0 USD</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-zinc-500">Homeowners insurance</p>
                <p className="text-sm font-medium text-zinc-700">0 USD</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-zinc-500">Property management</p>
                <p className="text-sm font-medium text-zinc-700">
                  12,000,000 USD
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-zinc-500">
                  Annual DAO LLC administration and filing fees
                </p>
                <p className="text-sm font-medium text-zinc-700">
                  5,000,000 USD
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col">
                <p className="text-sm text-zinc-500">Annual cash flow</p>
                <p className="text-sm font-medium text-zinc-700">
                  149,380,200 USD
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-zinc-500">Monthly cash flow</p>
                <p className="text-sm font-medium text-zinc-700">
                  12,448,332 USD
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-zinc-500">
                  Projected Annual Cash Flow
                </p>
                <p className="text-sm font-medium text-zinc-700">149,379,200</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full rounded-2xl shadow-md p-4">
          <p className="text-base font-medium text-zinc-700">
            Projected returns per token
          </p>
          <Divider className="border-zinc-200 !m-0" />
          <div className="flex flex-col gap-12">
            <div className="flex gap-4">
              <p className="text-sm text-zinc-500">Tokens purchased</p>
              <p className="text-sm font-medium text-teal-600">
                2519 / 9.200,00 USD
              </p>
            </div>
            <div className="flex gap-3 justify-between items-center">
              <p className="text-xs text-zinc-500 w-full max-w-4">1</p>
              <Slider
                aria-label="slider-ex-6"
                min={1}
                max={7464}
                defaultValue={tokensPurchasedSliderValue}
                onChange={(val) => setTokensPurchasedSliderValue(val)}
              >
                <SliderMark
                  value={tokensPurchasedSliderValue}
                  textAlign="center"
                  bg="white"
                  color="black"
                  shadow="md"
                  rounded="lg"
                  fontSize="xs"
                  fontWeight="bold"
                  py={1}
                  px={2}
                  transform="translate(-50%, -45px)"
                >
                  {tokensPurchasedSliderValue}
                </SliderMark>
                <SliderTrack h={3} rounded="full">
                  <SliderFilledTrack bgColor="teal.600" />
                </SliderTrack>
                <SliderThumb h={5} w={5} bgColor="teal.500" />
              </Slider>
              <p className="text-xs text-zinc-500 w-full max-w-10">7464</p>
            </div>
          </div>
          <Divider className="border-zinc-200 !m-0" />
          <div className="flex flex-col gap-12">
            <div className="flex gap-4">
              <p className="text-sm text-zinc-500">Appreciation</p>
            </div>
            <div className="flex gap-3 justify-between items-center">
              <p className="text-xs text-zinc-500 w-full max-w-4">1%</p>
              <Slider
                aria-label="slider-ex-6"
                min={1}
                max={100}
                defaultValue={appreciationSliderValue}
                onChange={(val) => setAppreciationSliderValue(val)}
              >
                <SliderMark
                  value={appreciationSliderValue}
                  textAlign="center"
                  bg="white"
                  color="black"
                  shadow="md"
                  rounded="lg"
                  fontSize="xs"
                  fontWeight="bold"
                  py={1}
                  px={2}
                  transform="translate(-50%, -45px)"
                >
                  {appreciationSliderValue}
                </SliderMark>
                <SliderTrack h={3} rounded="full">
                  <SliderFilledTrack bgColor="teal.600" />
                </SliderTrack>
                <SliderThumb h={5} w={5} bgColor="teal.500" />
              </Slider>
              <p className="text-xs text-zinc-500 w-full max-w-10">100%</p>
            </div>
          </div>
          <Divider className="border-zinc-200 !m-0" />
          <div className="flex flex-col gap-12">
            <div className="flex gap-4">
              <p className="text-sm text-zinc-500">Cash on Cash Return</p>
            </div>
            <div className="flex gap-3 justify-between items-center">
              <p className="text-xs text-zinc-500 w-full max-w-4">1%</p>
              <Slider
                aria-label="slider-ex-6"
                min={1}
                max={100}
                defaultValue={cocReturnSliderValue}
                onChange={(val) => setCocReturnSliderValue(val)}
              >
                <SliderMark
                  value={cocReturnSliderValue}
                  textAlign="center"
                  bg="white"
                  color="black"
                  shadow="md"
                  rounded="lg"
                  fontSize="xs"
                  fontWeight="bold"
                  py={1}
                  px={2}
                  transform="translate(-50%, -45px)"
                >
                  {cocReturnSliderValue}
                </SliderMark>
                <SliderTrack h={3} rounded="full">
                  <SliderFilledTrack bgColor="teal.600" />
                </SliderTrack>
                <SliderThumb h={5} w={5} bgColor="teal.500" />
              </Slider>
              <p className="text-xs text-zinc-500 w-full max-w-10">100%</p>
            </div>
          </div>
        </div>
        <div className="w-full rounded-2xl shadow-md p-4">
          <div id="chart">
            {ReactApexChart && (
              <ReactApexChart
                options={cumChartOptions}
                series={cumChartSeries}
                type="bar"
                height={350}
              />
            )}
          </div>
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
                        className="py-3 text-center font-normal text-sm"
                      ></th>
                      <th
                        scope="col"
                        className="py-3 text-center font-normal text-sm"
                      >
                        Year 5
                      </th>
                      <th
                        scope="col"
                        className="py-3 text-center font-normal text-sm"
                      >
                        Year 10
                      </th>
                      <th
                        scope="col"
                        className="py-3 text-center font-normal text-sm"
                      >
                        Year 20
                      </th>
                      <th
                        scope="col"
                        className="py-3 text-center font-normal text-sm"
                      >
                        Year 30
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4 text-sm font-normal">
                        Cumulative Net Cash Flow
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">
                        9.200,00 USD
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">
                        9.200,00 USD
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">
                        9.200,00 USD
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">
                        9.200,00 USD
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm font-normal">
                        Cumulative Appreciation Gain
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">
                        9.200,00 USD
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">
                        9.200,00 USD
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">
                        9.200,00 USD
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">
                        9.200,00 USD
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm font-normal">
                        Shining Star
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">
                        9.200,00 USD
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">
                        9.200,00 USD
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">
                        9.200,00 USD
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">
                        9.200,00 USD
                      </td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-teal-50 text-teal-600">
                    <tr>
                      <td className="py-3 px-4 text-sm font-normal">
                        Shining Star
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">
                        9.200,00 USD
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">
                        9.200,00 USD
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">
                        9.200,00 USD
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">
                        9.200,00 USD
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketDetailFinancialPanel;
