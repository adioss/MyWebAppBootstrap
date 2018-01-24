import React from 'react';
import {mountWithIntl} from '../../../utils/UnitTestHelper';
import EnterpriseList from '../EnterpriseList';

describe('Enterprise list component', () => {
             let enzymeWrapper;
             let props;

             it('should render self and sub-components', () => {
                    // Given
                    props = {
                        enterprises: {content: []},
                        list: jest.fn(),
                        edit: jest.fn(),
                        create: jest.fn()
                    };

                    // When
                    enzymeWrapper = mountWithIntl(<EnterpriseList {...props}/>, {});

                    // Then
                 expect(enzymeWrapper.find('div.sub.header').text()).toBe('Manage enterprises');
                 expect(enzymeWrapper.find('div').length).toBe(4);
                    expect(enzymeWrapper.find('table').length).toBe(1);
                 expect(enzymeWrapper.find('th').length).toBe(4);
                 expect(enzymeWrapper.find('tr').length).toBe(2);
                    expect(enzymeWrapper.find('td').length).toBe(0);
                    expect(enzymeWrapper.find('button').length).toBe(1);
                }
             );
             it('should render table', () => {
                    // Given
                    props = {
                        enterprises: {content: [{'id': 1, 'name': 'ent1', 'url': 'url1'}]},
                        list: jest.fn(),
                        edit: jest.fn(),
                        create: jest.fn()
                    };

                    // When
                    enzymeWrapper = mountWithIntl(<EnterpriseList {...props}/>, {});

                    // Then
                 expect(enzymeWrapper.find('div').length).toBe(4);
                 expect(enzymeWrapper.find('table').length).toBe(1);
                 expect(enzymeWrapper.find('th').length).toBe(4);
                 expect(enzymeWrapper.find('tr').length).toBe(3);
                 expect(enzymeWrapper.find('td').length).toBe(3);
                }
             );
         }
);
