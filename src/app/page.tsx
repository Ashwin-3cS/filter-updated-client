'use client'

import "@farcaster/auth-kit/styles.css";
import { AuthKitProvider } from "@farcaster/auth-kit";
import Head from "next/head";

import Navbar from "./components/Navbar/Navbar";

const config = {
  relay: "https://relay.farcaster.xyz",
  rpcUrl: "https://mainnet.optimism.io",
  siweUri: "https://filterapp.fun",
  domain: "filterapp.fun",
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Filter Client</title>
      </Head>
      <main style={{ fontFamily: "Inter, sans-serif" }}>
        <AuthKitProvider config={config}>
          <Navbar/>  
        </AuthKitProvider>
      </main>
    </>
  );
}