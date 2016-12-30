import {Map} from 'immutable';
import {GET_CURRENT_USER_SUCCESS, UPDATE_CURRENT_USER_AVATAR_SUCCESS} from '../actions/constants';
import {getAvatarUrl} from '../components/utils/CurrentUserManager';

const initialState = Map();

const currentUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENT_USER_SUCCESS:
            state = state.set('avatarUrl', getAvatarUrl(action.user.id));
            return state.set('currentUser', action.user);
        case UPDATE_CURRENT_USER_AVATAR_SUCCESS:
            if (state.get('currentUser').id == action.userId) {
                return state.set('avatarUrl', getAvatarUrl(action.userId));
            } else {
                break;
            }
    }
    return state;
};

export default currentUserReducer;