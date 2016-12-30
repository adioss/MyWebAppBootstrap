'use strict';
import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Global from './components/layouts/Global';
import EnterpriseListContainer from './components/containers/enterprise/EnterpriseListContainer';
import EnterpriseEditContainer from './components/containers/enterprise/EnterpriseEditContainer';
import PersonListContainer from './components/containers/person/PersonListContainer';
import PersonEditContainer from './components/containers/person/PersonEditContainer';
import UserListContainer from './components/containers/user/UserListContainer';
import UserEditContainer from './components/containers/user/UserEditContainer';
import ProfileEditContainer from './components/containers/profile/ProfileEditContainer';
import Home from './components/views/Home';

export default (
    <Route path='/' component={Global}>
        <IndexRoute component={Home}/>
        <Route path='enterprise/list' component={EnterpriseListContainer}/>
        <Route path='enterprise/new' component={EnterpriseEditContainer}/>
        <Route path='enterprise/edit/:id' component={EnterpriseEditContainer}/>
        <Route path='person/list' component={PersonListContainer}/>
        <Route path='person/new' component={PersonEditContainer}/>
        <Route path='person/edit/:id' component={PersonEditContainer}/>
        <Route path='user/list' component={UserListContainer}/>
        <Route path='user/new' component={UserEditContainer}/>
        <Route path='user/edit/:id' component={UserEditContainer}/>
        <Route path='profile' component={ProfileEditContainer}/>
    </Route>
);
