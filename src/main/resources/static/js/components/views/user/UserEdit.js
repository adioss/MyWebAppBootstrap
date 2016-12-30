import React from 'react';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {MultiSelect} from 'react-selectize';
import {ADMIN_ROLE, USER_ROLE, ENGLISH_LANGUAGE, FRENCH_LANGUAGE} from '../../../actions/constants';
import {changePassword} from '../../../apis/UserApi';
import AvatarEditor from './AvatarEditor';
import PasswordPopup from './PasswordPopup';

const roleDataProvider = [
    {'id': '0', 'name': ADMIN_ROLE, 'label': ADMIN_ROLE},
    {'id': '1', 'name': USER_ROLE, 'label': USER_ROLE}
];

class UserEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            username: props.username,
            email: props.email,
            language: props.language,
            roles: props.roles,
            avatarInputFile: props.avatarInputFile,
            isShowingModal: props.isShowingModal,
            isProfileEdition: props.isProfileEdition
        };
    }

    componentWillReceiveProps(nextProps) {
        this.state = nextProps;
        this.setState(this.state);
    }

    onSaveClicked() {
        this.props.save(this.state);
    }

    handleChange(item, event) {
        if (this.state.isShowingModal) {
            this.setState({'isShowingModal': false});
        }
        this.setState({[item]: event.target.value});
    }

    getInitialRoleValues() {
        if (this.state.roles == null) {
            return [];
        }
        return roleDataProvider
            .filter((element) => this.state.roles.indexOf(element.name) > -1)
            .map((item) => {
                     item.label = item.name;
                     return item;
                 }
            );
    }

    handleRolesChange(selectedRoles) {
        let roles = [];
        if (selectedRoles != null) {
            roles = selectedRoles.map((element) => element.name);
        }
        this.setState({'roles': roles});
    }

    onChangePasswordClick() {
        this.setState({'isShowingModal': true});
    }

    render() {
        const {formatMessage} = this.props.intl;
        return (
            <div>
                <div className='header'>
                    <h1 className='principal-content-title'>
                        <FormattedMessage id='user.edition.title' defaultMessage='User edition'/>
                    </h1>
                </div>
                <br/>
                <div className='pure-g'>
                    <div className='pure-u-1-1 base-content'>
                        <form className='pure-form pure-form-aligned'>
                            <fieldset>
                                <div className='pure-control-group'>
                                    <label>
                                        <FormattedMessage id='user.edition.label.username.value'
                                                          defaultMessage='Username'/>
                                    </label>
                                    <input type='text'
                                           placeholder={
                                               formatMessage({id: 'user.edition.input.username.placeholder'})
                                           }
                                           value={this.state.username}
                                           required
                                           readOnly={this.state.id != null}
                                           onChange={this.handleChange.bind(this, 'username')}/>
                                </div>
                                <div className='pure-control-group'>
                                    <label>
                                        <FormattedMessage id='user.edition.label.email.value' defaultMessage='Email'/>
                                    </label>
                                    <input type='email'
                                           placeholder={formatMessage({id: 'user.edition.input.email.placeholder'})}
                                           value={this.state.email}
                                           required
                                           onChange={this.handleChange.bind(this, 'email')}/>
                                </div>
                                <div className='pure-control-group'>
                                    <label>
                                        <FormattedMessage id='user.edition.label.language.value'
                                                          defaultMessage='Language'/>
                                    </label>
                                    <div className='pure-form-aligned-item'>
                                        <select ref='languageInput'
                                                value={this.state.language}
                                                onChange={this.handleChange.bind(this, 'language')}>
                                            <option value={ENGLISH_LANGUAGE}>
                                                {formatMessage({id: 'user.edition.label.language.english'})}
                                            </option>
                                            <option value={FRENCH_LANGUAGE}>
                                                {formatMessage({id: 'user.edition.label.language.french'})}
                                            </option>
                                        </select>

                                    </div>
                                </div>
                                <div className={this.state.id != null ? 'pure-control-group' : 'hidden'}>
                                    <label>
                                        <FormattedMessage id='user.edition.label.avatar.value'
                                                          defaultMessage='Avatar'/>
                                    </label>
                                    <AvatarEditor id={this.state.id}/>
                                </div>
                                <div className={this.state.isProfileEdition ? 'hidden' : 'pure-control-group'}>
                                    <label>
                                        <FormattedMessage id='user.edition.label.roles.value'
                                                          defaultMessage='Roles'/>
                                    </label>
                                    <div className='pure-form-aligned-item'>
                                        <MultiSelect
                                            options={roleDataProvider}
                                            placeholder={
                                                formatMessage({id: 'user.edition.input.role.placeholder'})
                                            }
                                            onValuesChange={(selectedRoles) => this.handleRolesChange(selectedRoles)}
                                            defaultValues={this.getInitialRoleValues()}
                                        />
                                    </div>
                                </div>
                                <div className={this.state.id != null ? 'pure-control-group' : 'hidden'}>
                                    <label>
                                        <FormattedMessage id='user.edition.password.change.label'
                                                          defaultMessage='Password'/>
                                    </label>
                                    <div className='pure-form-aligned-item'>
                                        <button type='button' className='pure-button'
                                                onClick={() => this.onChangePasswordClick()}>
                                            <FormattedMessage id='user.edition.password.change.button.label'
                                                              defaultMessage='Change password'/>
                                        </button>
                                        <PasswordPopup id={this.state.id} intl={formatMessage}
                                                       changePassword={this.props.changePassword}
                                                       isShowingModal={this.state.isShowingModal}/>
                                    </div>
                                </div>
                                <div className='pure-controls'>
                                    <button type='button' className='pure-button pure-button-primary'
                                            onClick={() => this.onSaveClicked()}>
                                        <FormattedMessage id='global.button.save.label' defaultMessage='Save'/>
                                    </button>
                                    <button type='button'
                                            className={
                                                this.state.id != null && this.props.remove != null ?
                                                    'pure-button button-error' :
                                                    'hidden'
                                            }
                                            onClick={() => this.props.remove(this.state.id)}>
                                        <FormattedMessage id='global.button.delete.label' defaultMessage='Delete'/>
                                    </button>
                                    <button type='button'
                                            className={
                                                this.props.cancel != null ?
                                                    'pure-button' :
                                                    'hidden'
                                            }
                                            onClick={() => this.props.cancel()}>
                                        <FormattedMessage id='global.button.cancel.label' defaultMessage='Cancel'/>
                                    </button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

UserEdit.propTypes = {
    intl: intlShape,
    id: React.PropTypes.number,
    username: React.PropTypes.string,
    email: React.PropTypes.string,
    language: React.PropTypes.string,
    roles: React.PropTypes.arrayOf(React.PropTypes.oneOf([ADMIN_ROLE, USER_ROLE])),
    isProfileEdition: React.PropTypes.bool,
    changePassword: React.PropTypes.func.isRequired,
    save: React.PropTypes.func.isRequired,
    cancel: React.PropTypes.func,
    remove: React.PropTypes.func,
    isShowingModal: React.PropTypes.bool,
    avatarInputFile: React.PropTypes.any
};

UserEdit.defaultProps = {
    id: null,
    username: '',
    email: '',
    language: 'ENGLISH',
    roles: [],
    avatarInputFile: null,
    changePassword: changePassword,
    isShowingModal: false,
    isProfileEdition: false
};

export default injectIntl(UserEdit);