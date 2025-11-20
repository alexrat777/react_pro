// сделано на основе https://redux-toolkit.js.org/api/createEntityAdapter    делаем адаптер для нормализации
import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import {
    Article, ArticleSortField, ArticleType, ArticleView,
} from '@/entities/Article';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { SortOrder } from '@/shared/types/sort';
import { ArticlesPageSchema } from '../../model/types/ArticlesPageSchema';
import { fetchArticleList } from '../services/fetchArticleList/fetchArticleList';

const articlesAdapter = createEntityAdapter<Article>({

    selectId: (article) => article.id,
});
// селектор для работы с EntityAdapter
export const getArticles = articlesAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articlesAdapter.getInitialState(),
);
const articlePageSlice = createSlice({
    name: 'articlesPageSlice',
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
            sort: ArticleSortField.CREATED,
            search: '',
            order: 'asc',
            type: ArticleType.ALL,
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
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload;
        },
        setSort: (state, action: PayloadAction<ArticleSortField>) => {
            state.sort = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setType: (state, action: PayloadAction<ArticleType>) => {
            state.type = action.payload;
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
            .addCase(fetchArticleList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                if (action.meta.arg.replace) {
                    articlesAdapter.removeAll(state);
                }
            })
            .addCase(
                fetchArticleList.fulfilled,
                (state, action) => { // action:PayloadAction<Article[]> - убрали что б к meta доступ получить
                    state.isLoading = false;
                    // addMany для добавления в конец для безконечного скролла
                    if (state.limit) state.hasMore = action.payload.length >= state.limit;
                    // тут меняем если адаптел с state.data = action.payload на setAll
                    if (action.meta.arg.replace) {
                        articlesAdapter.setAll(state, action.payload);
                    } else {
                        articlesAdapter.addMany(state, action.payload);
                    }
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
