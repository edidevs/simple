import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers} from 'redux-persist';

import reducers from '../reducers';
import ReduxThunk from 'redux-thunk';
import {AsyncStorage} from 'react-native';


const config = {
    key: "primary",
    storage: AsyncStorage
}

let persistedReducer = persistCombineReducers(config, 
    reducers);
    let store = createStore(persistedReducer, applyMiddleware(ReduxThunk) );
    let persistor = persistStore(store);

export default () => {
    
    return {
        store, 
        persistor
    }
}

// let store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

// export default store;