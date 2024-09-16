"use client";

import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { Image as ImageType } from "@/types/property";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRouter } from "next/navigation";

interface MarketDetailPhotosMobileProps {
  images: ImageType[];
}

const MarketDetailPhotosMobile: React.FC<MarketDetailPhotosMobileProps> = ({
  images,
}) => {
  const router = useRouter();

  return (
    <div className="relative">
      <button
        onClick={() => {
          router.push("/");
        }}
        className="flex items-center justify-center top-0 p-3 w-10 h-10 bg-[#F4F4F5] rounded-full absolute z-10"
      >
        <ArrowLeft size={16} weight="bold" className="text-[#000] " />
        <div className="absolute left-1/8 right-1/8 top-1/5 bottom-1/5 bg-[#3F3F46]" />
      </button>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper w-full"
      >
        {images.map((img, index) => (
          <SwiperSlide key={img.id}>
            <Image
              src={img.image}
              alt={`Market detail photo ${index + 1}`}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              className="aspect-square object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MarketDetailPhotosMobile;
