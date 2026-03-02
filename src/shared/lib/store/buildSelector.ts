import { useSelector } from 'react-redux';
import { StateSchema } from '@/app/providers/StoreProvider';

type Selector<T, Args extends any[]> = (state: StateSchema, ...args: Args) => T;
type Hook<T, Args extends any[]> = (...args: Args) => T;
type Result<T, Args extends any[]> = [Hook<T, Args>, Selector<T, Args>];
// хук для селектора и useSelectorHook
export function buildSelector<T, Args extends any[]>(
    selector: Selector<T, Args>,
): Result<T, Args> {
    // создаем хук который внутри себя selector оборачивает в useSelector - что бы избавиться от useSelector везде в коде
    const useSelectorHook: Hook<T, Args> = (...args: Args) => {
        return useSelector((state: StateSchema) => selector(state, ...args)); // возвращаем результат работы хука useSelector
    };
    return [useSelectorHook, selector]; // возвращает хук useSelectorHook и селектор
}

// до унифицирвоания

// import { useSelector } from 'react-redux';
// import { StateSchema } from '@/app/providers/StoreProvider';
//
// type Selector<T> = (state: StateSchema) => T;
// type Result<T> = [() => T, Selector<T>];
// // хук для селектора и useSelectorHook
// export function buildSelector<T>(selector: Selector<T>): Result<T> {
//     // создаем хук который внутри себя selector оборачивает в useSelector - что бы избавиться от useSelector везде в коде
//     const useSelectorHook = () => {
//         return useSelector(selector); // возвращаем результат работы хука useSelector
//     };
//     return [useSelectorHook, selector]; // возвращает хук useSelectorHook и селектор
// }
