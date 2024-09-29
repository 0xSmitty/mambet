'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useDisconnect, useAccount } from 'wagmi';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const CustomButton = () => {
  const [username, setUsername] = useState(null);
  const { disconnect } = useDisconnect();
  const accountStatus = useAccount();

  useEffect(() => {
    const fetchUsername = async () => {
      if (accountStatus?.address) {
        try {
          const response = await axios.post(`https://names.raffllrr.xyz/names`, {
            addresses: [accountStatus.address]
          });
          const usernameData = response.data[accountStatus.address];
          setUsername(usernameData.mamboName || usernameData.avvyName || null);
        } catch (error) {
          setUsername(null);
          console.error('Error fetching username:', error);
        }
      }
    };
    
    fetchUsername();
  }, [accountStatus.address]);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <div className=''>
                    <button className='bg-[#414A78] p-1 border-2 font-text text-[#f3f3f3] border-solid border-white rounded-xl hover:bg-pink-300 shadow-l shadow-blue-800/50' onClick={openConnectModal} type="button" style={{ boxShadow: "0 0.15rem 0 0 rgba(255, 255, 255, 0.2)" }}>
                      Connect Wallet
                    </button>
                  </div>
                );
              }
              if (chain.unsupported) {
                return (
                  <div className=''>
                    <button className='bg-[#414A78] p-1 border-2 border-solid border-white font-text rounded-xl hover:bg-pink-300 shadow-l shadow-blue-800/50' onClick={openChainModal} type="button" style={{ boxShadow: "0 0.15rem 0 0 rgba(255, 255, 255, 0.25)" }}>
                      Wrong network
                    </button>
                  </div>
                );
              }

              return (
                <div className='flex gap-4'>
                  <button 
                    className={`
                      flex items-center
                      bg-[#1a1a2e] 
                      border-2 border-solid border-[#4a4e69]
                      p-2 rounded-2xl
                      font-text text-lg font-semibold text-[#e0e1dd]
                      hover:bg-[#2a2a40] hover:border-[#6a6e89]
                      transition-colors duration-300
                      shadow-lg shadow-black/30
                    `}
                    onClick={openAccountModal} 
                    type="button"
                  >
                    <span className="mr-2">{username || account.displayName}</span>
                    {account.ensAvatar && <span className="mr-2">{account.ensAvatar}</span>}
                    {account.displayBalance && (
                      <span className="text-[#8d99ae]">({account.displayBalance})</span>
                    )}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};