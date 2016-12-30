import {Map} from 'immutable';
import {LIST_PERSON_SUCCESS, GET_PERSON_SUCCESS, SAVE_PERSON, CREATE_PERSON} from '../actions/constants';
import {resetStateBeforeLocationChange} from './reducerUtils';

const initialState = Map({persons: Map([]), person: Map()});

const personReducer = (state = initialState, action) => {
    state = resetStateBeforeLocationChange('/person/', state, initialState, action);
    switch (action.type) {
        case LIST_PERSON_SUCCESS:
            return state.set('persons', action.persons);
        case GET_PERSON_SUCCESS:
            return state.set('person', action.person);
        case SAVE_PERSON:
            return state.set('persons', action.persons);
        case CREATE_PERSON:
            return state.set('person', Map({}));
    }
    return state;
};

export default personReducer;