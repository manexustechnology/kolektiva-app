'use client';

import React, { useEffect, useMemo, useState } from 'react';
import MyAssetListing from './components/MyAssetListing';
import { useActiveAccount, useActiveWalletChain } from 'thirdweb/react';
import AssetOverview from './components/AssetOverview';
import { validChainIds } from '@/commons/networks';

const MyAssets: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState<boolean>(false);

  const activeAccount = useActiveAccount();
  const address = activeAccount?.address;
  const activeChain = useActiveWalletChain()!;

  useEffect(() => {
    setIsLoading(true);
    if (activeChain && validChainIds.includes(activeChain.id)) {
      setIsCorrectNetwork(true);
    } else {
      setIsCorrectNetwork(false);
    }
    setIsLoading(false);
  }, [activeChain]);

  return (
    <>
      {!activeChain && isLoading === false ? (
        <div className="flex justify-center items-center h-[60vh]">
          <p className="font-bold text-2xl leading-7 text-center text-teal-600">
            Connect to your wallet!
          </p>
        </div>
      ) : isCorrectNetwork === false ? (
        <div className="flex justify-center items-center h-[60vh]">
          <p className="font-bold text-2xl leading-7 text-center text-teal-600">
            Please change into Lisk Network!
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2.5">
          <div className="flex flex-col items-start justify-start pt-[16px] gap-3 w-[1238px] max-w-[1238px]">
            <AssetOverview />
            <MyAssetListing />
          </div>
        </div>
      )}
    </>
  );
};

export default MyAssets;
