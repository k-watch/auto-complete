import { useState, useEffect } from 'react';

let timer: NodeJS.Timeout | null = null;

export const useDebounce = <T>(
  callback: () => void,
  value: T,
  delay: number
) => {
  useEffect(() => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      callback();
    }, delay);
  }, [value]);
};
