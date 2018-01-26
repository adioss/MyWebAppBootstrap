import React from 'react';
import {mountWithIntl} from '../../../utils/UnitTestHelper';
import UserEdit from '../UserEdit';

describe('User edit component', () => {
    let enzymeWrapper;
    let props;

    beforeEach(() => {
        props = {
            save:           jest.fn(),
            cancel:         jest.fn(),
            remove:         jest.fn(),
            changePassword: jest.fn()
        };
        enzymeWrapper = mountWithIntl(<UserEdit {...props}/>, {});
    });

    it('should render self and sub-components', () => {
        expect(enzymeWrapper.find('div.sub.header').text()).toBe('User edition');
        expect(enzymeWrapper.find('div').length).toBe(14);
        expect(enzymeWrapper.find('form').length).toBe(1);
        expect(enzymeWrapper.find('button').length).toBe(4);
    });

    it('should render component with given user', () => {
        // Given
        const expectedId = 42;
        const expectedUserName = 'Test name';
        const expectedMail = 'Test url';
        props = {
            id:       expectedId,
            username: expectedUserName,
            email:    expectedMail,
            save:     jest.fn(),
            cancel:   jest.fn(),
            remove:   jest.fn()
        };

        // When
        enzymeWrapper = mountWithIntl(<UserEdit {...props}/>, {});
        // Then
        expect(enzymeWrapper.find('input').at(0).props().value).toEqual(expectedUserName);
        expect(enzymeWrapper.find('input').at(1).props().value).toEqual(expectedMail);
    });

    it('should call button on click', () => {
        enzymeWrapper.find('button').at(1).simulate('click');
        expect(props.save.mock.calls.length).toBe(1);
        enzymeWrapper.find('button').at(2).simulate('click');
        expect(props.remove.mock.calls.length).toBe(1);
        enzymeWrapper.find('button').at(3).simulate('click');
        expect(props.cancel.mock.calls.length).toBe(1);
    });

    it('should save new user on save button click', () => {
        // Given
        const expectedUserName = 'Test name';
        const expectedMail = 'Test email';

        // When
        enzymeWrapper.find('input').at(0).simulate('change', {target: {value: expectedUserName}});
        enzymeWrapper.find('input').at(1).simulate('change', {target: {value: expectedMail}});
        enzymeWrapper.find('button').at(1).simulate('click');

        // Then
        expect(props.save.mock.calls.length).toBe(1);
        // first call/first param
        const saveMethodParam = props.save.mock.calls[0][0];
        expect(saveMethodParam).toBeDefined();
        expect(saveMethodParam).toEqual({
            'id':               null,
            'username':         'Test name',
            'email':            'Test email',
            'language':         'ENGLISH',
            'avatarInputFile':  null,
            'isProfileEdition': false,
            'isShowingModal':   false,
            'roles':            [],
        });
    });

    it('should save edited user on save button click', () => {
        // Given
        const expectedId = 42;
        const expectedUserName = 'Test name';
        const expectedMail = 'Test email';
        props = {
            id:     expectedId,
            name:   'previous value',
            email:  'previous value',
            save:   jest.fn(),
            cancel: jest.fn(),
            remove: jest.fn()
        };
        enzymeWrapper = mountWithIntl(<UserEdit {...props}/>, {});
        // When
        enzymeWrapper.find('input').at(0).simulate('change', {target: {value: expectedUserName}});
        enzymeWrapper.find('input').at(1).simulate('change', {target: {value: expectedMail}});
        enzymeWrapper.find('button').at(1).simulate('click');

        // Then
        expect(props.save.mock.calls.length).toBe(1);
        // first call/first param
        const saveMethodParam = props.save.mock.calls[0][0];
        expect(saveMethodParam).toBeDefined();
        expect(saveMethodParam).toEqual({
            'id':               42,
            'username':         'Test name',
            'email':            'Test email',
            'language':         'ENGLISH',
            'avatarInputFile':  null,
            'isProfileEdition': false,
            'isShowingModal':   false,
            'roles':            [],
        });
    });
});
