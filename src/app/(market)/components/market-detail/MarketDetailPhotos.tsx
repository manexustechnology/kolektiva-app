import { Button } from "@chakra-ui/react";
import { ImagesSquare } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { Image as ImageType } from "@/types/property";

interface MarketDetailPhotosProps {
  images: ImageType[];
}

const MarketDetailPhotos: React.FC<MarketDetailPhotosProps> = ({ images }) => {
  return (
    <div className="flex gap-4 w-full">
      {/* Display the first image as the main photo */}
      <div className="w-1/2 h-fit relative">
        {images.length > 0 && (
          <Image
            src={images[0].image}
            alt="Market detail photo"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            className="aspect-square object-cover rounded-lg"
          />
        )}
        <div className="absolute bottom-4 left-4 z-10">
          <Button colorScheme="whiteAlpha" color='black' bgColor='white' rounded="full" fontWeight='medium' fontSize='md' display='flex' gap='1' alignItems='center'>
            <ImagesSquare size={16} />
            View all photos
          </Button>
        </div>
      </div>

      {/* Display the remaining images in a grid */}
      <div className="w-1/2 grid grid-cols-2 gap-4">
        {images.slice(1).map((img, index) => (
          <Image
            key={img.id}
            src={img.image}
            alt={`Market detail photo ${index + 1}`}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            className="aspect-square object-cover rounded-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default MarketDetailPhotos;
