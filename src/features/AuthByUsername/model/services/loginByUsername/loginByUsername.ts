import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { User, userActions } from 'entity/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

interface LoginByUsernameProps {
    username: string;
    password: string;
}
export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<string>
>(
    'login/loginByUsername',
    async (authData, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            const response = await extra.api.post<User>('/login', authData);
            if (!response.data) {
                throw new Error();
            }

            // для удаления пароля это не нужно в проде т.е. тут будет токен
            const user = response.data;
            interface User_pass {
                id: string
                username: string
                password:string
            }
            // @ts-ignore
            delete (user as User_pass).password;

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user)); // тут должен быть токен
            dispatch(userActions.setAuthData(response.data));
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error'); // rejectValue:string
        }
    },
);
