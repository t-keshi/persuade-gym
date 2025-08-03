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
  const [shouldComplete, setShouldComplete] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // onCompleteを別のuseEffectで呼び出す
  useEffect(() => {
    if (shouldComplete && onCompleteRef.current) {
      onCompleteRef.current();
      setShouldComplete(false);
    }
  }, [shouldComplete]);

  useEffect(() => {
    if (!enabled) {
      setCount(initialCount);
      setIsActive(false);
      setShouldComplete(false);
      return;
    }

    setIsActive(true);
    setCount(initialCount);

    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(interval);
          // 直接呼び出す代わりにフラグを設定
          setShouldComplete(true);
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
