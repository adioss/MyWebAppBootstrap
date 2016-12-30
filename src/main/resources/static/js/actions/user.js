import {LIST_USER_SUCCESS, GET_USER_SUCCESS, CREATE_USER} from './constants';

export function listUsersSuccess(users) {
    return {
        type: LIST_USER_SUCCESS,
        users: users
    }
}

export function getUserSuccess(user) {
    return {
        type: GET_USER_SUCCESS,
        user: user
    }
}

export function createUser() {
    return {
        type: CREATE_USER
    }
}