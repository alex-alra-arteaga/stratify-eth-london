"use client";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

const AuthProvider = ({ children }: { children: React.ReactNode }) => (
  <DynamicContextProvider
    settings={{
      environmentId: process.env["NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID"]!,
      walletConnectors: [EthereumWalletConnectors],
    }}
  >
    {children}
  </DynamicContextProvider>
);

export default AuthProvider;
