import { rtkApi } from '@/shared/api/rtkAPI';
import { Rating } from '@/entity/Rating';

interface GetProfileRatingArg {
    userId:string,
    profileId:string
}
interface RateProfileArg {
    userId:string,
    profileId:string,
    rate:number;
    feedback?:string;
}
const profileRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        // получение данных
        // Rating[] - тип того что получим с бека, { userID:number, ProfileId:number } - тип аргументов для запроса на бэк
        getProfileRating: build.query<Rating[], GetProfileRatingArg>({
            query: ({ userId, profileId }) => ({
                url: '/profile-ratings',
                params: {
                    userId,
                    profileId,
                },
            }),
        }),
        // запись мутация данных тип отправляемых данных
        reteProfile: build.mutation<void, RateProfileArg>({
            query: (arg) => ({
                url: '/profile-ratings',
                method: 'POST',
                body: arg,
            }),
        }),
    }),
});
export const useGetProfileRating = profileRatingApi.useGetProfileRatingQuery;
export const useRateProfile = profileRatingApi.useReteProfileMutation;
