import {
    createClient,
    defaultChains,
    configureChains,
} from 'wagmi'

import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const infuraId = "61e4f78a7e1249f89f01def30db4c551"

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
    infuraProvider({ infuraId }),
    publicProvider(),
])

export const useWagmiClient = () => {
    // Set up client
    const client = createClient({
        autoConnect: true,
        connectors: [
            new MetaMaskConnector({ chains }),
            new CoinbaseWalletConnector({
                chains,
                options: {
                    appName: 'wagmi',
                },
            }),
            new WalletConnectConnector({
                chains,
                options: {
                    qrcode: true,
                },
            }),
            new InjectedConnector({
                chains,
                options: {
                    name: 'Injected',
                    shimDisconnect: true,
                },
            }),
        ],
        provider,
        webSocketProvider,
    })
    return client
}
