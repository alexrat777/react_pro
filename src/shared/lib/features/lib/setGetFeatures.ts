import { FeatureFlags } from '@/shared/types/featureFlags';
import { LOCAL_STORAGE_LAST_DESIGN_THEME_KEY } from '@/shared/const/localstorage';

const defaultFeatureFlags = {
    isAppRedesigned:
        localStorage.getItem(LOCAL_STORAGE_LAST_DESIGN_THEME_KEY) === 'new',
};
// ФИЧИ НЕ МЕНЯЮТСЯ В ХОДЕ СЕССИИ, ИНАЧЕ ДЛЯ РЕАКТИВНОСТИ НАДО ДЕЛАТЬ СТЕЙТ И ХУК ПО РАБОТЕ С НИМ
let featureFlags: FeatureFlags = { ...defaultFeatureFlags };

export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
    if (newFeatureFlags) {
        featureFlags = newFeatureFlags;
    }
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
    return featureFlags[flag];
}

export function getAllFeatureFlags() {
    return featureFlags;
}
