import {
  createContext as createReactContext,
  useContext as useReactContext,
} from "react";

type CreateContextOptions<T> = {
  contextName: string;
  defaultValue?: T;
};

export const createCtx = <T extends NonNullable<unknown> | undefined>(
  options: CreateContextOptions<T>
) => {
  const { contextName, defaultValue } = options;

  const Context = createReactContext<T | null>(defaultValue ?? null);
  Context.displayName = contextName;

  function useContext() {
    const ctx = useReactContext(Context);

    if (ctx === null) {
      const err = new Error(
        `useContext must be inside a ${contextName} Provider with a value`
      );
      err.name = "ContextError";
      Error.captureStackTrace(err, useContext);

      throw err;
    }

    return ctx;
  }

  return [Context.Provider, useContext] as const;
};
