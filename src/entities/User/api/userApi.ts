import { rtkApi } from '@/shared/api/rtkAPI';
import { User } from '../model/types/user';
import { JsonSettings } from '@/entities/User/model/types/jsonSettings';
interface SetJsonSettings {
    userId: string;
    jsonSettings: JsonSettings;
}
export const userApi = rtkApi.injectEndpoints({
    //что делаем получаем или мутируем или создаем
    endpoints: (build) => ({
        setJsonSettings: build.query<User, SetJsonSettings>({
            query: ({ userId, jsonSettings }) => ({
                url: '/users/' + userId,
                method: 'PATCH', // метод частичного обновления данных
                body: {
                    jsonSettings, // в боди передаем объект обновления
                },
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
