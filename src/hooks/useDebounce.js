import { useEffect } from 'react';

export default function useDebounce(effect, dependency, delay = 300) {
  useEffect(() => {
    const timeoutId = setTimeout(effect, delay);
    return () => clearTimeout(timeoutId);
  }, [dependency]);
}
