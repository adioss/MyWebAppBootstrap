import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {updateIntl} from 'react-intl-redux';
import UserEdit from '../../views/user/UserEdit';
import {get, save, remove} from '../../../apis/UserApi';
import {getStore} from '../../../store';
import {getUserSuccess, createUser} from '../../../actions/user';
import {showErrorPopup} from '../../utils/PopupManager';
import eni18n from '../../../i18n/en-US';
import fri18n from '../../../i18n/fr-FR';

class UserEditContainer extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.routeParams.id != undefined) {
            get(this.props.routeParams.id, (user) => {
                    getStore().dispatch(getUserSuccess(user));
                }
            );
        } else {
            getStore().dispatch(createUser());
        }
    }

    render() {
        return (<div>
                {this.props.user != null && (this.props.user.id != null || this.props.isNew) ?
                    <UserEdit {...this.props.user}
                              showError={this.props.showError}
                              save={this.props.save}
                              remove={this.props.remove}
                              cancel={this.props.cancel}
                    />
                    : <br/>}
            </div>
        );
    }
}

UserEditContainer.propTypes = {
    routeParams: React.PropTypes.any,
    user: React.PropTypes.any,
    isNew: React.PropTypes.bool,
    showError: React.PropTypes.func.isRequired,
    save: React.PropTypes.func.isRequired,
    cancel: React.PropTypes.func.isRequired,
    remove: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.get('user'),
        isNew: state.userReducer.get('isNew')
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showError: (message) => {
            showErrorPopup(message);
        },
        save: (user) => {
            save(user, () => {
                     if (getStore().getState().currentUserReducer.get('currentUser').id === user.id) {
                         const language = [eni18n, fri18n].find((item) => item.language === user.language);
                         getStore().dispatch(updateIntl(language));
                     }
                     dispatch(push('/user/list'))
                 }
            );
        },
        remove: (id) => {
            remove(id, () => dispatch(push('/user/list')));
        },
        cancel: () => {
            dispatch(push('/user/list'));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEditContainer);