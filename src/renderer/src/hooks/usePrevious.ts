import { useEffect, useRef } from 'react';

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  
  // Store current value in ref after the render is complete
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  // Return the value from the *previous* render
  return ref.current;
}