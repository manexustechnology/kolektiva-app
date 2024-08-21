"use client";

import { BuyOrderData } from "@/types/order";
import { useReadContractHook, useWriteContractHook } from "@/utils/hooks";
import { getTransactionStatus } from "@/app/api/tx-hash";
import { Divider } from "antd";
import { useMemo } from "react";
import { useActiveAccount } from "thirdweb/react";
import { PropertyData } from "@/types/property";
import { formatUSDTBalance } from "@/utils/formatter";

interface BuyStep2Props {
  propertyData: PropertyData;
  isAfterMarketTrading: boolean;
  formData: BuyOrderData;
}

const BuyStep2: React.FC<BuyStep2Props> = ({
  propertyData,
  isAfterMarketTrading,
  formData,
}) => {
  const activeAccount = useActiveAccount();
  const address = activeAccount?.address;

  const { data: allowanceData, isLoading: isLoadingAllowance } =
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
    args: [propertyData.marketAddress, formData.totalCost],
  });

  const allowance = useMemo(
    () => (allowanceData ? Number(allowanceData) : 0),
    [allowanceData]
  );

  const buttonText = useMemo(() => {
    if (isLoadingAllowance) return "Loading...";
    if (allowance >= formData.totalCost) return "Submit Order";
    return `Approve ${formData.totalCost} USDT`;
  }, [isLoadingAllowance, allowance, formData.totalCost]);

  const handleButtonClick = async () => {
    if (allowance < formData.totalCost) {
      try {
        await approveUsdt(); // Call approve function here
        console.log("Approve USDT");
      } catch (error) {
        console.error("Approval failed", error);
      }
    } else {
      // Handle submit order logic here
      console.log("Submit Order");
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
        <div className="flex justify-between items-center">
          <p className="text-base text-zinc-500">Property token quantity</p>
          <p className="text-base text-zinc-500">
            <span className="text-base font-bold text-teal-950">
              {formData?.qtyToken}
            </span>{" "}
            Token{"(s)"}
          </p>
        </div>
        <Divider className="border-zinc-200 !m-0" />
        <div className="flex justify-between items-center">
          <p className="text-base text-zinc-500">Price per token</p>
          <p className="text-base font-bold text-teal-950">
            {formatUSDTBalance(formData.pricePerToken)} USDT
          </p>
        </div>
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

export default BuyStep2;
