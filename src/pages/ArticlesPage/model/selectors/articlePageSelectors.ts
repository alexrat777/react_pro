import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleView } from 'entity/Article';

export const getArticlePageError = (state:StateSchema) => state.articlesPage?.error;
export const getArticleIsLoading = (state:StateSchema) => state.articlesPage?.isLoading || false;
export const getArticleView = (state:StateSchema) => state.articlesPage?.view || ArticleView.SMALL;
