import {createListParams} from './ApiUtils';
import {DELETE, GET, POST, PUT} from './ApiConstants';
import Fetch from './Fetch';
const USER_API_URL = '/api/console/users';

export function list(success, page, sort) {
    const urlParams = createListParams(page, sort);
    new Fetch(USER_API_URL + urlParams, {method: GET}).then(success);
}

export function get(id, success) {
    new Fetch(USER_API_URL + '/' + id, {method: GET}).then(success);
}

export function save(user, success) {
    new Fetch(USER_API_URL, {
        method: user.id != null && user.id != undefined ? PUT : POST,
            headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
        }
    ).then(success);
}

export function remove(id, success) {
    new Fetch(USER_API_URL + '/' + id, {method: DELETE}).then(success);
}

export function changePassword(newPassword, newPasswordValidation, success, userId) {
    new Fetch(USER_API_URL + '/changePassword/' + userId, {
        method: POST,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                                     newPassword: newPassword,
                                     newPasswordValidation: newPasswordValidation
                                 }
            )
        }
    ).then(success);
}
