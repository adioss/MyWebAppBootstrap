import React from 'react';
import {mountWithIntl} from '../../../utils/UnitTestHelper';
import UserList from '../UserList';

describe('User list component', () => {
    let enzymeWrapper;
    let props;

    it('should render self and sub-components', () => {
        // Given
        props = {
            users:  {content: []},
            list:   jest.fn(),
            edit:   jest.fn(),
            create: jest.fn()
        };

        // When
        enzymeWrapper = mountWithIntl(<UserList {...props}/>, {});

        // Then
        expect(enzymeWrapper.find('div.sub.header').text()).toBe('User list');
        expect(enzymeWrapper.find('div').length).toBe(4);
        expect(enzymeWrapper.find('table').length).toBe(1);
        expect(enzymeWrapper.find('th').length).toBe(5);
        expect(enzymeWrapper.find('tr').length).toBe(2);
        expect(enzymeWrapper.find('td').length).toBe(0);
        expect(enzymeWrapper.find('button').length).toBe(1);
    });
    it('should render table', () => {
        // Given
        props = {
            users:  {
                content: [
                    {
                        'id':       1,
                        'username': 'per1',
                        'email':    'url1',
                        roles:      []
                    }
                ]
            },
            list:   jest.fn(),
            edit:   jest.fn(),
            create: jest.fn()
        };

        // When
        enzymeWrapper = mountWithIntl(<UserList {...props}/>, {});

        // Then
        expect(enzymeWrapper.find('table').length).toBe(1);
        expect(enzymeWrapper.find('th').length).toBe(5);
        expect(enzymeWrapper.find('tr').length).toBe(3);
        expect(enzymeWrapper.find('td').length).toBe(4);
    });
});
