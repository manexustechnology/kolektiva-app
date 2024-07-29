'use client';

import { Button, Progress, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { House, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { Divider } from "antd";
import MarketDetailPhotos from "./MarketDetailPhotos";
import MarketDetailDescriptionPanel from "./panel/MarketDetailDescriptionPanel";
import MarketDetailFinancialPanel from "./panel/MarketDetailFinancialPanel";
import MarketDetailOrderbookPanel from "./panel/MarketDetailOrderbookPanel";
import MarketDetailDocumentPanel from "./panel/MarketDetailDocumentPanel";
import MarketDetailMarketPanel from "./panel/MarketDetailMarketPanel";
import { useState } from "react";

interface MarketDetailClientPageProps {
  isSold: boolean;
}

const MarketDetailClientPage: React.FC<MarketDetailClientPageProps> = ({
  isSold,
}) => {
  return (
    <div className="w-full flex justify-center py-4">
      <div className="flex max-w-[1238px] w-full p-2 gap-4">
        <div className="w-2/3 flex flex-col gap-6">
          <MarketDetailPhotos />
          <div className="w-full">
            <Tabs colorScheme="green" defaultIndex={0}>
              <TabList gap='2'>
                <Tab fontSize='sm'>Description</Tab>
                <Tab fontSize='sm'>Financials</Tab>
                <Tab fontSize='sm'>Order book</Tab>
                <Tab fontSize='sm'>Documents</Tab>
                <Tab fontSize='sm'>Markets</Tab>
              </TabList>
              <TabPanels>
                <TabPanel px={0} py={4}>
                  <MarketDetailDescriptionPanel />
                </TabPanel>
                <TabPanel px={0} py={4}>
                  <MarketDetailFinancialPanel />
                </TabPanel>
                <TabPanel px={0} py={4}>
                  <MarketDetailOrderbookPanel isSold={isSold} />
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
        <div className="w-1/3 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">Jl Pinangsia Raya Komplek Glodok Plaza Bl B-22</h2>
            <p className="text-lg text-zinc-500">DKI Jakarta</p>
          </div>
          <div className="flex">
            <div className="border-2 border-teal-600 px-2.5 py-1 rounded-full text-teal-600 bg-teal-50 text-sm">
              New Listing
            </div>
          </div>
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
                <p className="text-sm text-zinc-500">Starting at</p>
                <WarningCircle size={18} weight="fill" className="rotate-180 text-zinc-400" />
              </div>
              <p className="text-lg font-bold text-teal-600">Rp 600,000</p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex w-full gap-2 items-center">
                <Progress colorScheme='green' size='sm' value={83} w='full' rounded='full' />
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
                  <p className="text-sm text-zinc-500">Rental Yield</p>
                  <WarningCircle size={18} weight="fill" className="rotate-180 text-zinc-400" />
                </div>
                <p className="text-sm font-medium text-black">6.0%</p>
              </div>
              <Divider className="border-zinc-200 !m-0" />
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <p className="text-sm text-zinc-500">Projected Rental Yield</p>
                  <WarningCircle size={18} weight="fill" className="rotate-180 text-zinc-400" />
                </div>
                <p className="text-sm font-medium text-black">6.0%</p>
              </div>
              <Divider className="border-zinc-200 !m-0" />
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <p className="text-sm text-zinc-500">Projected Annual Return</p>
                  <WarningCircle size={18} weight="fill" className="rotate-180 text-zinc-400" />
                </div>
                <p className="text-sm font-medium text-black">8.6%</p>
              </div>
            </div>
            <div className="flex gap-2 w-full">
              <Button colorScheme="teal" bgColor='teal.600' w='full' rounded='full' fontWeight='normal'>Buy</Button>
              <Button colorScheme="teal" w='full' rounded='full' fontWeight='normal' isDisabled={!isSold} bgColor='teal.100' color='teal.700' _disabled={{ bgColor: 'teal.50', color: 'teal.600' }} _hover={{ bgColor: 'teal.200', color: 'teal.900', cursor: isSold ? 'pointer' : 'no-drop' }}>Sell</Button>
            </div>
            {isSold && (
              <>
                <Divider className="border-zinc-200 !m-0" />
                <div className="w-full">
                  <Button colorScheme="white" color="teal.600" w='full' rounded='full' shadow='md'>View order book</Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketDetailClientPage;