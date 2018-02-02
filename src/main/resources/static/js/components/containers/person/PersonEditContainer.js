import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import PersonEdit from '../../views/person/PersonEdit';
import {get, remove, save} from '../../../apis/PersonApi';
import {getStore} from '../../../store';
import {createPerson, getPersonSuccess} from '../../../actions/person';
import {openErrorPopupWithContent} from '../../../actions/alertPopup';

class PersonEditContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.params !== undefined && this.props.params.id !== undefined) {
            get(this.props.params.id, (person) => getStore().dispatch(getPersonSuccess(person)));
        }
        else {
            getStore().dispatch(createPerson())
        }
    }

    render() {
        return ( //
            <div>
                <PersonEdit {...this.props.person} showError={this.props.showError} save={this.props.save} remove={this.props.remove}
                            cancel={this.props.cancel}/>
            </div>
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        params: ownProps.match.params,
        person: state.personReducer.get('person')
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showError: (message) => {
            dispatch(openErrorPopupWithContent(message));
        },
        save:      (person) => {
            save(person, () => dispatch(push('/person/list')));
        },
        remove:    (id) => {
            remove(id, () => dispatch(push('/person/list')));
        },
        cancel:    () => {
            dispatch(push('/person/list'));
        }

    };
};

PersonEditContainer.propTypes = {
    params:    PropTypes.any,
    person:    PropTypes.any,
    showError: PropTypes.func.isRequired,
    save:      PropTypes.func.isRequired,
    cancel:    PropTypes.func.isRequired,
    remove:    PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonEditContainer);
