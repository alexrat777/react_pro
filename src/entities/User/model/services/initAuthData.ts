import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserDataByIdQuery } from '../../api/userApi';
import { User } from '../types/user';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
// ассинхронный запрос Thunk для инициализации данных о залогиненом пользователе
export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
    'user/initAuthData',
    async (newJsonSettings, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI;
        const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);

        if (!userId) {
            return rejectWithValue('no userId');
        }
        try {
            // вместо аксиоса используем вызываеми напрямую мутацию
            const response = await dispatch(
                getUserDataByIdQuery(userId),
            ).unwrap(); // .unwrap()Функция в запросе RTK — этоИспользуется для доступа к необработанным данным ответа выполненного промиса или для явного генерирования ошибки в случае отклонения запроса.

            return response; // user
        } catch (e) {
            console.log(e);
            return rejectWithValue('error'); // rejectValue:string
        }
    },
);
