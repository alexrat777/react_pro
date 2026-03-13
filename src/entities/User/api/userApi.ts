import { rtkApi } from '@/shared/api/rtkAPI';
import { User } from '../model/types/user';
import { JsonSettings } from '../model/types/jsonSettings';

interface SetJsonSettingsArg {
    userId: string;
    jsonSettings: JsonSettings;
}
export const userApi = rtkApi.injectEndpoints({
    // что делаем получаем или мутируем или создаем
    endpoints: (build) => ({
        setJsonSettings: build.mutation<User, SetJsonSettingsArg>({
            query: ({ userId, jsonSettings }) => ({
                url: `/users/${userId}`,
                method: 'PATCH', // метод частичного обновления данных
                body: {
                    jsonSettings, // в боди передаем объект обновления
                },
            }),
        }),
        // запрос подгружающий данные по id gjkmpjdfntkz
        getUserDataById: build.query<User, string>({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: 'GET', // метод чтения
            }),
        }),
    }),
});
// ручной способ работы с данными без хуков
export const setJsonSettingsMutation =
    userApi.endpoints.setJsonSettings.initiate;
// экспортирует  обработку:  query: ({ userId, jsonSettings }) => ({
//     url: '/users/' + userId,
//     method: 'PATCH', // метод частичного обновления данных
//     body: {
//         jsonSettings, // в боди передаем объект обновления
//     },
// }),

export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate; // ссылка на getUserDataById
