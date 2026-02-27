import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddCommentFormSchema } from '../types/addCommentForm';

const initialState: AddCommentFormSchema = {
    error: '',
    text: '',
};
export const addCommentsFormSlice = createSlice({
    name: 'addCommentsForm',
    initialState,
    reducers: {
        setText: (
            state: AddCommentFormSchema,
            action: PayloadAction<string>,
        ) => {
            state.text = action.payload;
        },
    },
    // для асинхронного редюсера
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(loginByUsername.pending, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(loginByUsername.fulfilled, (state) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(loginByUsername.rejected, (state, action) => {
    //             state.error = action.payload;
    //             state.isLoading = false;
    //         });
    // },
});

// Action creators are generated for each case reducer function
export const { actions: addCommentsFormActions } = addCommentsFormSlice;
export const { reducer: addCommentsFormReducer } = addCommentsFormSlice;
