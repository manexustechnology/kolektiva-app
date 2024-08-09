"use client";

import {
  Box,
  Button,
  Progress,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { House, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { Divider } from "antd";
import MarketDetailPhotos from "./MarketDetailPhotos";
import MarketDetailDescriptionPanel from "./panel/MarketDetailDescriptionPanel";
import MarketDetailFinancialPanel from "./panel/MarketDetailFinancialPanel";
import MarketDetailOrderbookPanel from "./panel/MarketDetailOrderbookPanel";
import MarketDetailDocumentPanel from "./panel/MarketDetailDocumentPanel";
import MarketDetailMarketPanel from "./panel/MarketDetailMarketPanel";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import PlaceBuyOrderModal from "./modals/PlaceBuyOrderModal";
import PlaceSellOrderModal from "./modals/PlaceSellOrderModal";
import { AfterMarketBuyOrderData, SellOrderData, BuyOrderData } from "@/types/order";
import InitialOfferingBuySuccessModal from "./modals/InitialOfferingBuySuccessModal";
import LimitBuySuccessModal from "./modals/LimitBuySuccessModal";
import LimitSellSuccessModal from "./modals/LimitSellSuccessModal";
import MarketBuySuccessModal from "./modals/MarketBuySuccessModal";
import MarketSellSuccessModal from "./modals/MarketSellSuccessModal";
import { useActiveAccount } from "thirdweb/react";
import { cn } from "@/utils/cn";

interface MarketDetailClientPageProps {
  allowTrade: boolean;
}

const MarketDetailClientPage: React.FC<MarketDetailClientPageProps> = ({
  allowTrade,
}) => {
  const account = useActiveAccount();

  // https://blog.nirdeshpokhrel.com.np/nextjs-window-is-not-defined-react-apexcharts
  const [ReactApexChart, setReactApexChart] = useState<any>();
  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setReactApexChart(() => mod.default);
    });
  }, []);

  const [pricePerTokenChartSeries, setPricePerTokenChartSeries] = useState<
    ApexOptions["series"]
  >([
    {
      data: [
        [1327359600000, 30.95],
        [1327446000000, 31.34],
        [1327532400000, 31.18],
        [1327618800000, 31.05],
        [1327878000000, 31.0],
        [1327964400000, 30.95],
        [1328050800000, 31.24],
        [1328137200000, 31.29],
        [1328223600000, 31.85],
        [1328482800000, 31.86],
        [1328569200000, 32.28],
        [1328655600000, 32.1],
        [1328742000000, 32.65],
        [1328828400000, 32.21],
        [1329087600000, 32.35],
        [1329174000000, 32.44],
        [1329260400000, 32.46],
        [1329346800000, 32.86],
        [1329433200000, 32.75],
        [1329778800000, 32.54],
        [1329865200000, 32.33],
        [1329951600000, 32.97],
        [1330038000000, 33.41],
        [1330297200000, 33.27],
        [1330383600000, 33.27],
        [1330470000000, 32.89],
        [1330556400000, 33.1],
        [1330642800000, 33.73],
        [1330902000000, 33.22],
        [1330988400000, 31.99],
        [1331074800000, 32.41],
        [1331161200000, 33.05],
        [1331247600000, 33.64],
        [1331506800000, 33.56],
        [1331593200000, 34.22],
        [1331679600000, 33.77],
        [1331766000000, 34.17],
        [1331852400000, 33.82],
        [1332111600000, 34.51],
        [1332198000000, 33.16],
        [1332284400000, 33.56],
        [1332370800000, 33.71],
        [1332457200000, 33.81],
        [1332712800000, 34.4],
        [1332799200000, 34.63],
        [1332885600000, 34.46],
        [1332972000000, 34.48],
        [1333058400000, 34.31],
        [1333317600000, 34.7],
        [1333404000000, 34.31],
        [1333490400000, 33.46],
        [1333576800000, 33.59],
        [1333922400000, 33.22],
        [1334008800000, 32.61],
        [1334095200000, 33.01],
        [1334181600000, 33.55],
        [1334268000000, 33.18],
        [1334527200000, 32.84],
        [1334613600000, 33.84],
        [1334700000000, 33.39],
        [1334786400000, 32.91],
        [1334872800000, 33.06],
        [1335132000000, 32.62],
        [1335218400000, 32.4],
        [1335304800000, 33.13],
        [1335391200000, 33.26],
        [1335477600000, 33.58],
        [1335736800000, 33.55],
        [1335823200000, 33.77],
        [1335909600000, 33.76],
        [1335996000000, 33.32],
        [1336082400000, 32.61],
        [1336341600000, 32.52],
        [1336428000000, 32.67],
        [1336514400000, 32.52],
        [1336600800000, 31.92],
        [1336687200000, 32.2],
        [1336946400000, 32.23],
        [1337032800000, 32.33],
        [1337119200000, 32.36],
        [1337205600000, 32.01],
        [1337292000000, 31.31],
        [1337551200000, 32.01],
        [1337637600000, 32.01],
        [1337724000000, 32.18],
        [1337810400000, 31.54],
        [1337896800000, 31.6],
        [1338242400000, 32.05],
        [1338328800000, 31.29],
        [1338415200000, 31.05],
        [1338501600000, 29.82],
        [1338760800000, 30.31],
        [1338847200000, 30.7],
        [1338933600000, 31.69],
        [1339020000000, 31.32],
        [1339106400000, 31.65],
        [1339365600000, 31.13],
        [1339452000000, 31.77],
        [1339538400000, 31.79],
        [1339624800000, 31.67],
        [1339711200000, 32.39],
        [1339970400000, 32.63],
        [1340056800000, 32.89],
        [1340143200000, 31.99],
        [1340229600000, 31.23],
        [1340316000000, 31.57],
        [1340575200000, 30.84],
        [1340661600000, 31.07],
        [1340748000000, 31.41],
        [1340834400000, 31.17],
        [1340920800000, 32.37],
        [1341180000000, 32.19],
        [1341266400000, 32.51],
        [1341439200000, 32.53],
        [1341525600000, 31.37],
        [1341784800000, 30.43],
        [1341871200000, 30.44],
        [1341957600000, 30.2],
        [1342044000000, 30.14],
        [1342130400000, 30.65],
        [1342389600000, 30.4],
        [1342476000000, 30.65],
        [1342562400000, 31.43],
        [1342648800000, 31.89],
        [1342735200000, 31.38],
        [1342994400000, 30.64],
        [1343080800000, 30.02],
        [1343167200000, 30.33],
        [1343253600000, 30.95],
        [1343340000000, 31.89],
        [1343599200000, 31.01],
        [1343685600000, 30.88],
        [1343772000000, 30.69],
        [1343858400000, 30.58],
        [1343944800000, 32.02],
        [1344204000000, 32.14],
        [1344290400000, 32.37],
        [1344376800000, 32.51],
        [1344463200000, 32.65],
        [1344549600000, 32.64],
        [1344808800000, 32.27],
        [1344895200000, 32.1],
        [1344981600000, 32.91],
        [1345068000000, 33.65],
        [1345154400000, 33.8],
        [1345413600000, 33.92],
        [1345500000000, 33.75],
        [1345586400000, 33.84],
        [1345672800000, 33.5],
        [1345759200000, 32.26],
        [1346018400000, 32.32],
        [1346104800000, 32.06],
        [1346191200000, 31.96],
        [1346277600000, 31.46],
        [1346364000000, 31.27],
        [1346709600000, 31.43],
        [1346796000000, 32.26],
        [1346882400000, 32.79],
        [1346968800000, 32.46],
        [1347228000000, 32.13],
        [1347314400000, 32.43],
        [1347400800000, 32.42],
        [1347487200000, 32.81],
        [1347573600000, 33.34],
        [1347832800000, 33.41],
        [1347919200000, 32.57],
        [1348005600000, 33.12],
        [1348092000000, 34.53],
        [1348178400000, 33.83],
        [1348437600000, 33.41],
        [1348524000000, 32.9],
        [1348610400000, 32.53],
        [1348696800000, 32.8],
        [1348783200000, 32.44],
        [1349042400000, 32.62],
        [1349128800000, 32.57],
        [1349215200000, 32.6],
        [1349301600000, 32.68],
        [1349388000000, 32.47],
        [1349647200000, 32.23],
        [1349733600000, 31.68],
        [1349820000000, 31.51],
        [1349906400000, 31.78],
        [1349992800000, 31.94],
        [1350252000000, 32.33],
        [1350338400000, 33.24],
        [1350424800000, 33.44],
        [1350511200000, 33.48],
        [1350597600000, 33.24],
        [1350856800000, 33.49],
        [1350943200000, 33.31],
        [1351029600000, 33.36],
        [1351116000000, 33.4],
        [1351202400000, 34.01],
        [1351638000000, 34.02],
        [1351724400000, 34.36],
        [1351810800000, 34.39],
        [1352070000000, 34.24],
        [1352156400000, 34.39],
        [1352242800000, 33.47],
        [1352329200000, 32.98],
        [1352415600000, 32.9],
        [1352674800000, 32.7],
        [1352761200000, 32.54],
        [1352847600000, 32.23],
        [1352934000000, 32.64],
        [1353020400000, 32.65],
        [1353279600000, 32.92],
        [1353366000000, 32.64],
        [1353452400000, 32.84],
        [1353625200000, 33.4],
        [1353884400000, 33.3],
        [1353970800000, 33.18],
        [1354057200000, 33.88],
        [1354143600000, 34.09],
        [1354230000000, 34.61],
        [1354489200000, 34.7],
        [1354575600000, 35.3],
        [1354662000000, 35.4],
        [1354748400000, 35.14],
        [1354834800000, 35.48],
        [1355094000000, 35.75],
        [1355180400000, 35.54],
        [1355266800000, 35.96],
        [1355353200000, 35.53],
        [1355439600000, 37.56],
        [1355698800000, 37.42],
        [1355785200000, 37.49],
        [1355871600000, 38.09],
        [1355958000000, 37.87],
        [1356044400000, 37.71],
        [1356303600000, 37.53],
        [1356476400000, 37.55],
        [1356562800000, 37.3],
        [1356649200000, 36.9],
        [1356908400000, 37.68],
        [1357081200000, 38.34],
        [1357167600000, 37.75],
        [1357254000000, 38.13],
        [1357513200000, 37.94],
        [1357599600000, 38.14],
        [1357686000000, 38.66],
        [1357772400000, 38.62],
        [1357858800000, 38.09],
        [1358118000000, 38.16],
        [1358204400000, 38.15],
        [1358290800000, 37.88],
        [1358377200000, 37.73],
        [1358463600000, 37.98],
        [1358809200000, 37.95],
        [1358895600000, 38.25],
        [1358982000000, 38.1],
        [1359068400000, 38.32],
        [1359327600000, 38.24],
        [1359414000000, 38.52],
        [1359500400000, 37.94],
        [1359586800000, 37.83],
        [1359673200000, 38.34],
        [1359932400000, 38.1],
        [1360018800000, 38.51],
        [1360105200000, 38.4],
        [1360191600000, 38.07],
        [1360278000000, 39.12],
        [1360537200000, 38.64],
        [1360623600000, 38.89],
        [1360710000000, 38.81],
        [1360796400000, 38.61],
        [1360882800000, 38.63],
        [1361228400000, 38.99],
        [1361314800000, 38.77],
        [1361401200000, 38.34],
        [1361487600000, 38.55],
        [1361746800000, 38.11],
        [1361833200000, 38.59],
        [1361919600000, 39.6],
      ],
    },
  ]);
  const [pricePerTokenChartOptions, setpricePerTokenChartOptions] =
    useState<ApexOptions>({
      chart: {
        type: "area",
        height: 350,
        zoom: {
          autoScaleYaxis: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: "datetime",
        min: new Date("01 Mar 2012").getTime(),
        tickAmount: 6,
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy",
        },
      },
      stroke: {
        curve: "smooth",
      },
      colors: ["#0D9488"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100],
        },
      },
    });

  const [tabIndex, setTabIndex] = useState(0);
  const [isInfoAreaHovered, setIsInfoAreaHovered] = useState<boolean>(false);
  const [isBuyOrderModalOpen, setIsBuyOrderModalOpen] = useState<boolean>(false);
  const [isSellOrderModalOpen, setIsSellOrderModalOpen] = useState<boolean>(false);
  const [isInitialOfferingBuySuccessModalOpen, setIsInitialOfferingBuySuccessModalOpen] = useState<boolean>(false);
  const [isLimitBuySuccessModalOpen, setIsLimitBuySuccessModalOpen] = useState<boolean>(false);
  const [isLimitSellSuccessModalOpen, setIsLimitSellSuccessModalOpen] = useState<boolean>(false);
  const [isMarketBuySuccessModalOpen, setIsMarketBuySuccessModalOpen] = useState<boolean>(false);
  const [isMarketSellSuccessModalOpen, setIsMarketSellSuccessModalOpen] = useState<boolean>(false);

  const handleBuyButtonClick = () => {
    setIsBuyOrderModalOpen(true);
  };

  const handleSellButtonClick = () => {
    if (allowTrade) {
      setIsSellOrderModalOpen(true);
    }
  };

  const handleBuySuccess = (formData: BuyOrderData) => {
    if (!allowTrade) {
      setIsInitialOfferingBuySuccessModalOpen(true);
      return;
    }

    switch ((formData as AfterMarketBuyOrderData)?.type) {
      case 'market':
        setIsMarketBuySuccessModalOpen(true);
        break;
      case 'limit':
        setIsLimitBuySuccessModalOpen(true);
        break;
    }

    return;
  }

  const handleSellSuccess = (formData: SellOrderData) => {
    switch ((formData as SellOrderData)?.type) {
      case 'market':
        setIsMarketSellSuccessModalOpen(true);
        break;
      case 'limit':
        setIsLimitSellSuccessModalOpen(true);
        break;
    }
    return;
  }

  return (
    <div className="w-full flex justify-center py-4">
      <div className="flex max-w-[1238px] w-full p-2 gap-4">
        <div className="w-2/3 flex flex-col gap-6">
          <MarketDetailPhotos />
          {/* Will be used later */}
          {/* {allowTrade && (
            <div className="w-full">
              {ReactApexChart && (
                <ReactApexChart
                  options={pricePerTokenChartOptions}
                  series={pricePerTokenChartSeries}
                  type="area"
                  height={350}
                />
              )}
            </div>
          )} */}
          <div className="w-full">
            <Tabs colorScheme="green" index={tabIndex} onChange={(index: number) => setTabIndex(index)}>
              <TabList gap="2">
                <Tab fontSize="sm">Description</Tab>
                <Tab fontSize="sm">Financials</Tab>
                <Tab fontSize="sm">Order book</Tab>
                <Tab fontSize="sm">Documents</Tab>
                <Tab fontSize="sm">Markets</Tab>
              </TabList>
              <TabPanels>
                <TabPanel px={0} py={4}>
                  <MarketDetailDescriptionPanel />
                </TabPanel>
                <TabPanel px={0} py={4}>
                  <MarketDetailFinancialPanel />
                </TabPanel>
                <TabPanel px={0} py={4}>
                  <MarketDetailOrderbookPanel allowTrade={allowTrade} />
                </TabPanel>
                <TabPanel px={0} py={4}>
                  <MarketDetailDocumentPanel />
                </TabPanel>
                <TabPanel px={0} py={4}>
                  <MarketDetailMarketPanel />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
        <div
          onMouseEnter={() => setIsInfoAreaHovered(true)}
          onMouseLeave={() => setIsInfoAreaHovered(false)}
          className="w-1/3 relative"
        >
          <div className={cn(
            "flex flex-col gap-6 sticky top-0",
            account?.address ? 'top-[92px]' : 'top-[84px]'
          )}>
            <div className="flex flex-col gap-1">
              {isInfoAreaHovered && (
                <div className="absolute flex flex-col items-start p-3 gap-1 bg-white shadow-lg rounded-lg w-[240px] h-[78px] right-[120px] top-[260px]">
                  <p className="w-[216px] h-[54px] font-normal text-sm leading-5  text-zinc-500">
                    This is the lowest current price per token available for this
                    property.
                  </p>
                </div>
              )}
              <h2 className="text-2xl font-bold">
                Jl Pinangsia Raya Komplek Glodok Plaza Bl B-22
              </h2>
              <p className="text-lg text-zinc-500">DKI Jakarta</p>
            </div>
            {/* Tag Box of trading*/}
            {allowTrade ? (
              <Box
                position="relative"
                backgroundColor="#F0FDFA"
                color="#0D9488"
                padding="2px 8px"
                borderWidth="1px"
                borderRadius="full"
                borderColor="#0D9488"
                fontSize="xs"
                zIndex={10}
                width="fit-content"
              >
                Aftermarket
              </Box>
            ) : (
              <Box
                position="relative"
                backgroundColor="#F7FEE7"
                color="#65A30D"
                padding="2px 8px"
                borderWidth="1px"
                borderRadius="full"
                borderColor="#65A30D"
                fontSize="xs"
                zIndex={10}
                width="fit-content"
              >
                Initial Offering
              </Box>
            )}
            <div className="flex p-4 gap-4 w-full rounded-2xl shadow-md items-center">
              <House size={32} weight="fill" className="text-teal-600" />
              <div className="flex flex-col justify-between">
                <p className="text-sm text-zinc-500">Property type</p>
                <p className="text-md font-bold text-teal-600">House</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 p-4 w-full rounded-2xl shadow-md">
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1">
                  <p className="text-sm text-zinc-500">{allowTrade ? 'Estimated Price' : 'Starting at'}</p>
                  <WarningCircle
                    size={18}
                    weight="fill"
                    className="rotate-180 text-zinc-400"
                  />
                </div>
                <p className="text-lg font-bold text-teal-600">600,000 LSK</p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex w-full gap-2 items-center">
                  <Progress
                    colorScheme="green"
                    size="sm"
                    value={83}
                    w="full"
                    rounded="full"
                  />
                  <p className="text-xs text-teal-600 font-bold">83%</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-zinc-500">Token available</p>
                  <p className="text-sm font-medium text-black">8,210 token</p>
                </div>
              </div>
              <div className="flex flex-col p-3 gap-3 w-full bg-zinc-100 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <p className="text-sm text-zinc-500">
                      Projected Yield
                    </p>
                    <WarningCircle
                      size={18}
                      weight="fill"
                      className="rotate-180 text-zinc-400"
                    />
                  </div>
                  <p className="text-sm font-medium text-black">6.0%</p>
                </div>
                <Divider className="border-zinc-200 !m-0" />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <p className="text-sm text-zinc-500">
                      Rental Status
                    </p>
                    <WarningCircle
                      size={18}
                      weight="fill"
                      className="rotate-180 text-zinc-400"
                    />
                  </div>
                  <p className="text-sm font-medium text-black">Active</p>
                </div>
              </div>
              <div className="flex gap-2 w-full">
                <Button
                  colorScheme="teal"
                  bgColor="teal.600"
                  w="full"
                  rounded="full"
                  fontWeight="normal"
                  onClick={handleBuyButtonClick}
                >
                  Buy
                </Button>
                <Button
                  colorScheme="teal"
                  w="full"
                  rounded="full"
                  fontWeight="normal"
                  isDisabled={!allowTrade}
                  bgColor="teal.100"
                  color="teal.700"
                  _disabled={{ bgColor: "teal.50", color: "teal.600" }}
                  _hover={{
                    bgColor: allowTrade ? "teal.200" : "teal.50",
                    color: allowTrade ? "teal.900" : "teal.600",
                    cursor: allowTrade ? "pointer" : "no-drop",
                  }}
                  onClick={handleSellButtonClick}
                >
                  Sell
                </Button>
              </div>
              <Divider className="border-zinc-200 !m-0" />
              <div className="w-full flex items-center justify-stretch gap-2">
                <Button
                  colorScheme="white"
                  color="teal.600"
                  w="full"
                  rounded="full"
                  shadow="md"
                >
                  Rent property
                </Button>
                {allowTrade && (
                  <Button
                    colorScheme="white"
                    color="teal.600"
                    w="full"
                    rounded="full"
                    shadow="md"
                    onClick={() => setTabIndex(2)}
                  >
                    View order book
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <PlaceBuyOrderModal isOpen={isBuyOrderModalOpen} onClose={() => setIsBuyOrderModalOpen(false)} isAfterMarketTrading={allowTrade} onSuccess={handleBuySuccess} />
      <PlaceSellOrderModal isOpen={isSellOrderModalOpen} onClose={() => setIsSellOrderModalOpen(false)} onSuccess={handleSellSuccess} />
      <InitialOfferingBuySuccessModal isOpen={isInitialOfferingBuySuccessModalOpen} onClose={() => setIsInitialOfferingBuySuccessModalOpen(false)} />
      <LimitBuySuccessModal isOpen={isLimitBuySuccessModalOpen} onClose={() => setIsLimitBuySuccessModalOpen(false)} />
      <LimitSellSuccessModal isOpen={isLimitSellSuccessModalOpen} onClose={() => setIsLimitSellSuccessModalOpen(false)} />
      <MarketBuySuccessModal isOpen={isMarketBuySuccessModalOpen} onClose={() => setIsMarketBuySuccessModalOpen(false)} />
      <MarketSellSuccessModal isOpen={isMarketSellSuccessModalOpen} onClose={() => setIsMarketSellSuccessModalOpen(false)} />
    </div>
  );
};

export default MarketDetailClientPage;
