import { rtkApi } from 'shared/api/rtkAPI';

const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendationList: build.query({
            query: (limit) => ({
                url: '/articles',
                params: {
                    _limit: limit,
                },
            }),
        }),
    }),
});
export const useArticleRecommendationsList = recommendationsApi.useGetArticleRecommendationListQuery;
