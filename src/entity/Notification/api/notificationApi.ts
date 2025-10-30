import { rtkApi } from 'shared/api/rtkAPI';
import { Notification } from '../model/types/notification';

const notificationApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNotifications: build.query<Notification[], null>({
            query: () => ({
                url: '/notifications',
            }),
        }),
    }),
});
export const useNotifications = notificationApi.useGetNotificationsQuery;
