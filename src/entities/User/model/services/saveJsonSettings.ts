import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { JsonSettings } from '../types/jsonSettings';
import { getUserAuthData } from '../selectors/getUserAuthData/getUserAuthData';
import { getJsonSettings } from '../selectors/jsonSettings/jsonSettings';
import { setJsonSettingsMutation } from '../../api/userApi';

export const saveJsonSettings = createAsyncThunk<
    JsonSettings,
    JsonSettings,
    ThunkConfig<string>
>('user/saveJsonSettings', async (newJsonSettings, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    // получаем данные о пользователе id и
    const userData = getUserAuthData(getState()); // селектор в него надо передать стейт
    const currentSettings = getJsonSettings(getState()); // старые данные по настройкам
    if (!userData) {
        return rejectWithValue('no userData');
    }
    try {
        // вместо аксиоса используем вызываеми напрямую мутацию
        const response = await dispatch(
            setJsonSettingsMutation({
                userId: userData.id,
                jsonSettings: {
                    ...currentSettings,
                    ...newJsonSettings,
                },
            }),
        ).unwrap(); // .unwrap()Функция в запросе RTK — этоИспользуется для доступа к необработанным данным ответа выполненного промиса или для явного генерирования ошибки в случае отклонения запроса.
        if (!response.jsonSettings) {
            return rejectWithValue('');
        }
        return response.jsonSettings;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error'); // rejectValue:string
    }
});
