import {getStore} from '../../store';
import {get} from '../../apis/CurrentUserApi';

export function getAvatarUrl(userId) {
    return '/api/avatars/' + (userId != null ? userId : '-1') + '?temp=' + Math.random();
}

export function hasUserRole(role) {
    if (getStore().getState().currentUserReducer.get('currentUser') == null) {
        return false;
    }

    return getStore().getState().currentUserReducer.get('currentUser').roles.indexOf(role) > -1;
}

/*eslint-disable no-unused-vars*/
function checkLoggedTask() {
    setTimeout(() => {
        get(() => {
            // do nothing
            checkLoggedTask();
        }, () => {
            // redirect to login
            window.location = '/logout';
        });
    }, 5000);
}
