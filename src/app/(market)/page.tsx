import { Image } from '@chakra-ui/react';
import { Metadata } from 'next';
import PropertyListings from './components/PropertyListings';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Kolektiva',
  description: 'Democratizing Real Estate Investment',
};

export default function Home() {
  return (
    <Suspense>
      <div>
        <div className="flex flex-row items-center justify-center gap-2.5 bg-[#042F2E]">
          <div className="flex flex-row justify-start items-center pt-[16px] gap-3 w-[1238px] max-w-[1238px] bg-[#042F2E]">
            <div className="flex-col  max-w-[600px]">
              <p className=" text-4xl font-bold text-white leading-[40px]">
                Get property ownership starting from $50!
              </p>
              <p className="  text-base font-normal text-[#14B8A6] leading-[18px]">
                Property investment made easy and affordable, start having your
                passive income & appraisal value on property asset now!
              </p>
            </div>
            <div className="ml-auto">
              <Image src="/images/Market_Img.png" alt="Building" />
            </div>
          </div>
        </div>
        <PropertyListings />
      </div>
    </Suspense>
  );
}
