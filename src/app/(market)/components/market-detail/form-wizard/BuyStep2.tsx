"use client";

import { BuyOrderData } from "@/types/order";
import { useReadContractHook, useWriteContractHook } from "@/utils/hooks";
import { Divider } from "antd";
import { useMemo } from "react";
import { useActiveAccount } from "thirdweb/react";

interface BuyStep2Props {
  isAfterMarketTrading: boolean;
  formData: BuyOrderData;
}

const BuyStep2: React.FC<BuyStep2Props> = ({
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
      args: [address, "0xb57e0dbc847bdd098838bf67646c381d5500d8cf"],
    });

  const { writeAsync: approveUsdt } = useWriteContractHook({
    contractName: "MockUSDT",
    functionName: "approve",
    // args: ["_spender market address", formData.totalCost],
    args: ["0xb57e0dbc847bdd098838bf67646c381d5500d8cf", formData.totalCost],
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
          <p className="text-lg text-zinc-700">
            Jl Pinangsia Raya Komplek Glodok Plaza Bl B-22
          </p>
          <p className="text-lg text-zinc-500">DKI Jakarta</p>
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
          <p className="text-base font-bold text-teal-950">50,00 USD</p>
        </div>
        <Divider className="border-zinc-200 !m-0" />
        <div className="flex justify-between items-center">
          <p className="text-base text-zinc-500">Fees</p>
          <p className="text-base font-bold text-teal-950">0,11 USD</p>
        </div>
      </div>
      {/* mark test */}
      <div>
        <button onClick={handleButtonClick}>{buttonText}</button>
      </div>
      {/* mark test */}
    </div>
  );
};

export default BuyStep2;
