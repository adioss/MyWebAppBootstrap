import {GET_CURRENT_USER_SUCCESS, UPDATE_CURRENT_USER_AVATAR_SUCCESS} from './constants';


export function getCurrentUserSuccess(user) {
    return {
        type: GET_CURRENT_USER_SUCCESS,
        user: user
    }
}

export function updateCurrentUserAvatar(userId) {
    return {
        type: UPDATE_CURRENT_USER_AVATAR_SUCCESS,
        userId: userId
    }
}