import {Map} from 'immutable';
import enterpriseReducer from '../enterprises';
import {createEnterprise, getEnterpriseSuccess, listEnterprisesSuccess} from '../../actions/enterprise';

function createMockedEnterprise(id, name) {
    id = id || 1;
    name = name || 'test';
    return {
        'id':   id,
        'name': name
    };
}

function getInitialState() {
    return Map({
        enterprises: Map(),
        enterprise:  Map()
    });
}

describe('Enterprises reducer', () => {
    it('should return the initial state', () => {
        const expected = getInitialState();
        expect(enterpriseReducer(undefined, {})).toEqual(expected)
    });

    it('should return the state with empty enterprises', () => {
        const expected = getInitialState().set('enterprises', {'enterprises': []});
        expect(enterpriseReducer(undefined, listEnterprisesSuccess({'enterprises': []}))).toEqual(expected);
    });

    it('should return the state with two enterprises', () => {
        const testedValue = {
            'enterprises': [
                createMockedEnterprise(1, 'test'), createMockedEnterprise(2, 'test:')
            ]
        };
        const expected = getInitialState().set('enterprises', testedValue);
        expect(enterpriseReducer(undefined, listEnterprisesSuccess(testedValue))).toEqual(expected);
    });

    it('should return the state when get enterprise', () => {
        const expected = getInitialState().set('enterprise', createMockedEnterprise(1, 'test'));
        expect(enterpriseReducer(undefined, getEnterpriseSuccess(createMockedEnterprise(1, 'test'))))
            .toEqual(expected);
    });

    it('should return the state when create enterprise', () => {
        const expected = getInitialState().set('enterprise', Map());
        expect(enterpriseReducer(undefined, createEnterprise())).toEqual(expected);
    });
});
