import { UserRole } from '../const/userConst';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { JsonSettings } from '@/entities/User/model/types/jsonSettings';

export interface User {
    id: string;
    username: string;
    avatar?: string;
    role?: UserRole[];
    features?: FeatureFlags;
    jsonSettings?: JsonSettings;
}

export interface UserSchema {
    authData?: User;
    _inited: boolean;
}
