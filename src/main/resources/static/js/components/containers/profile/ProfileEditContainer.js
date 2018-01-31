import React from 'react';
import {connect} from 'react-redux';
import {updateIntl} from 'react-intl-redux';
import UserEdit from '../../views/user/UserEdit';
import {changePassword, get, save} from '../../../apis/CurrentUserApi';
import {getCurrentUserSuccess} from '../../../actions/currentUser';
import eni18n from '../../../i18n/en-US';
import fri18n from '../../../i18n/fr-FR';
import {openErrorPopupWithContent} from '../../../actions/alertPopup';
import {getStore} from '../../../store';

class ProfileEditContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
                {this.props.user != null && this.props.user.id != null ?
                 <UserEdit {...this.props.user} isProfileEdition={this.props.isProfileEdition} changePassword={changePassword} showError={this.props.showError}
                           save={this.props.save}/> : <br/>}
            </div>
        );
    }
}

ProfileEditContainer.propTypes = {
    user:             React.PropTypes.any,
    isProfileEdition: React.PropTypes.bool,
    showError:        React.PropTypes.func.isRequired,
    save:             React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        user:             state.currentUserReducer.get('currentUser'),
        isProfileEdition: true
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showError: (message) => {
            getStore().dispatch(openErrorPopupWithContent(message));
        },
        save:      (user) => {
            save(user, () => {
                get((userLoaded) => {
                    dispatch(getCurrentUserSuccess(userLoaded));
                    const language = [eni18n, fri18n].find((item) => item.language === user.language);
                    dispatch(updateIntl(language));
                });

            });
        },
        remove:    null,
        cancel:    null
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditContainer);
