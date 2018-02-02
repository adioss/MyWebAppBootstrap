import {Map} from 'immutable';
import personReducer from '../persons';
import {createPerson, getPersonSuccess, listPersonsSuccess} from '../../actions/person';

function createMockedPerson(id, name) {
    id = id || 1;
    name = name || 'test';
    return {
        'id':   id,
        'name': name
    };
}

function getInitialState() {
    return Map({
        persons: Map(),
        person:  Map()
    });
}

describe('Persons reducer', () => {
    it('should return the initial state', () => {
        const expected = getInitialState();
        expect(personReducer(undefined, {})).toEqual(expected)
    });

    it('should return the state with empty persons', () => {
        const expected = getInitialState().set('persons', {'persons': []});
        expect(personReducer(undefined, listPersonsSuccess({'persons': []}))).toEqual(expected);
    });

    it('should return the state with two persons', () => {
        const testedValue = {
            'persons': [
                createMockedPerson(1, 'test'), createMockedPerson(2, 'test:')
            ]
        };
        const expected = getInitialState().set('persons', testedValue);
        expect(personReducer(undefined, listPersonsSuccess(testedValue))).toEqual(expected);
    });

    it('should return the state when get person', () => {
        const expected = getInitialState().set('person', createMockedPerson(1, 'test'));
        expect(personReducer(undefined, getPersonSuccess(createMockedPerson(1, 'test')))).toEqual(expected);
    });

    it('should return the state when create person', () => {
        const expected = getInitialState().set('person', Map());
        expect(personReducer(undefined, createPerson())).toEqual(expected);
    });
});
