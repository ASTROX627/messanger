import { useEffect, useRef } from "react";

const usePrevios = <T>(value: T): T | undefined => {
  const ref = useRef<T |undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  })

  return ref.current
}

export default usePrevios;