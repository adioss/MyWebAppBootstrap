import sanitize from '../components/utils/BodySanitizer';
import {createListParams} from './ApiUtils';
import {DELETE, GET, POST, PUT} from './ApiConstants';
import Fetch from './Fetch';

const PERSON_API_URL = '/api/persons';

export function list(success, page, sort) {
    const urlParams = createListParams(page, sort);
    new Fetch(PERSON_API_URL + urlParams, {method: GET}).then(success);
}

export function get(id, success) {
    new Fetch(PERSON_API_URL + '/' + id, {method: GET}).then(success);
}

export function save(person, success) {
    new Fetch(PERSON_API_URL, {
        method:  person.id !== null && person.id !== undefined ? PUT : POST,
        headers: {'Content-Type': 'application/json'},
        body:    sanitize(person)
    }).then(success);
}

export function remove(id, success) {
    new Fetch(PERSON_API_URL + '/' + id, {method: DELETE}).then(success);
}
