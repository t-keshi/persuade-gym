import { useState } from "react";

import { createCtx } from "./createCtx";

import type { Message } from "ai";


const [LocationStateProvider, useLocationState] = createCtx<
  [{ messages: Message[] }, (messages: { messages: Message[] }) => void]
>({
  contextName: "locationState",
});

type Props = {
  children: React.ReactNode;
};

export const MessageLocationStateProvider: React.FC<Props> = ({ children }) => {
  const [state, setState] = useState<{ messages: Message[] }>({ messages: [] });
  const setLocationState = (messages: { messages: Message[] }) => {
    setState(messages);
  };

  return (
    <LocationStateProvider value={[state, setLocationState]}>
      {children}
    </LocationStateProvider>
  );
};

export const useMessageLocationState = useLocationState;
