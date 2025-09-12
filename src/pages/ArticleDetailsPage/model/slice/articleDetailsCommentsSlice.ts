// сделано на основе https://redux-toolkit.js.org/api/createEntityAdapter    делаем адаптер для нормализации
import {
    createEntityAdapter,
    createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import { Comment } from 'entity/Comment';
import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleDetailsCommentsSchema } from 'pages/ArticleDetailsPage';
import { Article } from 'entity/Article';
import { fetchCommentsByArticleId } from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId';

type Book = { bookId: string; title: string }

const commentsAdapter = createEntityAdapter<Comment>({
    // Assume IDs are stored in a field other than `book.id`
    selectId: (comment) => comment.id,
});
export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
    (state) => state.articleDetailsComments || commentsAdapter.getInitialState(),
);
const articleDetailsCommentsSlice = createSlice({
    name: 'articleDetailsComments',
    initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>(
        {
            isLoading: false,
            error: undefined,
            ids: [],
            entities: {},

        },
    ),
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsByArticleId.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchCommentsByArticleId.fulfilled,
                (state, action:PayloadAction<Comment[]>) => {
                    state.isLoading = false;
                    commentsAdapter.setAll(state, action.payload); // тут меняем если адаптел с   state.data = action.payload;
                },
            )
            .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: articleDetailsCommentsReducer } = articleDetailsCommentsSlice;
