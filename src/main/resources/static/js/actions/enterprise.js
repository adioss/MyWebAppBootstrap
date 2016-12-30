import {LIST_ENTERPRISE_SUCCESS, GET_ENTERPRISE_SUCCESS, CREATE_ENTERPRISE} from './constants';

export function listEnterprisesSuccess(enterprises) {
    return {
        type: LIST_ENTERPRISE_SUCCESS,
        enterprises: enterprises
    }
}

export function getEnterpriseSuccess(enterprise) {
    return {
        type: GET_ENTERPRISE_SUCCESS,
        enterprise: enterprise
    }
}

export function createEnterprise() {
    return {
        type: CREATE_ENTERPRISE
    }
}