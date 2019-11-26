import {applyMiddleware, createStore, compose} from 'redux';
import rootReducer from './reducers/index.es6';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));