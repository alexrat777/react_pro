import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '@/entities/Profile';

export const fetchProfileData = createAsyncThunk<
    Profile,
    string,
    ThunkConfig<string>
>(
    'profile/fetchProfileData',
    async (profileID, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;
        try {
            if (!profileID) {
                throw new Error('No profile ID');
            }
            const response = await extra.api.get<Profile>(`/profile/${profileID}`);
            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error'); // rejectValue:string
        }
    },
);
