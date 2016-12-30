import React from 'react';
import {mountWithIntl} from '../../../utils/UnitTestHelper';
import PersonEdit from '../PersonEdit';

describe('Person edit component',
         () => {
             let enzymeWrapper;
             let props;

             beforeEach(() => {
                            props = {save: jest.fn(), cancel: jest.fn(), remove: jest.fn()};
                            enzymeWrapper = mountWithIntl(
                                <PersonEdit {...props}/>
                                , {}
                            );
                        }
             );

             it('should render self and sub-components', () => {
                    expect(enzymeWrapper.find('h1').hasClass('principal-content-title')).toBe(true);
                    expect(enzymeWrapper.find('h1').text()).toBe('Person edition');
                    expect(enzymeWrapper.find('h1').length).toBe(1);
                    expect(enzymeWrapper.find('div').length).toBe(14);
                    expect(enzymeWrapper.find('form').length).toBe(1);
                    expect(enzymeWrapper.find('button').length).toBe(3);
                }
             );

             it('should render component with given person', () => {
                    // Given
                    const expectedId = 42;
                    const expectedName = 'Test name';
                    const expectedUrl = 'Test url';
                    props = {
                        id: expectedId, name: expectedName, url: expectedUrl,
                        save: jest.fn(),
                        cancel: jest.fn(),
                        remove: jest.fn()
                    };

                    // When
                    enzymeWrapper = mountWithIntl(
                        <PersonEdit {...props}/>
                        , {}
                    );

                    // Then
                    expect(enzymeWrapper.find('input').at(0).props().value).toEqual(expectedName);
                    expect(enzymeWrapper.find('input').at(1).props().value).toEqual(expectedUrl);
                }
             );

             it('should call button on click', () => {
                    enzymeWrapper.find('button').at(0).simulate('click');
                    expect(props.save.mock.calls.length).toBe(1);
                    enzymeWrapper.find('button').at(1).simulate('click');
                    expect(props.remove.mock.calls.length).toBe(1);
                    enzymeWrapper.find('button').at(2).simulate('click');
                    expect(props.cancel.mock.calls.length).toBe(1);
                }
             );

             it('should save new person on save button click', () => {
                    // Given
                    const expectedName = 'Test name';
                    const expectedUrl = 'Test url';

                    // When
                    enzymeWrapper.find('input').at(0).simulate('change', {target: {value: expectedName}});
                    enzymeWrapper.find('input').at(1).simulate('change', {target: {value: expectedUrl}});
                    enzymeWrapper.find('button').at(0).simulate('click');

                    // Then
                    expect(props.save.mock.calls.length).toBe(1);
                    // first call/first param
                    const saveMethodParam = props.save.mock.calls[0][0];
                    expect(saveMethodParam).toBeDefined();
                    expect(saveMethodParam).toEqual({
                                                        'id': null, 'name': expectedName, 'url': expectedUrl,
                                                        'enterprise': null, 'enterprises': []
                                                    }
                    );
                }
             );

             it('should save edited person on save button click', () => {
                    // Given
                    const expectedId = 42;
                    const expectedName = 'Test name';
                    const expectedUrl = 'Test url';
                    props = {
                        id: expectedId, name: 'previous value', url: 'previous value',
                        save: jest.fn(),
                        cancel: jest.fn(),
                        remove: jest.fn()
                    };
                    enzymeWrapper = mountWithIntl(
                        <PersonEdit {...props}/>
                        , {}
                    );
                    // When
                    enzymeWrapper.find('input').at(0).simulate('change', {target: {value: expectedName}});
                    enzymeWrapper.find('input').at(1).simulate('change', {target: {value: expectedUrl}});
                    enzymeWrapper.find('button').at(0).simulate('click');

                    // Then
                    expect(props.save.mock.calls.length).toBe(1);
                    // first call/first param
                    const saveMethodParam = props.save.mock.calls[0][0];
                    expect(saveMethodParam).toBeDefined();
                    expect(saveMethodParam).toEqual({
                                                        'id': expectedId, 'name': expectedName, 'url': expectedUrl,
                                                        'enterprise': null, 'enterprises': []
                                                    }
                    );
                }
             );
         }
);