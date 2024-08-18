import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

interface ProviderProps {
  children: React.ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
};


export default Provider;
