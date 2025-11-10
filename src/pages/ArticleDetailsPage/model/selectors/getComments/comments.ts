import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleDetailsCommentsErrors = (state: StateSchema) => {
    return state.articleDetailsPage?.comments?.error;
};
export const getArticleDetailsCommentsIsLoadings = (state: StateSchema) => {
    return state.articleDetailsPage?.comments.isLoading;
};
