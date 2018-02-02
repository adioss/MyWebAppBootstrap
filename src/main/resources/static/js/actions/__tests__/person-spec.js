import {CREATE_PERSON, GET_PERSON_SUCCESS, LIST_PERSON_SUCCESS} from '../constants';
import {createPerson, getPersonSuccess, listPersonsSuccess} from '../person';

describe('Person actions', () => {
    it('should create an action to get an person', () => {
        const person = {
            id:   13,
            name: 'test'
        };
        const expectedAction = {
            type:   GET_PERSON_SUCCESS,
            person: person
        };
        expect(getPersonSuccess(person)).toEqual(expectedAction)
    });
    it('should create an action to list persons', () => {
        const persons = [
            {
                id:   13,
                name: 'test'
            }
        ];
        const expectedAction = {
            type:    LIST_PERSON_SUCCESS,
            persons: persons
        };
        expect(listPersonsSuccess(persons)).toEqual(expectedAction)
    });
    it('should create an action to create person', () => {
        const expectedAction = {
            type: CREATE_PERSON
        };
        expect(createPerson()).toEqual(expectedAction)
    })
});
