import { useCallback, useRef } from 'react';

export function useThrottle(callback: (...args: any[]) => void, delay: number) {
    const throttleRef = useRef(false); // инициируем флаг запуска следующего
    return useCallback(
        (...args: any[]) => {
            // отрабатывает только когда флаг false иначе ничего не делаем
            if (!throttleRef.current) {
                callback(...args);
                throttleRef.current = true; // выставляем флаг true что б больше не запускалось
                setTimeout(() => {
                    throttleRef.current = false; // с задержкой dalay выставляем флаг false
                }, delay);
            }
        },
        [callback, delay],
    );
}
