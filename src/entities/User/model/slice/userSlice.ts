import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { User, UserSchema } from '../types/user';
import { setFeatureFlags } from '@/shared/lib/features';
import { saveJsonSettings } from '../services/saveJsonSettings';
import { JsonSettings } from '../types/jsonSettings';
import { initAuthData } from '../services/initAuthData';

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
            localStorage.setItem(USER_LOCALSTORAGE_KEY, action.payload.id); // тут должен быть токен
        },
        // initAuthData: (state) => {  // ненужна перешли на initAuthData на работе с бэком
        //     const jsonUser = localStorage.getItem(USER_LOCALSTORAGE_KEY);
        //     if (jsonUser) {
        //         const user = JSON.parse(jsonUser) as User;
        //         state.authData = user;
        //         setFeatureFlags(user.features);
        //     }
        //     state._inited = true;
        // },
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

        // редюсер для сохранения данных
        builder.addCase(
            initAuthData.fulfilled,
            (state, { payload }: PayloadAction<User>) => {
                state.authData = payload;
                setFeatureFlags(payload.features);
                state._inited = true;
            },
        );
        // редюсер для сохранения данных
        builder.addCase(initAuthData.rejected, (state) => {
            state._inited = true; // запрос о данных завершен
        });
    },
});

// Action creators are generated for each case reducer function
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;

// export default userSlice.reducer;
