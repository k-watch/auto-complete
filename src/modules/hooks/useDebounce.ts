import { useEffect } from 'react';

let timer: NodeJS.Timeout | null = null;

export const useDebounce = <T>(
  callback: () => void,
  value: T,
  delay: number = 1000
) => {
  useEffect(() => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      callback();
    }, delay);
  }, [value]);
};
