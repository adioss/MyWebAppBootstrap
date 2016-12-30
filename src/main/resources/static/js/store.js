import {createStore, combineReducers, applyMiddleware} from 'redux';
import {routerReducer, routerMiddleware} from 'react-router-redux';
import {intlReducer} from 'react-intl-redux';
import {addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import eni18n from './i18n/en-US';
import count from './reducers/count';
import enterpriseReducer from './reducers/enterprises';
import personReducer from './reducers/persons';
import userReducer from './reducers/users';
import currentUserReducer from './reducers/currentUser';

const initialState = {
    intl: eni18n
};

let store;

export function getStore(browserHistory) {
    if (store == null) {
        addLocaleData([...en, ...fr]);
        const middleware = routerMiddleware(browserHistory);
        const reducers =
            combineReducers({
                                count,
                                currentUserReducer: currentUserReducer,
                                enterpriseReducer: enterpriseReducer,
                                personReducer: personReducer,
                                userReducer: userReducer,
                                intl: intlReducer,
                                routing: routerReducer
                            }
            );

        store = createStore(
            reducers,
            initialState,
            applyMiddleware(middleware)
        );
    }
    return store;
}
