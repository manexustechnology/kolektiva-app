"use client";

import { SellOrderData } from "@/types/order";
import { useReadContractHook, useWriteContractHook } from "@/utils/hooks";
import { getTransactionInfo } from "@/app/api/tx-info";

import { Divider } from "antd";
import { useMemo } from "react";
import { useActiveAccount } from "thirdweb/react";
import { PropertyData } from "@/types/property";
import { formatUSDTBalance } from "@/utils/formatter";

interface SellStep2Props {
  propertyData: PropertyData;
  formData: SellOrderData;
}

const SellStep2: React.FC<SellStep2Props> = ({ propertyData, formData }) => {
  const activeAccount = useActiveAccount();
  const address = activeAccount?.address;

  const { data: allowanceUsdtData, isLoading: isLoadingAllowanceUsdt } =
    useReadContractHook({
      contractName: "MockUSDT",
      functionName: "allowance",
      // args: [address, "_spender market address"],
      args: [address, propertyData.marketAddress],
    });

  const { writeAsync: approveUsdt } = useWriteContractHook({
    contractName: "MockUSDT",
    functionName: "approve",
    // args: ["_spender market address", formData.totalCost],
    args: [propertyData.marketAddress, , formData.fee],
  });

  const { data: allowanceTokenData, isLoading: isLoadingAllowanceToken } =
    useReadContractHook({
      contractName: "KolektivaToken",
      functionName: "allowance",
      contractAddress: propertyData.tokenAddress,
      // args: [address, "_spender market address"],
      args: [address, propertyData.marketAddress],
    });

  const { writeAsync: approveToken } = useWriteContractHook({
    contractName: "KolektivaToken",
    functionName: "approve",
    contractAddress: propertyData.tokenAddress,
    // args: ["_spender market address", formData.totalCost],
    args: [propertyData.marketAddress, , formData.qtyToken],
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
          <p className="text-lg text-zinc-700">{propertyData.address}</p>
          <p className="text-lg text-zinc-500">{propertyData.city}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 shadow-md rounded-2xl p-4">
        {formData?.type === "limit" && (
          <>
            <div className="flex justify-between items-center">
              <p className="text-base text-zinc-500">Limit price per token</p>
              <p className="text-base font-bold text-teal-950">
                {formatUSDTBalance(formData.pricePerToken)} USDT
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
                {formatUSDTBalance(formData.totalProceeds)} USDT
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
            {formatUSDTBalance(formData.fee)} USDT
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
