"use client";

import { AfterMarketBuyOrderData, BuyOrderData } from "@/types/order";
import { cn } from "@/utils/cn";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Info, Wallet } from "@phosphor-icons/react/dist/ssr";
import { Divider } from "antd";
import { useState } from "react";
import { motion } from "framer-motion";

interface BuyStep1Props {
  isAfterMarketTrading: boolean;
  formData: BuyOrderData;
  onDataChange: (data: BuyOrderData) => void;
}

const tabs = [
  { id: "market" as const, label: "Market" },
  { id: "limit" as const, label: "Limit" },
];

const BuyStep1: React.FC<BuyStep1Props> = ({
  isAfterMarketTrading,
  formData,
  onDataChange,
}) => {
  const activeTab = (formData as AfterMarketBuyOrderData).type || "market";

  const setTokenQty = (token: number) => {
    const updatedData = { ...formData, qtyToken: token };
    onDataChange(updatedData);
  };

  const setActiveTab = (tab: (typeof tabs)[number]["id"]) => {
    const updatedData = { ...formData, type: tab };
    onDataChange(updatedData);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-2xl font-bold text-teal-950">Place buy order</h2>
          <p className="text-lg text-zinc-700">
            Jl Pinangsia Raya Komplek Glodok Plaza Bl B-22
          </p>
          <p className="text-lg text-zinc-500">DKI Jakarta</p>
        </div>
        <Divider className="border-zinc-200 !m-0" />
        {isAfterMarketTrading && (
          <div className="w-full flex justify-evenly bg-zinc-100 rounded-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={cn(
                  "w-full text-center py-3 text-sm relative transition",
                  activeTab === tab.id
                    ? "font-medium text-white"
                    : "text-zinc-500"
                )}
                onClick={() => setActiveTab(tab.id)}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="buy-type-tabs"
                    className="absolute inset-0 bg-teal-600"
                    style={{ borderRadius: 9999 }}
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
                <p className="relative z-10">{tab.label}</p>
              </button>
            ))}
          </div>
        )}
        <div className="flex items-center gap-3 p-3 shadow-sm shadow-zinc-300 text-teal-600 rounded-2xl">
          <Wallet weight="fill" size={24} />
          <div className="flex flex-col justify-center">
            <p className="text-sm text-zinc-500">Your balance</p>
            <p className="text-base font-medium">30,00 USD</p>
          </div>
        </div>
        {isAfterMarketTrading && activeTab === tabs[1].id && (
          <div className="flex flex-col gap-1">
            <p className="text-sm text-zinc-700">Limit price per token *</p>
            <InputGroup>
              <Input
                type="number"
                placeholder="Enter amount"
                className="!bg-zinc-100 !rounded-full"
              />
              <InputRightElement right={6}>
                <span className="text-sm text-zinc-500">LSK</span>
              </InputRightElement>
            </InputGroup>
          </div>
        )}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1 ">
            <p className="text-sm text-zinc-700">Property token quantity</p>
            <Info weight="fill" size={16} className="text-zinc-400" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div
              className={cn(
                "flex flex-col gap-0.5 justify-center items-center rounded-lg p-3 cursor-pointer",
                formData?.qtyToken === 1
                  ? "bg-teal-50 border border-teal-600"
                  : "shadow-sm shadow-zinc-300"
              )}
              onClick={() => setTokenQty(1)}
            >
              <p className="text-base font-medium text-teal-600">1 token</p>
              <p className="text-xs text-zinc-700">5,00 USD</p>
            </div>
            <div
              className={cn(
                "flex flex-col gap-0.5 justify-center items-center rounded-lg p-3 cursor-pointer",
                formData?.qtyToken === 5
                  ? "bg-teal-50 border border-teal-600"
                  : "shadow-sm shadow-zinc-300"
              )}
              onClick={() => setTokenQty(5)}
            >
              <p className="text-base font-medium text-teal-600">5 token</p>
              <p className="text-xs text-zinc-700">25,00 USD</p>
            </div>
            <div
              className={cn(
                "flex flex-col gap-0.5 justify-center items-center rounded-lg p-3 cursor-pointer",
                formData?.qtyToken === 10
                  ? "bg-teal-50 border border-teal-600"
                  : "shadow-sm shadow-zinc-300"
              )}
              onClick={() => setTokenQty(10)}
            >
              <p className="text-base font-medium text-teal-600">10 token</p>
              <p className="text-xs text-zinc-700">50,00 USD</p>
            </div>
            <div
              className={cn(
                "flex flex-col gap-0.5 justify-center items-center rounded-lg p-3 cursor-pointer",
                formData?.qtyToken === 25
                  ? "bg-teal-50 border border-teal-600"
                  : "shadow-sm shadow-zinc-300"
              )}
              onClick={() => setTokenQty(25)}
            >
              <p className="text-base font-medium text-teal-600">25 token</p>
              <p className="text-xs text-zinc-700">125,00 USD</p>
            </div>
            <div
              className={cn(
                "flex flex-col gap-0.5 justify-center items-center rounded-lg p-3 cursor-pointer",
                formData?.qtyToken === 50
                  ? "bg-teal-50 border border-teal-600"
                  : "shadow-sm shadow-zinc-300"
              )}
              onClick={() => setTokenQty(50)}
            >
              <p className="text-base font-medium text-teal-600">50 token</p>
              <p className="text-xs text-zinc-700">250,00 USD</p>
            </div>
            <div
              className={cn(
                "flex flex-col gap-0.5 justify-center items-center rounded-lg p-3 cursor-pointer",
                formData?.qtyToken === 100
                  ? "bg-teal-50 border border-teal-600"
                  : "shadow-sm shadow-zinc-300"
              )}
              onClick={() => setTokenQty(100)}
            >
              <p className="text-base font-medium text-teal-600">100 token</p>
              <p className="text-xs text-zinc-700">500,00 USD</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm text-zinc-700">Custom quantity</p>
        <InputGroup>
          <Input
            type="number"
            placeholder="Enter amount"
            className="!bg-zinc-100 !rounded-full"
            value={formData?.qtyToken}
            onChange={(e) => setTokenQty(parseInt(e.target.value) || 0)}
          />
          <InputRightElement right={6}>
            <span className="text-sm text-zinc-500">Token{"(s)"}</span>
          </InputRightElement>
        </InputGroup>
      </div>
      {isAfterMarketTrading && activeTab === tabs[1].id && (
        <div className="flex flex-col gap-1">
          <p className="text-sm text-zinc-700">Order expiration *</p>
          <InputGroup>
            <Input
              type="number"
              placeholder="Enter amount"
              className="!bg-zinc-100 !rounded-full"
            />
            <InputRightElement right={6}>
              <span className="text-sm text-zinc-500">Days</span>
            </InputRightElement>
          </InputGroup>
        </div>
      )}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <p className="text-sm text-zinc-500">Fees</p>
          <Info weight="fill" size={16} className="text-zinc-400" />
        </div>
        <p className="text-sm font-medium text-zinc-700">0.11 USD</p>
      </div>
    </div>
  );
};

export default BuyStep1;
