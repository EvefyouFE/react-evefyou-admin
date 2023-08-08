import { useEffect, useRef } from "react";

export function usePrevState<T>(data: T) {
  const prevRef = useRef<T | null>(null)

  useEffect(() => {
    compare()
  })

  function compare() {
    prevRef.current && console.log('compare...', prevRef.current, data, Object.is(prevRef.current, data))
    prevRef.current = data
  }
}