import {Map} from 'immutable';
import {CREATE_ENTERPRISE, GET_ENTERPRISE_SUCCESS, LIST_ENTERPRISE_SUCCESS, SAVE_ENTERPRISE} from '../actions/constants';
import {resetStateBeforeLocationChange} from './reducerUtils';

const initialState = Map({
    enterprises: Map(),
    enterprise:  Map()
});

const enterpriseReducer = (state = initialState, action) => {
    state = resetStateBeforeLocationChange('/enterprise/', state, initialState, action);
    switch (action.type) {
        case LIST_ENTERPRISE_SUCCESS:
            return state.set('enterprises', action.enterprises);
        case GET_ENTERPRISE_SUCCESS:
            return state.set('enterprise', action.enterprise);
        case SAVE_ENTERPRISE:
            return state.set('enterprises', action.enterprises);
        case CREATE_ENTERPRISE:
            return state.set('enterprise', Map({}));
    }
    return state;
};

export default enterpriseReducer;
