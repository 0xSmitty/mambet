import { http, createConfig } from 'wagmi'
import { avalanche } from 'wagmi/chains'
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  rabbyWallet,
} from '@rainbow-me/rainbowkit/wallets';

// Connectors for wallet
const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet, rabbyWallet],
    },
  ],
  {
    appName: 'Mambet App',
    projectId: 'MAMBET-APP',
  }
);


export const config = createConfig({
  chains: [avalanche],
  connectors: connectors,
  ssr: true,
  transports: {
    [avalanche.id]: http("https://api.avax.network/ext/bc/C/rpc"),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
