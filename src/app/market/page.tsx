import { Image } from "@chakra-ui/react";
import FilterBar from "./components/FilterBar";

export default function Home() {
  return (
    <div>
      <div className="flex flex-row items-center justify-center gap-2.5    bg-[#042F2E]">
        <div className="flex flex-row justify-start items-center p-16 px-3 gap-3  w-[1238px] max-w-[1238px]  bg-[#042F2E]">
          <div className="flex-col  max-w-[600px]">
            <p className=" text-4xl font-bold text-white leading-[40px]">
              Buy property ownership starting from IDR 250,000
            </p>
            <p className="  text-base font-normal text-[#14B8A6] leading-[18px]">
              Property investment that affordable and easy, start having your
              passive income now!
            </p>
          </div>
          <div className="ml-auto">
            <Image src="/images/Market_Img.png" alt="Building" />
          </div>
        </div>
      </div>
      <FilterBar />
    </div>
  );
}
