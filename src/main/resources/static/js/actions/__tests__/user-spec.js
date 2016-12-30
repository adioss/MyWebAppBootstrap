import {GET_USER_SUCCESS, LIST_USER_SUCCESS, CREATE_USER} from '../constants';
import {getUserSuccess, createUser, listUsersSuccess} from '../user';

describe('User actions', () => {
             it('should create an action to get an user', () => {
                    const user = {id: 13, name: 'test'};
                    const expectedAction = {
                        type: GET_USER_SUCCESS,
                        user: user
                    };
                    expect(getUserSuccess(user)).toEqual(expectedAction)
                }
             );
             it('should create an action to list users', () => {
                    const users = [{id: 13, name: 'test'}];
                    const expectedAction = {
                        type: LIST_USER_SUCCESS,
                        users: users
                    };
                    expect(listUsersSuccess(users)).toEqual(expectedAction)
                }
             );
             it('should create an action to create user', () => {
                    const expectedAction = {
                        type: CREATE_USER
                    };
                    expect(createUser()).toEqual(expectedAction)
                }
             )
         }
);