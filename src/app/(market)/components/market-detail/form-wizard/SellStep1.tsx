'use client';

import { SellOrderData } from "@/types/order";
import { cn } from "@/utils/cn";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { File, Info } from "@phosphor-icons/react/dist/ssr";
import { Divider } from "antd";
import { motion } from "framer-motion";

interface SellStep1Props {
  formData: SellOrderData;
  onDataChange: (data: SellOrderData) => void;
}

const tabs = [
  { id: 'market' as const, label: 'Market' },
  { id: 'limit' as const, label: 'Limit' },
]

const SellStep1: React.FC<SellStep1Props> = ({ formData, onDataChange }) => {
  const activeTab = (formData as SellOrderData).type || 'market';

  const setTokenQty = (token: number) => {
    const updatedData = { ...formData, qtyToken: token };
    onDataChange(updatedData);
  }

  const setActiveTab = (tab: typeof tabs[number]["id"]) => {
    const updatedData = {
      ...formData,
      type: tab,
    };
    onDataChange(updatedData);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-2xl font-bold text-teal-950">Place sell order</h2>
          <p className="text-lg text-zinc-700">Jl Pinangsia Raya Komplek Glodok Plaza Bl B-22</p>
          <p className="text-lg text-zinc-500">DKI Jakarta</p>
        </div>
        <Divider className="border-zinc-200 !m-0" />
        <div className="w-full flex justify-evenly bg-zinc-100 rounded-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={cn(
                "w-full text-center py-3 text-sm relative transition",
                activeTab === tab.id ? "font-medium text-white" : "text-zinc-500"
              )}
              onClick={() => setActiveTab(tab.id)}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="sell-type-tabs"
                  className="absolute inset-0 bg-teal-600"
                  style={{ borderRadius: 9999 }}
                  transition={{ type: 'spring', duration: 0.6 }}
                />
              )}
              <p className="relative z-10">{tab.label}</p>
            </button>
          ))}
        </div>
        {activeTab === tabs[0].id && (
          <div className="flex items-center gap-3 p-3 shadow-sm shadow-zinc-300 text-teal-600 rounded-2xl">
            <File weight="fill" size={24} />
            <div className="flex flex-col justify-center">
              <p className="text-sm text-zinc-500">You owned</p>
              <p className="text-base font-medium">1 token{"(s)"}</p>
            </div>
          </div>
        )}
        {activeTab === tabs[1].id && (
          <div className="flex flex-col gap-1">
            <p className="text-sm text-zinc-700">Limit price per token *</p>
            <InputGroup>
              <Input type="number" placeholder='Enter amount' className="!bg-zinc-100 !rounded-full" />
              <InputRightElement right={6}>
                <span className="text-sm text-zinc-500">LSK</span>
              </InputRightElement>
            </InputGroup>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm text-zinc-700">Quantity</p>
        <div className="flex gap-2">
          <InputGroup>
            <Input type="number" placeholder='Enter amount' className="!bg-zinc-100 !rounded-full" value={formData?.qtyToken} onChange={(e) => setTokenQty(parseInt(e.target.value) || 0)} />
            <InputRightElement right={6}>
              <span className="text-sm text-zinc-500">Token{"(s)"}</span>
            </InputRightElement>
          </InputGroup>
          <Button
            colorScheme="teal"
            w="auto"
            rounded="full"
            fontWeight="normal"
            bgColor="teal.100"
            color="teal.700"
            _hover={{
              bgColor: "teal.200",
              color: "teal.900",
              cursor: "pointer",
            }}
            onClick={() => { }}
            className="!px-6 !text-sm !font-medium"
          >
            All
          </Button>
        </div>
        {activeTab === tabs[1].id && (
          <div className="flex items-center gap-2">
            <p className="text-sm text-zinc-500">Available token</p>
            <p className="text-sm font-medium text-teal-600">1</p>
          </div>
        )}
      </div>
      {
        activeTab === tabs[1].id && (
          <div className="flex flex-col gap-1">
            <p className="text-sm text-zinc-700">Order expiration *</p>
            <InputGroup>
              <Input type="number" placeholder='Enter amount' className="!bg-zinc-100 !rounded-full" />
              <InputRightElement right={6}>
                <span className="text-sm text-zinc-500">Days</span>
              </InputRightElement>
            </InputGroup>
          </div>
        )
      }
      {activeTab === tabs[0].id && (
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <p className="text-sm text-zinc-500">Estimated total price</p>
          </div>
          <p className="text-sm font-medium text-zinc-700">5,00 LSK</p>
        </div>
      )}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <p className="text-sm text-zinc-500">Fees</p>
          <Info weight="fill" size={16} className="text-zinc-400" />
        </div>
        <p className="text-sm font-medium text-zinc-700">0.11 LSK</p>
      </div>
    </div >
  )
};

export default SellStep1;