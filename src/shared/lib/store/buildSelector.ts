import { useSelector } from 'react-redux';
import { StateSchema } from '@/app/providers/StoreProvider';

type Selector<T> = (state: StateSchema) => T;
type Result<T> = [() => T, Selector<T>];
export function buildSelector<T>(selector: Selector<T>): Result<T> {
    // создаем хук который внутри себя selector оборачивает в useSelector - что бы избавиться от useSelector везде в коде
    const useSelectorHook = () => {
        return useSelector(selector); // возвращаем результат работы хука useSelector
    };
    return [useSelectorHook, selector]; // возвращает хук useSelectorHook и селектор
}
