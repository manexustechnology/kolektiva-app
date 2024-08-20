"use client";

import { SellOrderData } from "@/types/order";
import { useReadContractHook, useWriteContractHook } from "@/utils/hooks";
import { getTransactionStatus } from "@/app/api/tx-hash";

import { Divider } from "antd";
import { useMemo } from "react";
import { useActiveAccount } from "thirdweb/react";

interface SellStep2Props {
  formData: SellOrderData;
}

const SellStep2: React.FC<SellStep2Props> = ({ formData }) => {
  const activeAccount = useActiveAccount();
  const address = activeAccount?.address;
  const marketContractAddress =
    process.env.NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS!;
  const tokenContractAddress = process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS!;

  const { data: allowanceUsdtData, isLoading: isLoadingAllowanceUsdt } =
    useReadContractHook({
      contractName: "MockUSDT",
      functionName: "allowance",
      // args: [address, "_spender market address"],
      args: [address, marketContractAddress],
    });

  const { writeAsync: approveUsdt } = useWriteContractHook({
    contractName: "MockUSDT",
    functionName: "approve",
    // args: ["_spender market address", formData.totalCost],
    args: [marketContractAddress, , formData.fee],
  });

  const { data: allowanceTokenData, isLoading: isLoadingAllowanceToken } =
    useReadContractHook({
      contractName: "KolektivaToken",
      functionName: "allowance",
      contractAddress: tokenContractAddress,
      // args: [address, "_spender market address"],
      args: [address, marketContractAddress],
    });

  const { writeAsync: approveToken } = useWriteContractHook({
    contractName: "KolektivaToken",
    functionName: "approve",
    contractAddress: tokenContractAddress,
    // args: ["_spender market address", formData.totalCost],
    args: [marketContractAddress, , formData.qtyToken],
  });

  const allowanceUsdt = useMemo(
    () => (allowanceUsdtData ? Number(allowanceUsdtData) : 0),
    [allowanceUsdtData]
  );

  const allowanceToken = useMemo(
    () => (allowanceTokenData ? Number(allowanceTokenData) : 0),
    [allowanceTokenData]
  );

  const buttonText = useMemo(() => {
    if (isLoadingAllowanceUsdt && isLoadingAllowanceToken) return "Loading...";
    if (allowanceUsdt >= formData.fee && allowanceToken >= formData.qtyToken)
      return "Submit Order";
    if (allowanceToken < formData.qtyToken)
      return `Approve ${formData.qtyToken} Token`;
    return `Approve ${formData.fee} USDT`;
  }, [
    isLoadingAllowanceUsdt,
    isLoadingAllowanceToken,
    allowanceUsdt,
    allowanceToken,
    formData.fee,
    formData.qtyToken,
  ]);

  const handleButtonClick = async () => {
    try {
      if (allowanceToken < formData.qtyToken) {
        // If KolektivaToken allowance is insufficient, approve it first
        await approveToken();
        console.log("Approve KolektivaToken");
      } else if (allowanceUsdt < formData.fee) {
        // If USDT allowance is insufficient, approve it next
        await approveUsdt();
        console.log("Approve USDT");
      } else {
        // Both allowances are sufficient, proceed with order submission
        console.log("Submit Order");
        // Add your order submission logic here
      }
    } catch (error) {
      console.error("Action failed", error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-2xl font-bold text-teal-950">
            Preview your order
          </h2>
          <p className="text-lg text-zinc-700">
            Jl Pinangsia Raya Komplek Glodok Plaza Bl B-22
          </p>
          <p className="text-lg text-zinc-500">DKI Jakarta</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 shadow-md rounded-2xl p-4">
        {formData?.type === "limit" && (
          <>
            <div className="flex justify-between items-center">
              <p className="text-base text-zinc-500">Limit price per token</p>
              <p className="text-base font-bold text-teal-950">
                {formData.pricePerToken} USD
              </p>
            </div>
          </>
        )}
        <Divider className="border-zinc-200 !m-0" />
        <div className="flex justify-between items-center">
          <p className="text-base text-zinc-500">Property token quantity</p>
          <p className="text-base text-zinc-500">
            <span className="text-base font-bold text-teal-950">
              {formData?.qtyToken}
            </span>{" "}
            Token{"(s)"}
          </p>
        </div>
        {formData?.type === "market" && (
          <>
            <Divider className="border-zinc-200 !m-0" />
            <div className="flex justify-between items-center">
              <p className="text-base text-zinc-500">Estimated total price</p>
              <p className="text-base font-bold text-teal-950">
                {formData.totalProceeds} USD
              </p>
            </div>
          </>
        )}
        {formData?.type === "limit" && (
          <>
            <Divider className="border-zinc-200 !m-0" />
            <div className="flex justify-between items-center">
              <p className="text-base text-zinc-500">Order Expiration</p>
              <p className="text-base font-bold text-teal-950">
                {formData.orderExpiration} Days
              </p>
            </div>
          </>
        )}
        <Divider className="border-zinc-200 !m-0" />
        <div className="flex justify-between items-center">
          <p className="text-base text-zinc-500">Fees</p>
          <p className="text-base font-bold text-teal-950">
            {formData.fee} USD
          </p>
        </div>
      </div>
      {/* mark test */}
      {/* <div>
        <button onClick={handleButtonClick}>{buttonText}</button>
      </div> */}
      {/* mark test */}
    </div>
  );
};

export default SellStep2;
