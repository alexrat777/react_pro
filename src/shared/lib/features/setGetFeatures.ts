import { FeatureFlags } from '@/shared/types/featureFlags';
// ФИЧИ НЕ МЕНЯЮТСЯ В ХОДЕ СЕССИИ, ИНАЧЕ ДЛЯ РЕАКТИВНОСТИ НАДО ДЕЛАТЬ СТЕЙТ И ХУК ПО РАБОТЕ С НИМ
let featureFlags: FeatureFlags;

export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
    if (newFeatureFlags) {
        featureFlags = newFeatureFlags;
    }
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
    return featureFlags[flag];
}
