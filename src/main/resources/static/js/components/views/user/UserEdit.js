import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {Button, Form, Header, Icon} from 'semantic-ui-react';
import {ADMIN_ROLE, ENGLISH_LANGUAGE, FRENCH_LANGUAGE, USER_ROLE} from '../../../actions/constants';
import {changePassword} from '../../../apis/UserApi';
import AvatarEditor from './AvatarEditor';
import PasswordPopup from './PasswordPopup';

const roleDataProvider = [
    {
        'id':    '0',
        'name':  ADMIN_ROLE,
        'label': ADMIN_ROLE
    }, {
        'id':    '1',
        'name':  USER_ROLE,
        'label': USER_ROLE
    }
];

class UserEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:               props.id,
            username:         props.username,
            email:            props.email,
            language:         props.language,
            roles:            props.roles,
            avatarInputFile:  props.avatarInputFile,
            isShowingModal:   props.isShowingModal,
            isProfileEdition: props.isProfileEdition
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
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
            });
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
                <Header as='h2'>
                    <Icon name='users'/>
                    <Header.Content>
                        <FormattedMessage id='user.title' defaultMessage='User'/>
                        <Header.Subheader><FormattedMessage id='user.edition.title' defaultMessage='User edition'/></Header.Subheader>
                    </Header.Content>
                </Header>
                <Form>
                    <Form.Field>
                        <label><FormattedMessage id='user.edition.label.username.value' defaultMessage='Username'/></label>
                        <input type='text' value={this.state.username} required onChange={this.handleChange.bind(this, 'username')}
                               placeholder={formatMessage({id: 'user.edition.input.username.placeholder'})}/>
                    </Form.Field>
                    <Form.Field>
                        <label><FormattedMessage id='user.edition.label.email.value' defaultMessage='Email'/></label>
                        <input type='text' value={this.state.email} required onChange={this.handleChange.bind(this, 'email')}
                               placeholder={formatMessage({id: 'user.edition.input.email.placeholder'})}/>
                    </Form.Field>
                    <Form.Field>
                        <label><FormattedMessage id='user.edition.label.language.value' defaultMessage='Language'/></label>
                        <select ref='languageInput' value={this.state.language} onChange={this.handleChange.bind(this, 'language')}>
                            <option value={ENGLISH_LANGUAGE}>{formatMessage({id: 'user.edition.label.language.english'})}</option>
                            <option value={FRENCH_LANGUAGE}>{formatMessage({id: 'user.edition.label.language.french'})}</option>
                        </select>
                    </Form.Field>
                    <Form.Field className={this.state.id === null ? 'hidden' : ''}>
                        <label><FormattedMessage id='user.edition.label.avatar.value' defaultMessage='Avatar'/></label>
                        <AvatarEditor id={this.state.id}/>
                    </Form.Field>
                    <Form.Field className={this.state.isProfileEdition ? 'hidden' : ''}>
                        <label><FormattedMessage id='user.edition.label.roles.value' defaultMessage='Roles'/></label>
                        {/*TODO */}
                        {/*<MultiSelect options={roleDataProvider} placeholder={formatMessage({id: 'user.edition.input.role.placeholder'})}*/}
                        {/*defaultValues={this.getInitialRoleValues()} onValuesChange={(selectedRoles) => this.handleRolesChange(selectedRoles)}/>*/}
                    </Form.Field>
                    <Form.Field className={this.state.id === null ? 'hidden' : ''}>
                        <label><FormattedMessage id='user.edition.password.change.label' defaultMessage='Password'/></label>
                        <Button onClick={() => this.onChangePasswordClick()}>
                            <FormattedMessage id='user.edition.password.change.button.label' defaultMessage='Change password'/>
                        </Button>
                        <PasswordPopup id={this.state.id} intl={formatMessage} changePassword={this.props.changePassword}
                                       isShowingModal={this.state.isShowingModal}/>
                    </Form.Field>
                    <Button primary onClick={() => this.onSaveClicked()}>
                        <FormattedMessage id='global.button.save.label' defaultMessage='Save'/>
                    </Button>
                    <Button negative onClick={() => this.props.remove(this.state.id)}
                            className={this.state.id === null || this.props.remove === undefined ? 'hidden' : ''}>
                        <FormattedMessage id='global.button.delete.label' defaultMessage='Delete' className='hidden'/>
                    </Button>
                    <Button onClick={() => this.props.cancel()} className={this.props.cancel === undefined ? 'hidden' : ''}>
                        <FormattedMessage id='global.button.cancel.label' defaultMessage='Cancel'/>
                    </Button>
                </Form>
            </div>
        )
    }
}

UserEdit.propTypes = {
    intl:             intlShape,
    id:               PropTypes.number,
    username:         PropTypes.string,
    email:            PropTypes.string,
    language:         PropTypes.string,
    roles:            PropTypes.arrayOf(PropTypes.oneOf([ADMIN_ROLE, USER_ROLE])),
    isProfileEdition: PropTypes.bool,
    changePassword:   PropTypes.func.isRequired,
    save:             PropTypes.func.isRequired,
    cancel:           PropTypes.func,
    remove:           PropTypes.func,
    isShowingModal:   PropTypes.bool,
    avatarInputFile:  PropTypes.any
};

UserEdit.defaultProps = {
    id:               null,
    username:         '',
    email:            '',
    language:         'ENGLISH',
    roles:            [],
    avatarInputFile:  null,
    changePassword:   changePassword,
    isShowingModal:   false,
    isProfileEdition: false
};

export default injectIntl(UserEdit);
