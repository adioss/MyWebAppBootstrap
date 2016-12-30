import Fetch from './Fetch';
import {GET, POST, PUT} from './ApiConstants';
const PROFILE_API_URL = '/api/profile';

export function get(success, error) {
    new Fetch(PROFILE_API_URL, {method: GET}).then(success, error);
}

export function save(user, success) {
    new Fetch(PROFILE_API_URL, {
        method: PUT,
            headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
        }
    ).then(success);
}

export function changePassword(newPassword, newPasswordValidation, success) {
    new Fetch(PROFILE_API_URL + '/changePassword', {
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
