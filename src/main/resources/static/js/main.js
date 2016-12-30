'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {IntlProvider} from 'react-intl-redux';
import {getStore} from './store';
import routes from './routes';

const store = getStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider defaultLocale='en'>
            <Router history={history} routes={routes}/>
        </IntlProvider>
    </Provider>
    , document.getElementById('app')
);