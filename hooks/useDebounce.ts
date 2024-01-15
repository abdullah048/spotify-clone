import { useEffect, useState } from 'react';

const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedString, setDebouncedString] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedString(value);
    }, delay || 700);

    return () => {
      clearTimeout(timer);
    };
  }, [delay, value]);

  return debouncedString;
};

export default useDebounce;
