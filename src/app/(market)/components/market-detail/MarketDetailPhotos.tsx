import { Button } from "@chakra-ui/react";
import { ImagesSquare } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

const MarketDetailPhotos: React.FC = () => {
  return (
    <>
      <div className="flex gap-4 w-full">
        <div className="w-1/2 h-fit relative">
          <Image
            src='/images/house-1.png'
            alt="Market detail photo"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            className="aspect-square object-cover rounded-lg"
          />
          <div className="absolute bottom-4 left-4 z-10">
            <Button colorScheme="whiteAlpha" color='black' bgColor='white' rounded="full" fontWeight='medium' fontSize='md' display='flex' gap='1' alignItems='center'>
              <ImagesSquare size={16} />
              View all photos
            </Button>
          </div>
        </div>
        <div className="w-1/2 grid grid-cols-2 gap-4">
          <Image
            src='/images/house-2.png'
            alt="Market detail photo"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            className="aspect-square object-cover rounded-lg"
          />
          <Image
            src='/images/house-3.png'
            alt="Market detail photo"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            className="aspect-square object-cover rounded-lg"
          />
          <Image
            src='/images/house-4.png'
            alt="Market detail photo"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            className="aspect-square object-cover rounded-lg"
          />
          <Image
            src='/images/house-5.png'
            alt="Market detail photo"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            className="aspect-square object-cover rounded-lg"
          />
        </div>
      </div>
    </>
  )
}

export default MarketDetailPhotos;