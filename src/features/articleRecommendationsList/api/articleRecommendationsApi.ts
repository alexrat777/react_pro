import { rtkApi } from '@/shared/api/rtkAPI';
import { Article } from '@/entities/Article';

const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendationList: build.query<Article[], number>({
            query: (limit) => ({
                url: '/articles',
                params: {
                    _limit: limit,
                    _expand: 'user',
                },
            }),
        }),
    }),
});
export const useArticleRecommendationsList =
    recommendationsApi.useGetArticleRecommendationListQuery;
