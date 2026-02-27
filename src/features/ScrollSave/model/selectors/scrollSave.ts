import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getScrollSaveScroll = (state: StateSchema) =>
    state.scrollSave.scroll;
// создание реселекта что б получить из объекто только значение
export const getScrollSaveScrollByPath = createSelector(
    getScrollSaveScroll,
    (state: StateSchema, path: string) => path,
    (scroll, path) => scroll[path] || 0,
);
