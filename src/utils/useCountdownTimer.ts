import { useEffect, useRef, useState } from "react";

interface UseCountdownTimerOptions {
  initialCount: number;
  onComplete?: () => void;
  enabled?: boolean;
}

export const useCountdownTimer = ({
  initialCount,
  onComplete,
  enabled = false,
}: UseCountdownTimerOptions) => {
  const [count, setCount] = useState(initialCount);
  const [isActive, setIsActive] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!enabled) {
      setCount(initialCount);
      setIsActive(false);
      return;
    }

    setIsActive(true);
    setCount(initialCount);

    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(interval);
          if (onCompleteRef.current) {
            onCompleteRef.current();
          }
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [enabled, initialCount]);

  return { count, isActive };
};
