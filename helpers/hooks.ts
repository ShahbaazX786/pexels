import { useRef, useCallback } from 'react';

function useDebounce(callback: Function, delay: number) {
    const timerRef = useRef(null);

    const debouncedCallback = useCallback((...args: any) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            callback(...args);
        }, delay) as any;
    }, [callback, delay]);

    return debouncedCallback;
}

export default useDebounce;

