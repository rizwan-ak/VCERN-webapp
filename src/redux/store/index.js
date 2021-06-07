import { createStore, applyMiddleware } from 'redux';
import Reducer from '../reducers';

import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'vcern',
    storage,
};

const persistedReducer = persistReducer(persistConfig, Reducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
