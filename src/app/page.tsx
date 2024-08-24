'use client'

import "@farcaster/auth-kit/styles.css";
import { AuthKitProvider } from "@farcaster/auth-kit";
import Head from "next/head";

import Content from "./components/Content/Content";

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
        <title>Farcaster AuthKit + NextAuth Demo</title>
      </Head>
      <main style={{ fontFamily: "Inter, sans-serif" }}>
        <AuthKitProvider config={config}>
          <Content/>
        </AuthKitProvider>
      </main>
    </>
  );
}