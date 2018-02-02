import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import PersonList from '../../views/person/PersonList';
import {list} from '../../../apis/PersonApi';
import {getStore} from '../../../store';
import {listPersonsSuccess} from '../../../actions/person';

class PersonListContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        list((persons) => getStore().dispatch(listPersonsSuccess(persons)));
    }

    render() {
        return ( //
            <div>
                <PersonList persons={this.props.persons} list={this.props.list} edit={this.props.edit} create={this.props.create}/>
            </div>
        );
    }

}

PersonListContainer.propTypes = {
    persons: PropTypes.any,
    list:    PropTypes.func.isRequired,
    edit:    PropTypes.func.isRequired,
    create:  PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        persons: state.personReducer.get('persons')
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        list:   (page, sort) => {
            list((persons) => dispatch(listPersonsSuccess(persons)), page, sort);
        },
        edit:   (id) => {
            dispatch(push('/person/edit/' + id));
        },
        create: () => {
            dispatch(push('/person/new'));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonListContainer);
