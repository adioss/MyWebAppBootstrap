import {resetStateBeforeLocationChange} from '../reducerUtils';

const defaultActionType = '@@router/LOCATION_CHANGE';
const defaultPathname = '/enterprise/list';

function createMocked(id, name) {
    id = id || 1;
    name = name || 'test';
    return {
        'id':   id,
        'name': name
    };
}

function getInitialState() {
    return {};
}

function createAction(type, pathname, hash, action) {
    type = type || defaultActionType;

    pathname = pathname || defaultPathname;
    hash = hash || '';
    action = action || 'PUSH';
    return {
        'type':    type,
        'payload': {
            'pathname': pathname,
            'search':   '',
            'hash':     hash,
            'action':   action,
            'key':      'dxx3yd',
            'query':    {}
        }
    }
}

describe('Utils reducer', () => {
    it('should return previous state', () => {
        const original = createMocked();
        const expected = createMocked();
        const initialState = getInitialState();
        expect(resetStateBeforeLocationChange('', original, initialState, {})).toEqual(expected);
        let action = createAction('anyOtherType');
        expect(resetStateBeforeLocationChange('', original, initialState, action)).toEqual(expected);
        action = createAction(null, 'anyPath');
        expect(resetStateBeforeLocationChange('aPath', original, initialState, action)).toEqual(expected);
        action = createAction(null, null, '#menu');
        expect(resetStateBeforeLocationChange('', original, initialState, action)).toEqual(expected);
        action = createAction(null, null, null, 'REPLACE');
        expect(resetStateBeforeLocationChange('', original, initialState, action)).toEqual(expected);
    });

    it('should return initial state', () => {
        const original = createMocked();
        const expected = getInitialState();
        const initialState = getInitialState();
        const match = defaultPathname;
        let action = createAction(defaultActionType);
        expect(resetStateBeforeLocationChange(match, original, initialState, action)).toEqual(expected);
        action = createAction(defaultActionType, defaultPathname);
        expect(resetStateBeforeLocationChange(match, original, initialState, action)).toEqual(expected);
        action = createAction(defaultActionType, defaultPathname, '#anyPath');
        expect(resetStateBeforeLocationChange(match, original, initialState, action)).toEqual(expected);
        action = createAction(defaultActionType, defaultPathname, null, 'OTHER');
        expect(resetStateBeforeLocationChange(match, original, initialState, action)).toEqual(expected);
    });
});
