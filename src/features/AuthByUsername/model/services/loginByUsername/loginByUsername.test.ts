import axios from 'axios';
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername';
import { Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { userActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/lib/helpers/tests/TestAsyncThunk/TestAsyncThunk';

jest.mock('axios');
const mockedAxios = jest.mocked(axios, true); /// глубокое замоканье с подхватыванием полей
describe('loginByUsername.test', () => {
//     let dispatch: Dispatch;
//     let getState: () => StateSchema;
//     beforeEach(() => {
//         dispatch = jest.fn();
//         getState = jest.fn();
//     });
    // test('success login', async () => {
    //     const userValue = { username: '123', id: '1' };
    //     mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue })); // виртуализируем результат работы аксиоса
    //     const action = loginByUsername({ username: '123', password: '123' });
    //     const result = await action(dispatch, getState, undefined);
    //     // console.log(result);
    //     expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue)); // проверка что userActions вызвался с setAuthData(userValue)
    //     expect(dispatch).toHaveBeenCalledTimes(3); // проверка что dispatch вызван 3 раза
    //
    //     expect(mockedAxios.post).toHaveBeenCalled(); // вызвался без ошибки
    //     expect(result.meta.requestStatus).toBe('fulfilled');// вызвался c  fulfilled
    //     expect(result.payload).toEqual(userValue);// возвращает пользовательские данные
    // });
    // test('login return the error', async () => {
    //     const userValue = { username: '123', id: '1' };
    //     mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
    //     const action = loginByUsername({ username: '123', password: '123' });
    //     const result = await action(dispatch, getState, undefined);
    //     // console.log(result);
    //     expect(dispatch).toHaveBeenCalledTimes(2); // проверка что dispatch вызван 2 раза
    //     expect(mockedAxios.post).toHaveBeenCalled(); // вызвался без ошибки
    //     expect(result.meta.requestStatus).toBe('rejected');// вызвался c  rejected
    //     expect(result.payload).toBe('error');// payload  = error
    // });

    test('success login', async () => {
        const userValue = { username: '123', id: '1' };
        mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue })); // виртуализируем результат работы аксиоса
        // beforeEach не нужен т.к. создаем новый объект из компонента
        const thunk = new TestAsyncThunk(loginByUsername);
        const result = await thunk.callThunk({ username: '123', password: '123' });

        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue)); // проверка что userActions вызвался с setAuthData(userValue)
        expect(thunk.dispatch).toHaveBeenCalledTimes(3); // проверка что dispatch вызван 3 раза

        expect(mockedAxios.post).toHaveBeenCalled(); // вызвался без ошибки
        expect(result.meta.requestStatus).toBe('fulfilled');// вызвался c  fulfilled
        expect(result.payload).toEqual(userValue);// возвращает пользовательские данные
    });
    test('login return the error', async () => {
        mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));

        const thunk = new TestAsyncThunk(loginByUsername);
        const result = await thunk.callThunk({ username: '123', password: '123' });

        // console.log(result);
        expect(thunk.dispatch).toHaveBeenCalledTimes(2); // проверка что dispatch вызван 2 раза
        expect(mockedAxios.post).toHaveBeenCalled(); // вызвался без ошибки
        expect(result.meta.requestStatus).toBe('rejected');// вызвался c  rejected
        expect(result.payload).toBe('error');// payload  = error
    });
});
