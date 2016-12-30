import {GET_CURRENT_USER_SUCCESS, UPDATE_CURRENT_USER_AVATAR_SUCCESS} from '../constants';
import {getCurrentUserSuccess, updateCurrentUserAvatar} from '../currentUser';

describe('Current User actions', () => {
             it('should create an action to get current user', () => {
                    const user = {id: 13, name: 'test'};
                    const expectedAction = {
                        type: GET_CURRENT_USER_SUCCESS,
                        user: user
                    };
                    expect(getCurrentUserSuccess(user)).toEqual(expectedAction)
                }
             );
             it('should create an action to update user avatar', () => {
                    const userId = {id: 13};
                    const expectedAction = {
                        type: UPDATE_CURRENT_USER_AVATAR_SUCCESS,
                        userId: userId
                    };
                    expect(updateCurrentUserAvatar(userId)).toEqual(expectedAction)
                }
             );
         }
);