import {CREATE_PERSON, GET_PERSON_SUCCESS, LIST_PERSON_SUCCESS} from './constants';

export function listPersonsSuccess(persons) {
    return {
        type:    LIST_PERSON_SUCCESS,
        persons: persons
    }
}

export function getPersonSuccess(person) {
    return {
        type:   GET_PERSON_SUCCESS,
        person: person
    }
}

export function createPerson() {
    return {
        type: CREATE_PERSON
    }
}
