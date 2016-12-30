import {Map} from 'immutable';
import {LIST_USER_SUCCESS, GET_USER_SUCCESS, SAVE_USER, CREATE_USER} from '../actions/constants';
import {resetStateBeforeLocationChange} from './reducerUtils';

const initialState = Map({users: Map([]), user: Map()});

const userReducer = (state = initialState, action) => {
    state = resetStateBeforeLocationChange('/user/', state, initialState, action);
    switch (action.type) {
        case LIST_USER_SUCCESS:
            return state.set('users', action.users);
        case GET_USER_SUCCESS:
            return state.set('user', action.user);
        case SAVE_USER:
            return state.set('users', action.users);
        case CREATE_USER:
            state = state.set('isNew', true);
            return state.set('user', Map());
    }
    return state;
};

export default userReducer;