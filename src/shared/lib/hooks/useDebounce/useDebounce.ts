import { MutableRefObject, useCallback, useRef } from 'react';
/**
 * Хук, который позволяет отменять предыдущий вызов функции пока не истечет delay
 * @param callback
 * @param delay - задержка в мс
 */
export function useDebounce(callback: (...args:any[])=>void, delay:number) {
    const timer = useRef() as MutableRefObject<any>; // таймер

    return useCallback((...args:any[]) => {
        if (timer.current) clearTimeout(timer.current); // условие по которому таймер перезапускается если хук запустился
        timer.current = setTimeout(() => { // в таймер добавляется запуск колбека, который запуститься, когда таймер закончится. и только тогда выполнятся калбек
            callback(...args);
        }, delay);
    }, [callback, delay]);
}
