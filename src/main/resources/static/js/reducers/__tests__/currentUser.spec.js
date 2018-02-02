import {Map} from 'immutable';
import currentUserReducer from '../currentUser';
import {getCurrentUserSuccess, updateCurrentUserAvatar} from '../../actions/currentUser';

function createMockedUser(id, name) {
    id = id || 1;
    name = name || 'test';
    return {
        'id':   id,
        'name': name
    };
}

function getInitialState() {
    return Map();
}

describe('Current user reducer', () => {
    it('should return the initial state', () => {
        const expected = getInitialState();
        expect(currentUserReducer(undefined, {})).toEqual(expected)
    });

    it('should return the state when get current user', () => {
        const expected = getInitialState().set('currentUser', createMockedUser(1, 'test'));
        const state = currentUserReducer(undefined, getCurrentUserSuccess(createMockedUser(1, 'test')));
        expect(state.get('currentUser')).toEqual(expected.get('currentUser'));
        expect(state.get('avatarUrl')).not.toBe(null);
        expect(state.get('avatarUrl')).not.toBe(undefined);
    });
    it('should return the update user avatar when concerned by update', () => {
        const previousAvatarUrl = 'http://test.com';
        const initialState = getInitialState().set('currentUser', createMockedUser(1, 'test'))
            .set('avatarUrl', previousAvatarUrl);
        const state = currentUserReducer(initialState, updateCurrentUserAvatar(1));
        expect(state.get('avatarUrl')).not.toBe(null);
        expect(state.get('avatarUrl')).not.toBe(undefined);
        expect(state.get('avatarUrl')).not.toBe(previousAvatarUrl);
    });

    it('should not update user avatar when not concerned by update', () => {
        const previousAvatarUrl = 'http://test.com';
        const initialState = getInitialState().set('currentUser', createMockedUser(1, 'test'))
            .set('avatarUrl', previousAvatarUrl);
        const state = currentUserReducer(initialState, updateCurrentUserAvatar(2));
        expect(state.get('avatarUrl')).not.toBe(null);
        expect(state.get('avatarUrl')).not.toBe(undefined);
        expect(state.get('avatarUrl')).toBe(previousAvatarUrl);
    });
});
