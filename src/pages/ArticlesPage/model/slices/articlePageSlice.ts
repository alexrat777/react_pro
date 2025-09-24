// сделано на основе https://redux-toolkit.js.org/api/createEntityAdapter    делаем адаптер для нормализации
import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article, ArticleView } from 'entity/Article';
import { ArticlesPageSchema } from 'pages/ArticlesPage';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { fetchArticleList } from '../../model/services/fetchArticleList';

const articlesAdapter = createEntityAdapter<Article>({

    selectId: (article) => article.id,
});
// селектор для работы с EntityAdapter
export const getArticles = articlesAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articlesAdapter.getInitialState(),
);
const articlePageSlice = createSlice({
    name: 'articlePage',
    initialState: articlesAdapter.getInitialState<ArticlesPageSchema>(
        {
            isLoading: false,
            error: undefined,
            ids: [],
            entities: {},
            view: ArticleView.SMALL, // тут можно сразу проинициализировать из локал стораджа
            page: 1,
            hasMore: true,
            _inited: false,
        },
    ),
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload;
            localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload);
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = Number(action.payload);
        },
        initState: (state) => {
            const view = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleView;
            state.view = view;
            state.limit = view === ArticleView.BIG ? 4 : 9;
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleList.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchArticleList.fulfilled,
                (state, action:PayloadAction<Article[]>) => {
                    state.isLoading = false;
                    // addMany для добавления в конец для безконечного скролла
                    articlesAdapter.addMany(state, action.payload); // тут меняем если адаптел с state.data = action.payload на setAll
                    state.hasMore = action.payload.length > 0;
                },
            )
            .addCase(fetchArticleList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    reducer: articlePageReducer,
    actions: articlePageActions,
} = articlePageSlice;
