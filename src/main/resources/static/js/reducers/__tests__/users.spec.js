import {Map} from 'immutable';
import userReducer from '../users';
import {createUser, getUserSuccess, listUsersSuccess} from '../../actions/user';

function createMockedUser(id, name) {
    id = id || 1;
    name = name || 'test';
    return {
        'id':   id,
        'name': name
    };
}

function getInitialState() {
    return Map({
        users: Map(),
        user:  Map()
    });
}

describe('Users reducer', () => {
    it('should return the initial state', () => {
        const expected = getInitialState();
        expect(userReducer(undefined, {})).toEqual(expected)
    });

    it('should return the state with empty users', () => {
        const expected = getInitialState().set('users', {'users': []});
        expect(userReducer(undefined, listUsersSuccess({'users': []}))).toEqual(expected);
    });

    it('should return the state with two users', () => {
        const testedValue = {
            'users': [
                createMockedUser(1, 'test'), createMockedUser(2, 'test:')
            ]
        };
        const expected = getInitialState().set('users', testedValue);
        expect(userReducer(undefined, listUsersSuccess(testedValue))).toEqual(expected);
    });

    it('should return the state when get user', () => {
        const expected = getInitialState().set('user', createMockedUser(1, 'test'));
        expect(userReducer(undefined, getUserSuccess(createMockedUser(1, 'test')))).toEqual(expected);
    });

    it('should return the state when create user', () => {
        const expected = getInitialState().set('user', Map()).set('isNew', true);
        expect(userReducer(undefined, createUser())).toEqual(expected);
    });
});
