import {CREATE_ENTERPRISE, GET_ENTERPRISE_SUCCESS, LIST_ENTERPRISE_SUCCESS} from '../constants';
import {createEnterprise, getEnterpriseSuccess, listEnterprisesSuccess} from '../enterprise';

describe('Enterprise actions', () => {
    it('should create an action to get an enterprise', () => {
        const enterprise = {
            id:   13,
            name: 'test'
        };
        const expectedAction = {
            type:       GET_ENTERPRISE_SUCCESS,
            enterprise: enterprise
        };
        expect(getEnterpriseSuccess(enterprise)).toEqual(expectedAction)
    });
    it('should create an action to list enterprises', () => {
        const enterprises = [
            {
                id:   13,
                name: 'test'
            }
        ];
        const expectedAction = {
            type:        LIST_ENTERPRISE_SUCCESS,
            enterprises: enterprises
        };
        expect(listEnterprisesSuccess(enterprises)).toEqual(expectedAction)
    });
    it('should create an action to create enterprise', () => {
        const expectedAction = {
            type: CREATE_ENTERPRISE
        };
        expect(createEnterprise()).toEqual(expectedAction)
    })
});
