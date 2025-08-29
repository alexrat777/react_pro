import { userActions } from 'entity/User';
import { TestAsyncThunk } from 'shared/lib/helpers/tests/TestAsyncThunk/TestAsyncThunk';
import { Country } from 'entity/Country';
import { Currency } from 'entity/Currency';
import { fetchProfileData } from './fetchProfileData';

describe('fetchProfileData.test', () => {
    test('success fetch ProfileData', async () => {
        const userValue = { username: '123', id: '1' };
        const data = {
            username: 'admin',
            age: 22,
            country: Country.Kazakhstan,
            lastname: 'lastname',
            first: 'firstname',
            city: 'city',
            currency: Currency.RUB,
        };
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ data })); // мокаем данные с сервера
        const result = await thunk.callThunk();
        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });

    test('error login', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk();
        expect(result.meta.requestStatus).toBe('rejected');
    });
});
