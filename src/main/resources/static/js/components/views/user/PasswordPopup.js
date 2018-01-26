import React from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
// import Modal from 'react-modal';
import {Button, Form, Modal} from 'semantic-ui-react';

class PasswordPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id:                    props.id,
            newPassword:           props.newPassword,
            newPasswordValidation: props.newPasswordValidation,
            isShowingModal:        props.isShowingModal
        };
    }

    componentWillReceiveProps(nextProps) {
        this.state = nextProps;
        this.setState(this.state);
    }

    handleChange(item, event) {
        this.setState({[item]: event.target.value});
    }

    onSavePasswordClicked() {
        this.props.changePassword(this.state.newPassword, this.state.newPasswordValidation, () => {
            this.onChangePasswordClose();
        }, this.state.id);
    }

    onChangePasswordClose() {
        this.setState({isShowingModal: false});
    }

    render() {
        const {formatMessage} = this.props.intl;
        return (
            <Modal open={this.state.isShowingModal} closeIcon closeOnDimmerClick closeOnDocumentClick onClose={() => this.onChangePasswordClose()}>
                <Modal.Header><FormattedMessage id='user.password.popup.title' defaultMessage='Change password'/></Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            <Form.Field>
                                <label><FormattedMessage id='user.password.new.label' defaultMessage='New password'/></label>
                                <input type='password' value={this.state.newPassword} required
                                       placeholder={formatMessage({id: 'user.password.new.input.placeholder'})}
                                       onChange={this.handleChange.bind(this, 'newPassword')}/>
                            </Form.Field>
                            <Form.Field>
                                <label><FormattedMessage id='user.password.validate.label' defaultMessage='Validate password'/></label>
                                <input type='password' value={this.state.newPasswordValidation} required
                                       placeholder={formatMessage({id: 'user.password.validate.input.placeholder'})}
                                       onChange={this.handleChange.bind(this, 'newPasswordValidation')}/>
                            </Form.Field>
                            <Button primary onClick={() => this.onSavePasswordClicked()}>
                                <FormattedMessage id='global.button.save.label' defaultMessage='Save'/>
                            </Button>
                            <Button onClick={() => this.onChangePasswordClose()}>
                                <FormattedMessage id='global.button.cancel.label' defaultMessage='Cancel'/>
                            </Button>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

PasswordPopup.propTypes = {
    intl:                  React.PropTypes.any,
    id:                    React.PropTypes.number,
    newPassword:           React.PropTypes.string,
    newPasswordValidation: React.PropTypes.string,
    isShowingModal:        React.PropTypes.bool,
    changePassword:        React.PropTypes.func.isRequired
};

PasswordPopup.defaultProps = {
    id:                    null,
    newPassword:           '',
    newPasswordValidation: '',
    isShowingModal:        false
};

export default injectIntl(PasswordPopup);
