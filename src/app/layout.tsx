import '@/styles/globals.css';
import Navbar from './components/Navbar/Navbar';
import { AuthKitProvider } from '@farcaster/auth-kit';
import Provider from './components/Provider/Provider';
import React, { createContext } from 'react';


export const metadata = {
    title: "Filter",
    description: "filter-client"
};

interface RootLayoutProps {
    children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
    // const config = {
    //     relay: "https://relay.farcaster.xyz",
    //     rpcUrl: "https://mainnet.optimism.io",
    //     siweUri: "https://filterapp.fun",
    //     domain: "filterapp.fun",
    // };

    return (
        <html lang="en">
            <head>
                <meta name="description" content={metadata.description} />
            </head>
            <body>
                {/* <Provider>
                    <AuthKitProvider config={config}> */}
                        <Navbar />
                        <main>{children}</main>
                    {/* </AuthKitProvider>
                </Provider> */}
            </body>
        </html>
    );  
}

export default RootLayout;
