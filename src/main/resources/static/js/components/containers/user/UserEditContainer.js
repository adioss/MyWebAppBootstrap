import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {updateIntl} from 'react-intl-redux';
import UserEdit from '../../views/user/UserEdit';
import {get, remove, save} from '../../../apis/UserApi';
import {getStore} from '../../../store';
import {createUser, getUserSuccess} from '../../../actions/user';
import eni18n from '../../../i18n/en-US';
import fri18n from '../../../i18n/fr-FR';
import {openErrorPopupWithContent} from '../../../actions/alertPopup';

class UserEditContainer extends Component {
    constructor(props) {
        super(props);
        if (this.props.params !== undefined && this.props.params.id !== undefined) {
            get(this.props.params.id, (user) => {
                getStore().dispatch(getUserSuccess(user));
            });
        }
        else {
            getStore().dispatch(createUser());
        }
    }

    render() {
        return (<div>
                {this.props.user !== undefined && (this.props.user.id !== undefined || this.props.isNew) ?
                 <UserEdit {...this.props.user} showError={this.props.showError} save={this.props.save} remove={this.props.remove}
                           cancel={this.props.cancel}/> : <br/>}
            </div>
        );
    }
}

UserEditContainer.propTypes = {
    params:    PropTypes.any,
    user:      PropTypes.any,
    isNew:     PropTypes.bool,
    showError: PropTypes.func.isRequired,
    save:      PropTypes.func.isRequired,
    cancel:    PropTypes.func.isRequired,
    remove:    PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        params: ownProps.match.params,
        user:   state.userReducer.get('user'),
        isNew:  state.userReducer.get('isNew')
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showError: (message) => {
            dispatch(openErrorPopupWithContent(message));
        },
        save:      (user) => {
            save(user, () => {
                if (getStore().getState().currentUserReducer.get('currentUser').id === user.id) {
                    const language = [eni18n, fri18n].find((item) => item.language === user.language);
                    dispatch(updateIntl(language));
                }
                dispatch(push('/user/list'))
            });
        },
        remove:    (id) => {
            remove(id, () => dispatch(push('/user/list')));
        },
        cancel:    () => {
            dispatch(push('/user/list'));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEditContainer);
