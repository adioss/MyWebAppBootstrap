import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import PersonEdit from '../../views/person/PersonEdit';
import {get, remove, save} from '../../../apis/PersonApi';
import {getStore} from '../../../store';
import {createPerson, getPersonSuccess} from '../../../actions/person';
import {openErrorPopupWithContent} from '../../../actions/alertPopup';

class PersonEditContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.routeParams.id != undefined) {
            get(this.props.routeParams.id, (person) => getStore().dispatch(getPersonSuccess(person)));
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

const mapStateToProps = (state) => {
    return {
        person: state.personReducer.get('person')
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showError: (message) => {
            getStore().dispatch(openErrorPopupWithContent(message));
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
    routeParams: React.PropTypes.any,
    person:      React.PropTypes.any,
    showError:   React.PropTypes.func.isRequired,
    save:        React.PropTypes.func.isRequired,
    cancel:      React.PropTypes.func.isRequired,
    remove:      React.PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonEditContainer);
