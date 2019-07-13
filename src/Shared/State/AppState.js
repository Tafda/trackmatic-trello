import { createStore, applyMiddleware } from 'redux';
import RootReducer from './RootReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import  sessionStorage  from 'redux-persist/lib/storage/session';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

const persistStoreConfig = {
    key: 'root',
    storage: sessionStorage,
    stateReconciler:  autoMergeLevel2
};

const persistedReducer = persistReducer(persistStoreConfig, RootReducer);

export const createAppState = () => {
    const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
    const storePersistor = persistStore(store);

    return { store, storePersistor };
}

