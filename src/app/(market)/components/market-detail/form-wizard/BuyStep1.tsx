"use client";

import { AfterMarketBuyOrderData, BuyOrderData } from "@/types/order";
import { cn } from "@/utils/cn";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Info, Wallet } from "@phosphor-icons/react/dist/ssr";
import { Divider } from "antd";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useReadContractHook } from "@/utils/hooks";
import { readContractFetch } from "@/utils/fetch";

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
  // e.g. 5% => feePercentage = 500, feePrecision = 10_000
  const [salePrice, setSalePrice] = useState<number | null>(null);
  const [feePercentage, setFeePercentage] = useState<number | null>(null);
  const [feePrecision, setFeePrecision] = useState<number | null>(null);
  const [initialOfferingSupply, setInitialOfferingSupply] = useState<
    number | null
  >(null);
  const [calculateBuyCost, setCalculateBuyCost] = useState<
    [number, number] | null
  >(null);
  const marketContractAddress =
    process.env.NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS!;

  const { data: salePriceData } = useReadContractHook({
    contractName: "KolektivaMarket",
    functionName: "salePrice",
    // contractAddress: "", // market contract address
    contractAddress: marketContractAddress,

    args: [],
  });

  const { data: feePercentageData } = useReadContractHook({
    contractName: "KolektivaMarket",
    functionName: "feePercentage",
    // contractAddress: "", // market contract address
    contractAddress: marketContractAddress,

    args: [],
  });

  const { data: feePrecisionData } = useReadContractHook({
    contractName: "KolektivaMarket",
    functionName: "FEE_PRECISION",
    // contractAddress: "", // market contract address
    contractAddress: marketContractAddress,

    args: [],
  });

  const { data: initialOfferingSupplyData } = useReadContractHook({
    contractName: "KolektivaMarket",
    functionName: "initialOfferingSupply",
    // contractAddress: "", // market contract address
    contractAddress: marketContractAddress,

    args: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await readContractFetch({
        contractName: "KolektivaMarket",
        functionName: "calculateBuyCost",
        contractAddress: marketContractAddress,
        args: [formData.qtyToken],
      });

      if (data) {
        setCalculateBuyCost([Number(data[0]), Number(data[1])]);
      }
    };

    fetchData();
  }, [formData.qtyToken]);

  useEffect(() => {
    if (feePercentageData) {
      setFeePercentage(Number(feePercentageData));
    }
  }, [feePercentageData]);

  useEffect(() => {
    if (feePrecisionData) {
      setFeePrecision(Number(feePrecisionData));
    }
  }, [feePrecisionData]);

  useEffect(() => {
    if (salePriceData) {
      setSalePrice(Number(salePriceData));
    }
  }, [salePriceData]);

  useEffect(() => {
    if (initialOfferingSupplyData) {
      setInitialOfferingSupply(Number(initialOfferingSupplyData));
    }
  }, [initialOfferingSupplyData]);

  const calculateCostAndFee = (amount: number, price: number) => {
    const cost = amount * price;
    const fee = (cost * feePercentage!) / feePrecision!;
    const totalCost = cost + fee;
    return { totalCost, fee };
  };

  const calculatedData = useMemo(() => {
    if (feePercentage === null || feePrecision === null || salePrice == null)
      return;

    const qtyToken = formData.qtyToken;
    let pricePerToken = isAfterMarketTrading
      ? formData.pricePerToken
      : salePrice;
    let fee = 0;
    let totalCost = 0;

    if (isAfterMarketTrading && activeTab == "market") {
      console.log("buy cost");
      console.log(calculateBuyCost);

      const [calculatedTotalCost, calculatedFee] = calculateBuyCost || [0, 0];
      fee = Number(calculatedFee);
      totalCost = Number(calculatedTotalCost);
      pricePerToken = (totalCost - fee) / qtyToken;
    } else {
      const result = calculateCostAndFee(qtyToken, pricePerToken);
      fee = result.fee;
      totalCost = result.totalCost;
    }

    return { fee, totalCost, pricePerToken };
  }, [
    formData.qtyToken,
    formData.pricePerToken,
    calculateBuyCost,
    feePercentage,
    feePrecision,
    salePrice,
    isAfterMarketTrading,
    activeTab,
  ]);

  useEffect(() => {
    if (calculatedData) {
      const updatedData = { ...formData, ...calculatedData };
      onDataChange(updatedData);
    }
  }, [calculatedData]);

  const setTokenQty = (token: number) => {
    if (
      !isAfterMarketTrading &&
      initialOfferingSupply !== null &&
      token > initialOfferingSupply
    ) {
      console.warn("Quantity exceeds initial offering supply.");
      return; // Prevent proceeding if the quantity exceeds the supply
    }
    if (formData.qtyToken !== token) {
      // Check if there's an actual change
      const updatedData = { ...formData, qtyToken: token };
      onDataChange(updatedData);
    }
  };

  const setTokenPrice = (price: number) => {
    if (formData.pricePerToken !== price) {
      // Check if there's an actual change
      const updatedData = { ...formData, pricePerToken: price };
      onDataChange(updatedData);
    }
  };

  const setActiveTab = (tab: (typeof tabs)[number]["id"]) => {
    if ((formData as any).type !== tab) {
      // Check if there's an actual change
      const updatedData = { ...formData, type: tab };
      onDataChange(updatedData);
    }
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
            <p className="text-base font-medium">30,00 USDT</p>
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
                onChange={(e) => setTokenPrice(parseInt(e.target.value) || 0)}
              />
              <InputRightElement right={6}>
                <span className="text-sm text-zinc-500">USDT</span>
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
              <p className="text-xs text-zinc-700">
                {formData.pricePerToken} USDT
              </p>
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
              <p className="text-xs text-zinc-700">
                {formData.pricePerToken * 5} USDT
              </p>
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
              <p className="text-xs text-zinc-700">
                {formData.pricePerToken * 10} USDT
              </p>
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
              <p className="text-xs text-zinc-700">
                {formData.pricePerToken * 25} USDT
              </p>
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
              <p className="text-xs text-zinc-700">
                {formData.pricePerToken * 50} USDT
              </p>
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
              <p className="text-xs text-zinc-700">
                {formData.pricePerToken * 100} USDT
              </p>
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
        <p className="text-sm font-medium text-zinc-700">{formData.fee} USDT</p>
      </div>
      {/* Mark test */}
      <div>
        <>Supply : </>
        <>{initialOfferingSupply && <>{initialOfferingSupply.toString()} </>}</>
      </div>
      {/* Mark test */}
    </div>
  );
};

export default BuyStep1;
