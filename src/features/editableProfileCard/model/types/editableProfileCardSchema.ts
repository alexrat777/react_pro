import { Profile } from '@/entities/Profile';
import { ValidateProfileError } from '../const/constProfile';

export interface ProfileSchema {
    data?: Profile;
    form?: Profile;
    isLoading?: boolean;
    error?: string;
    readonly: boolean;
    validateErrors?: ValidateProfileError[];
}
