import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleDetailsRecommendationsErrors = (state: StateSchema) => {
    return state.articleDetailsPage?.recommendations?.error;
};
export const getArticleDetailsRecommendationsIsLoadings = (state: StateSchema) => {
    return state.articleDetailsPage?.recommendations?.isLoading;
};
