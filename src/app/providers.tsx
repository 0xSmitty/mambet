'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { config } from '@/wagmi';
import { CustomAvatar } from './components/Custom/CustomAvatar';

export function Providers(props: { children: ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      }
    }
  });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient} >
        <RainbowKitProvider avatar={CustomAvatar}>
          {props.children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
