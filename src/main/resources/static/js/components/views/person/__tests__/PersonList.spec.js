import React from 'react';
import {mountWithIntl} from '../../../utils/UnitTestHelper';
import PersonList from '../PersonList';

describe('Person list component', () => {
             let enzymeWrapper;
             let props;

             it('should render self and sub-components', () => {
                    // Given
                    props = {
                        persons: {content: []},
                        list: jest.fn(),
                        edit: jest.fn(),
                        create: jest.fn()
                    };

                    // When
                    enzymeWrapper = mountWithIntl(<PersonList {...props}/>, {});

                    // Then
                    expect(enzymeWrapper.find('h1').hasClass('principal-content-title')).toBe(true);
                    expect(enzymeWrapper.find('h1').text()).toBe('Person list');
                    expect(enzymeWrapper.find('h1').length).toBe(1);
                    expect(enzymeWrapper.find('div').length).toBe(6);
                    expect(enzymeWrapper.find('table').length).toBe(1);
                    expect(enzymeWrapper.find('th').length).toBe(4);
                    expect(enzymeWrapper.find('tr').length).toBe(1);
                    expect(enzymeWrapper.find('td').length).toBe(0);
                    expect(enzymeWrapper.find('button').length).toBe(1);
                }
             );
             it('should render table', () => {
                    // Given
                    props = {
                        persons: {content: [{'id': 1, 'name': 'per1', 'url': 'url1'}]},
                        list: jest.fn(),
                        edit: jest.fn(),
                        create: jest.fn()
                    };

                    // When
                    enzymeWrapper = mountWithIntl(<PersonList {...props}/>, {});

                    // Then
                    expect(enzymeWrapper.find('h1').hasClass('principal-content-title')).toBe(true);
                    expect(enzymeWrapper.find('h1').text()).toBe('Person list');
                    expect(enzymeWrapper.find('table').length).toBe(1);
                    expect(enzymeWrapper.find('th').length).toBe(4);
                    expect(enzymeWrapper.find('tr').length).toBe(2);
                    expect(enzymeWrapper.find('td').length).toBe(4);
                }
             );
         }
);