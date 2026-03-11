import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { User, UserSchema } from '../types/user';
import { setFeatureFlags } from '@/shared/lib/features';
import { fetchArticleById } from '@/entities/Article/model/services/fechArticleById/fetchArticleById';
import { Article } from '@/entities/Article';
import { saveJsonSettings } from '@/entities/User/model/services/saveJsonSettings';
import { JsonSettings } from '@/entities/User/model/types/jsonSettings';

const initialState: UserSchema = {
    _inited: false,
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
            setFeatureFlags(action.payload.features);
        },
        initAuthData: (state) => {
            const jsonUser = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            if (jsonUser) {
                const user = JSON.parse(jsonUser) as User;
                state.authData = user;
                setFeatureFlags(user.features);
            }
            state._inited = true;
        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        },
    },
    extraReducers: (builder) => {
        // редюсер для сохранения данных
        builder.addCase(
            saveJsonSettings.fulfilled,
            (state, { payload }: PayloadAction<JsonSettings>) => {
                if (state.authData) {
                    state.authData.jsonSettings = payload;
                }
            },
        );
    },
});

// Action creators are generated for each case reducer function
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;

export default userSlice.reducer;
