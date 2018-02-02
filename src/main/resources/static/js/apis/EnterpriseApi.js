import {createListParams} from './ApiUtils';
import {DELETE, GET, POST, PUT} from './ApiConstants';
import Fetch from './Fetch';

const ENTERPRISE_API_URL = '/api/enterprises';

export function list(success, page, sort) {
    const urlParams = createListParams(page, sort);
    new Fetch(ENTERPRISE_API_URL + urlParams, {method: GET}).then(success);
}

export function search(filter, success) {
    new Fetch(ENTERPRISE_API_URL + '/search/' + filter, {method: GET}).then(success);
}

export function get(id, success) {
    new Fetch(ENTERPRISE_API_URL + '/' + id, {method: GET}).then(success);
}

export function save(enterprise, success) {
    new Fetch(ENTERPRISE_API_URL, {
        method:  enterprise.id != null && enterprise.id != undefined ? PUT : POST,
        headers: {'Content-Type': 'application/json'},
        body:    JSON.stringify(enterprise)
    }).then(success);
}

export function remove(id, success) {
    new Fetch(ENTERPRISE_API_URL + '/' + id, {method: DELETE}).then(success);
}
