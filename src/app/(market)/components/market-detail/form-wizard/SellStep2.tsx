'use client';

import { SellOrderData } from "@/types/order";
import { Divider } from "antd";

interface SellStep2Props {
  formData: SellOrderData;
}

const SellStep2: React.FC<SellStep2Props> = ({ formData }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-2xl font-bold text-teal-950">Preview your order</h2>
          <p className="text-lg text-zinc-700">Jl Pinangsia Raya Komplek Glodok Plaza Bl B-22</p>
          <p className="text-lg text-zinc-500">DKI Jakarta</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 shadow-md rounded-2xl p-4">
        {formData?.type === 'limit' && (
          <>
            <div className="flex justify-between items-center">
              <p className="text-base text-zinc-500">Limit price per token</p>
              <p className="text-base font-bold text-teal-950">6 LSK</p>
            </div>
          </>
        )}
        <Divider className="border-zinc-200 !m-0" />
        <div className="flex justify-between items-center">
          <p className="text-base text-zinc-500">Property token quantity</p>
          <p className="text-base text-zinc-500"><span className="text-base font-bold text-teal-950">{formData?.qtyToken}</span> Token{"(s)"}</p>
        </div>
        {formData?.type === 'market' && (
          <>
            <Divider className="border-zinc-200 !m-0" />
            <div className="flex justify-between items-center">
              <p className="text-base text-zinc-500">Estimated total price</p>
              <p className="text-base font-bold text-teal-950">5,00 LSK</p>
            </div>
          </>
        )}
        {formData?.type === 'limit' && (
          <>
            <Divider className="border-zinc-200 !m-0" />
            <div className="flex justify-between items-center">
              <p className="text-base text-zinc-500">Order Expiration</p>
              <p className="text-base font-bold text-teal-950">30 Days</p>
            </div>
          </>
        )}
        <Divider className="border-zinc-200 !m-0" />
        <div className="flex justify-between items-center">
          <p className="text-base text-zinc-500">Fees</p>
          <p className="text-base font-bold text-teal-950">0,11 LSK</p>
        </div>
      </div>
    </div>
  )
};

export default SellStep2;