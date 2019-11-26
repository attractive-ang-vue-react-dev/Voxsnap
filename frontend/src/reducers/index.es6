import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import orderNarrationReducer from './orderNarrationReducer.es6';
import narrationsReducer from './narrationsReducer.es6';
import playlistsReducer from './playlistsReducer.es6';
import billingReducer from './billingReducer.es6';
import authReducer from './authReducer.es6';
import notificationsReducer from './notificationsReducer.es6';
import additionalServicesReducer from './distributionReducer.es6';

const rootReducer = combineReducers({
    authReducer,
    orderNarrationReducer,
    narrationsReducer,
    playlistsReducer,
    billingReducer,
    notificationsReducer,
    additionalServicesReducer,
    form: formReducer
});

export default rootReducer;
