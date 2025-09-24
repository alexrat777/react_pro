import {
    AnyAction, combineReducers, ReducersMapObject, Reducer,
} from '@reduxjs/toolkit';
import { StateSchemaKey, StateSchema, MountedRedusers } from './StateSchema';

export function createReducerManager(initialReducers:ReducersMapObject<StateSchema>) {
    // добавляем список редюсеров в новую переменную
    const reducers = { ...initialReducers };

    // создаем корневой редюсер с помощью комбайн редюсер из редюсеров
    let combinedReducer = combineReducers(reducers);

    // массив содержит ключи редюсеров которые нужно удалить из сторы(редюсеров
    let keysToRemove:Array<StateSchemaKey> = [];
    const mountedRedusers: MountedRedusers = {};
    return {
        getReducerMap: () => reducers,
        getMountedReducers: () => mountedRedusers, // возвращает замонтированные редюсеры
        // корневой редюсер функция экспорта как объекта
        // This will be passed to the store
        reduce: (state:StateSchema, action:AnyAction) => {
            // если в массиве удаления есть ключи на удаления, то сначала мы удаляем из стейта,
            // потом уже возвращаем корневой редюсер
            if (keysToRemove.length > 0) {
                state = { ...state };
                keysToRemove.forEach((key) => {
                    delete state[key];
                });
                keysToRemove = [];
            }

            // возвращаем редюсер без лишних ключей
            return combinedReducer(state, action);
        },

        // добавление нового редюсера ключ редюсер
        add: (key:StateSchemaKey, reducer:Reducer) => {
            if (!key || reducers[key]) {
                return;
            }

            // само добавление
            reducers[key] = reducer;
            mountedRedusers[key] = true;
            // обновление редюсера
            combinedReducer = combineReducers(reducers);
        },

        // удаление редюсера по ключу
        remove: (key:StateSchemaKey) => {
            if (!key || !reducers[key]) {
                return;
            }

            // само удаление по ключу
            delete reducers[key];
            mountedRedusers[key] = false;

            // добавление в массив ключей на удаление
            keysToRemove.push(key);

            // генерация нового корневого редюсера
            combinedReducer = combineReducers(reducers);
        },
    };
}

// const staticReducers = {
//     users: usersReducer,
//     posts: postsReducer,
// };
//
// export function configureStore(initialState) {
//     const reducerManager = createReducerManager(staticReducers);
//
//     // Create a store with the root reducer function being the one exposed by the manager.
//     const store = createStore(reducerManager.reduce, initialState);
//
//     // Optional: Put the reducer manager on the store so it is easily accessible
//     store.reducerManager = reducerManager;
// }
