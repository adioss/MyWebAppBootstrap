'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Router} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import {IntlProvider} from 'react-intl-redux';
import {getStore} from './store';
import Global from './components/layouts/Global';

const history = createHistory();

const store = getStore(history);

const mainApp = //
    (<Provider store={store}>
        <IntlProvider defaultLocale='en'>
            <Router history={history}>
                <div>
                    <Route exact path='/*' component={Global}/>
                </div>
            </Router>
        </IntlProvider>
    </Provider>);

ReactDOM.render(mainApp, document.getElementById('app'));
