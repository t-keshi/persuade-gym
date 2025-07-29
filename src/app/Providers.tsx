"use client";

import { enableMocking } from "@/test/mocks/enableMocking";
import { MessageLocationStateProvider } from "@/utils/messageLocationState";
import React from "react";

type Props = { children: React.ReactNode };

let triggered = false;

export const MockProvider: React.FC<Props> = ({ children }) => {
  if (!triggered) {
    triggered = true;
    enableMocking();
  }

  return children;
};

export const Providers: React.FC<Props> = ({ children }) => {
  return (
    <MockProvider>
      <MessageLocationStateProvider>{children}</MessageLocationStateProvider>
    </MockProvider>
  );
};
