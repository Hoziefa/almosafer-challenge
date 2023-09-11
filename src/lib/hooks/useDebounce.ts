import { useEffect, useState } from 'react';

export const useDebounce = (currentValue: string, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(currentValue);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(currentValue), delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [currentValue, delay]);

  return debouncedValue;
};
