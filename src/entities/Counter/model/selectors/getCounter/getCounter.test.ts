import { getCounter } from 'entities/Counter/model/selectors/getCounter/getCounter';
import { StateSchema } from 'app/providers/StoreProvider';

describe('getCounter()', () => {
    test('should return the correct counter', () => {
        // Задает часть стейта DeepPartial
        const state: DeepPartial<StateSchema> = {
            counter: { value: 10 },
        };
        expect(getCounter(state as StateSchema)).toEqual({ value: 10 });
    });
});
