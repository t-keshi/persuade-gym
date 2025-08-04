import { useState } from "react";

import { createCtx } from "./createCtx";

import type { UIMessage } from "ai";

type LocationState = {
  messages: UIMessage[];
  sessionId?: string;
};

const [LocationStateProvider, useLocationState] = createCtx<
  [LocationState, (state: LocationState) => void]
>({
  contextName: "locationState",
});

type Props = {
  children: React.ReactNode;
};

export const MessageLocationStateProvider: React.FC<Props> = ({ children }) => {
  const [state, setState] = useState<LocationState>({ messages: [] });
  const setLocationState = (newState: LocationState) => {
    setState(newState);
  };

  return (
    <LocationStateProvider value={[state, setLocationState]}>
      {children}
    </LocationStateProvider>
  );
};

export const useMessageLocationState = useLocationState;
