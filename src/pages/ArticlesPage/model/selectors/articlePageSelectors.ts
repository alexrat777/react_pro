import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleView } from 'entity/Article';

export const getArticlesPageError = (state:StateSchema) => state.articlesPage?.error;
export const getArticlesPageIsLoading = (state:StateSchema) => state.articlesPage?.isLoading || false;
export const getArticlesPageView = (state:StateSchema) => state.articlesPage?.view || ArticleView.SMALL;
export const getArticlesPageLimit = (state:StateSchema) => state.articlesPage?.limit || 9;
export const getArticlesPageNum = (state:StateSchema) => state.articlesPage?.page || 1;
export const getArticlesPageHasMore = (state:StateSchema) => state.articlesPage?.hasMore;
