import { CounterSchema } from 'entities/Counter/model/types/counterSchema';
import { Counter } from './ui/Counter';
import { counterReducer } from './model/slice/counterSlice';

export {
    CounterSchema,
    counterReducer,
    Counter,
};
