import { buildSelector } from '@/shared/lib/store';
import { StateSchema } from '@/app/providers/StoreProvider';
// пример реселекта
// export const getCounterValue = createSelector(
//     getCounter,
//     (counter) => counter.value,
// );
// useCounterValue - это переданная функция селектор (state:StateSchema) => state.counter
export const [useCounterValue, getCounterValue] = buildSelector(
    (state: StateSchema) => state.counter,
);
