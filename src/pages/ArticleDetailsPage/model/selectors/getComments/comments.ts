import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleDetailsCommentsErrors = (state: StateSchema) => state.articleDetailsComments?.error;
export const getArticleDetailsCommentsIsLoadings = (state: StateSchema) => state.articleDetailsComments?.isLoading;
