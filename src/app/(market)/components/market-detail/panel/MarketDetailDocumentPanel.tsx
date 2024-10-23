'use client';

import { PropertyData } from '@/types/property';
import { Button } from '@chakra-ui/react';
import {
  CheckCircle,
  Download,
  FilePdf,
  LinkSimple,
} from '@phosphor-icons/react/dist/ssr';

interface MarketDetailDocumentPanelProps {
  property: PropertyData;
}

const MarketDetailDocumentPanel: React.FC<MarketDetailDocumentPanelProps> = ({
  property,
}) => {
  const handleView = (doc: File | string) => {
    if (typeof window === 'undefined') {
      console.error(
        'window is not defined. This function cannot run on the server.',
      );
      return;
    }

    if (typeof doc === 'string') {
      window.open(doc, '_blank');
      return;
    }

    const fileURL = URL.createObjectURL(doc);
    window.open(fileURL, '_blank');

    setTimeout(() => {
      URL.revokeObjectURL(fileURL);
    }, 1000);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    const start = text.slice(0, 6);
    const end = text.slice(-6);
    return `${start}...${end}`;
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        {' '}
        {/* Documents Section */}
        <div className="flex flex-col items-start p-4 gap-5 w-full bg-white shadow-md rounded-lg">
          <p className="text-lg font-medium text-zinc-500">Documents</p>
          <div className="w-full h-px bg-zinc-200"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {property.documents.map((doc, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-center md:justify-between p-4 gap-3 bg-white shadow-md rounded-md"
              >
                <div className="flex items-center gap-3">
                  {typeof doc === 'string' ? (
                    <LinkSimple weight="bold" size={40} />
                  ) : (
                    <FilePdf weight="fill" size={40} />
                  )}
                  <span className="text-sm font-medium text-[#3F3F46]">
                    {typeof doc === 'string'
                      ? truncateText(doc, 24)
                      : truncateText(doc.id, 24)}
                  </span>
                  <CheckCircle weight="fill" color="#0D9488" />
                </div>

                <div className="md:ml-auto flex md:items-end gap-1 flex-col md:flex-row">
                  <Button
                    height="40px"
                    padding="12px 16px"
                    bg="#F4F4F5"
                    color="#3F3F46"
                    fontSize="14px"
                    fontWeight="500"
                    _focus={{ bg: 'teal.200' }}
                    _hover={{ bg: 'teal.200' }}
                    onClick={() => handleView(doc.document)}
                  >
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketDetailDocumentPanel;
