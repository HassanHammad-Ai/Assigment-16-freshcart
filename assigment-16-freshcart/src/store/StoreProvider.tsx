"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./store";
import { hydrateFromStorage } from "@/features/auth/store/auth.slice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // A lazy useState initializer (rather than a ref) creates the store exactly
  // once per app instance while staying compatible with the React Compiler.
  const [store] = useState(() => makeStore());

  useEffect(() => {
    store.dispatch(hydrateFromStorage());
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
