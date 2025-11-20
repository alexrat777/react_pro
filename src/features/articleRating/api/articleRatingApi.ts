import { rtkApi } from '@/shared/api/rtkAPI';
import { Rating } from '@/entities/Rating';

interface GetArticleRatingArg {
    userId:string,
    articleId:string
}
interface RateArticleArg {
    userId:string,
    articleId:string,
    rate:number;
    feedback?:string;
}
const articleRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        // получение данных
        // Rating[] - тип того что получим с бека, { userID:number, articleId:number } - тип аргументов для запроса на бэк
        getArticleRating: build.query<Rating[], GetArticleRatingArg>({
            query: ({ userId, articleId }) => ({
                url: '/article-ratings',
                params: {
                    userId,
                    articleId,
                },
            }),
        }),
        // запись мутация данных тип отправляемых данных
        reteArticle: build.mutation<void, RateArticleArg>({
            query: (arg) => ({
                url: '/article-ratings',
                method: 'POST',
                body: arg,
            }),
        }),
    }),
});
export const useGetArticleRating = articleRatingApi.useGetArticleRatingQuery;
export const useRateArticle = articleRatingApi.useReteArticleMutation;
