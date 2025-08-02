import {
  DependencyList,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type AsyncState<T> =
  | {
      loading: boolean;
      error?: undefined;
      value?: undefined;
    }
  | {
      loading: true;
      error?: Error | undefined;
      value?: T;
    }
  | {
      loading: false;
      error: Error;
      value?: undefined;
    }
  | {
      loading: false;
      error?: undefined;
      value: T;
    };

type AsyncFnReturn<T extends FunctionReturningPromise> = [
  AsyncState<PromiseReturnType<T>>,
  T
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FunctionReturningPromise = (...args: any[]) => Promise<any>;

type PromiseReturnType<T extends FunctionReturningPromise> = Awaited<
  ReturnType<T>
>;

type UseAsyncFnOptions = {
  loading?: boolean;
};

const useAsyncFn = <T extends FunctionReturningPromise>(
  fn: T,
  deps: DependencyList = [],
  options: UseAsyncFnOptions = {}
): AsyncFnReturn<T> => {
  const lastCallId = useRef(0);
  const isMounted = useRef(true);
  const [state, setState] = useState<AsyncState<PromiseReturnType<T>>>({
    loading: options.loading ?? false,
  });

  const callback = useCallback(
    (...args: Parameters<T>) => {
      const callId = ++lastCallId.current;

      if (!state.loading) {
        setState((prevState) => ({ ...prevState, loading: true }));
      }

      return fn(...args).then(
        (value) => {
          if (isMounted.current && callId === lastCallId.current) {
            setState({ value, loading: false });
          }
          return value;
        },
        (error) => {
          if (isMounted.current && callId === lastCallId.current) {
            setState({ error, loading: false });
          }
          throw error;
        }
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  );

  return [state, callback as unknown as T];
};

export const useAsync = <T extends FunctionReturningPromise>(
  fn: T,
  deps: DependencyList = []
) => {
  const [state, callback] = useAsyncFn(fn, deps, {
    loading: true,
  });

  useEffect(() => {
    callback();
  }, [callback]);

  return state;
};
