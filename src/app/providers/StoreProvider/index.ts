import { StoreProvider } from './ui/StoreProvider';
import { createReduxStore } from './config/store';
import type {
    StateSchema, ReduxStoreWithManager, ThunkConfig, StateSchemaKey,
} from './config/StateSchema';
import type { AppDispatch } from './config/store';
import { createReducerManager } from './config/reducerManager';

export {
    createReducerManager,
    StoreProvider,
    createReduxStore,
    StateSchema,
    ReduxStoreWithManager,
    AppDispatch,
    ThunkConfig,
    StateSchemaKey,
};
