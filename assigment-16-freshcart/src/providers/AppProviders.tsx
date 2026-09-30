"use client";

import { Toaster } from "sonner";
import StoreProvider from "@/store/StoreProvider";
import QueryProvider from "./QueryProvider";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <QueryProvider>
        {children}
        <Toaster position="top-center" richColors closeButton />
      </QueryProvider>
    </StoreProvider>
  );
}
