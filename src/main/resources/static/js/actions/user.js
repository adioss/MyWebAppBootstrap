import {CREATE_USER, GET_USER_SUCCESS, LIST_USER_SUCCESS} from './constants';

export function listUsersSuccess(users) {
    return {
        type:  LIST_USER_SUCCESS,
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
