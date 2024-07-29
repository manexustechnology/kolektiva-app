'use client';

import { Button } from "@chakra-ui/react";
import { Download } from "@phosphor-icons/react/dist/ssr";

const MarketDetailDocumentPanel: React.FC = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center rounded-2xl shadow-md p-4">
          <div className="flex flex-col">
            <p className="text-base font-medium text-zinc-700">Floor plant</p>
            <p className="text-sm text-zinc-500">floor_plant_2024.pdf</p>
          </div>
          <Button colorScheme="teal" px="4" py="2" display='flex' gap="1" rounded='full' fontWeight='medium' fontSize="sm" bgColor='teal.100' color='teal.700' _hover={{ bgColor: 'teal.200', color: 'teal.900', cursor: 'pointer' }}>
            <Download weight="fill" size={16} />
            <span>Download</span>
          </Button>
        </div>
        <div className="flex justify-between items-center rounded-2xl shadow-md p-4">
          <div className="flex flex-col">
            <p className="text-base font-medium text-zinc-700">Proposal document</p>
            <p className="text-sm text-zinc-500">proposal_2024.pdf</p>
          </div>
          <Button colorScheme="teal" px="4" py="2" display='flex' gap="1" rounded='full' fontWeight='medium' fontSize="sm" bgColor='teal.100' color='teal.700' _hover={{ bgColor: 'teal.200', color: 'teal.900', cursor: 'pointer' }}>
            <Download weight="fill" size={16} />
            <span>Download</span>
          </Button>
        </div>
      </div>
    </>
  )
}

export default MarketDetailDocumentPanel;