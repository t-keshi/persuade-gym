import { useEffect, useState } from "react";

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
          if (onComplete) {
            onComplete();
          }
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [enabled, initialCount, onComplete]);

  return { count, isActive };
};
