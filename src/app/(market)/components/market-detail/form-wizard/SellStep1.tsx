'use client';

import { SellOrderData } from '@/types/order';
import { PropertyData } from '@/types/property';
import { cn } from '@/utils/cn';
import { readContractFetch } from '@/utils/fetch';
import { formatUSDTBalance, parseUSDTBalance } from '@/utils/formatter';
import { useReadContractHook } from '@/utils/hooks';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { File, Info } from '@phosphor-icons/react/dist/ssr';
import { Divider } from 'antd';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useActiveAccount, useActiveWalletChain } from 'thirdweb/react';

interface SellStep1Props {
  propertyData: PropertyData;
  formData: SellOrderData;
  onDataChange: (data: SellOrderData) => void;
}

const tabs = [
  { id: 'market' as const, label: 'Market' },
  { id: 'limit' as const, label: 'Limit' },
];

const SellStep1: React.FC<SellStep1Props> = ({
  propertyData,
  formData,
  onDataChange,
}) => {
  const activeAccount = useActiveAccount();
  const address = activeAccount?.address;
  const chain = useActiveWalletChain()!;
  const feePercentage = 0.005; // 0.5%

  const activeTab = (formData as SellOrderData).type || 'market';
  const [salePrice, setSalePrice] = useState<number | null>(null);
  const [balanceToken, setBalanceToken] = useState<number | null>(null);
  const [calculateSellProceeds, setCalculateSellProceeds] = useState<
    [number, number] | null
  >(null);

  const { data: salePriceData } = useReadContractHook({
    contractName: 'KolektivaMarket',
    functionName: 'salePrice',
    contractAddress: propertyData.marketAddress,

    args: [],
  });

  //
  // const { data: feePercentageData } = useReadContractHook({
  //   contractName: 'KolektivaMarket',
  //   functionName: 'getFeePercentage',
  //   contractAddress: propertyData.marketAddress,

  //   args: [],
  // });

  // const { data: feePrecisionData } = useReadContractHook({
  //   contractName: 'KolektivaMarket',
  //   functionName: 'getFeePrecision',
  //   contractAddress: propertyData.marketAddress,

  //   args: [],
  // });

  const { data: balanceTokenData } = useReadContractHook({
    contractName: 'KolektivaToken',
    functionName: 'balanceOf',
    contractAddress: propertyData.tokenAddress,
    args: [address],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeTab === 'market' && formData.qtyToken > 0) {
          const data = await readContractFetch({
            chainId: propertyData.chainId.toString(),
            contractName: 'KolektivaMarket',
            functionName: 'calculateSellProceeds',
            contractAddress: propertyData.marketAddress,
            args: [formData.qtyToken],
          });

          if (data) {
            setCalculateSellProceeds([Number(data[0]), Number(data[1])]);
          }
        }
      } catch (error) {
        console.error('Error fetching sell proceeds:', error);
      }
    };
    fetchData();
  }, [formData.qtyToken, propertyData.marketAddress, activeTab]);

  // useEffect(() => {
  //   if (feePercentageData) {
  //     setFeePercentage(Number(feePercentageData));
  //   }
  // }, [feePercentageData]);

  // useEffect(() => {
  //   if (feePrecisionData) {
  //     setFeePrecision(Number(feePrecisionData));
  //   }
  // }, [feePrecisionData]);

  useEffect(() => {
    if (salePriceData) {
      setSalePrice(Number(salePriceData));
    }
  }, [salePriceData]);

  useEffect(() => {
    if (balanceTokenData) {
      console.log(balanceTokenData, 'token data');

      setBalanceToken(Number(balanceTokenData));
    }
  }, [balanceTokenData]);

  const calculateCostAndFee = (amount: number, price: number) => {
    const proceeds = amount * Number(price);
    const fee = proceeds * feePercentage!;
    const totalProceeds = proceeds - fee;
    return { totalProceeds, fee };
  };

  const calculatedData = useMemo(() => {
    if (feePercentage === null || salePrice == null) return;

    const qtyToken = formData.qtyToken;
    let pricePerToken = formData.pricePerToken;
    let fee = 0;
    let totalProceeds = 0;

    if (activeTab == 'market') {
      console.log('sell proceeds');
      console.log(calculateSellProceeds);

      const [calculatedTotalProceeds, calculatedFee] =
        calculateSellProceeds || [0, 0];
      fee = calculatedFee;
      totalProceeds = calculatedTotalProceeds;
      pricePerToken = (calculatedTotalProceeds + calculatedFee) / qtyToken;
    } else {
      // Initial offering or after market limit calculation
      const result = calculateCostAndFee(qtyToken, pricePerToken);
      fee = result.fee;
      totalProceeds = result.totalProceeds;
    }

    return { fee, totalProceeds, pricePerToken };
  }, [
    formData.qtyToken,
    formData.pricePerToken,

    calculateSellProceeds,
    feePercentage,
    salePrice,
    activeTab,
  ]);

  useEffect(() => {
    if (calculatedData) {
      const updatedData = { ...formData, ...calculatedData };
      onDataChange(updatedData);
    }
  }, [calculatedData]);

  const setTokenQty = (token: number) => {
    if (formData.qtyToken !== token) {
      const updatedData = { ...formData, qtyToken: token };
      onDataChange(updatedData);
    }
  };

  const setTokenPrice = (price: number) => {
    if (formData.pricePerToken !== price) {
      // Check if there's an actual change
      const updatedData = {
        ...formData,
        pricePerToken: parseUSDTBalance(price),
      };
      onDataChange(updatedData);
    }
  };

  const setActiveTab = (tab: (typeof tabs)[number]['id']) => {
    if (formData.type !== tab) {
      // Check if there's an actual change
      const updatedData = { ...formData, type: tab };
      onDataChange(updatedData);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-2xl font-bold text-teal-950">Place sell order</h2>
          <p className="text-lg text-zinc-700">{propertyData.address}</p>
          <p className="text-lg text-zinc-500">{propertyData.city}</p>
        </div>
        <Divider className="border-zinc-200 !m-0" />
        <div className="w-full flex justify-evenly bg-zinc-100 rounded-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={cn(
                'w-full text-center py-3 text-sm relative transition',
                activeTab === tab.id
                  ? 'font-medium text-white'
                  : 'text-zinc-500',
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
              <p className="text-base font-medium">
                {balanceToken?.toString()} Token
              </p>
            </div>
          </div>
        )}
        {activeTab === tabs[1].id && (
          <div className="flex flex-col gap-1">
            <p className="text-sm text-zinc-700">Limit price per token *</p>
            <InputGroup>
              <Input
                type="number"
                placeholder="Enter amount"
                className="!bg-zinc-100 !rounded-full"
                onChange={(e) => setTokenPrice(parseFloat(e.target.value) || 0)}
              />
              <InputRightElement right={6}>
                <span className="text-sm text-zinc-500">USDT</span>
              </InputRightElement>
            </InputGroup>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm text-zinc-700">Quantity</p>
        <div className="flex gap-2">
          <InputGroup>
            <Input
              type="number"
              placeholder="Enter amount"
              className="!bg-zinc-100 !rounded-full"
              value={formData?.qtyToken}
              onChange={(e) => setTokenQty(parseInt(e.target.value) || 0)}
            />
            <InputRightElement right={6}>
              <span className="text-sm text-zinc-500">Token{'(s)'}</span>
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
              bgColor: 'teal.200',
              color: 'teal.900',
              cursor: 'pointer',
            }}
            onClick={() => {}}
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
      {activeTab === tabs[1].id && (
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
      {activeTab === tabs[0].id && (
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <p className="text-sm text-zinc-500">Estimated total price</p>
          </div>
          <p className="text-sm font-medium text-zinc-700">
            {formatUSDTBalance(formData.totalProceeds)} USDT
          </p>
        </div>
      )}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <p className="text-sm text-zinc-500">Fees</p>
          <Info weight="fill" size={16} className="text-zinc-400" />
        </div>
        <p className="text-sm font-medium text-zinc-700">
          {formatUSDTBalance(formData.fee)} USDT
        </p>
      </div>
    </div>
  );
};

export default SellStep1;
