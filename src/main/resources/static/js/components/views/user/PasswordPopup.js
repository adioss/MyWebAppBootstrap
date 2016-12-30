import React from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import Modal from 'react-modal';
import {simpleModal} from '../../../style/popup';

class PasswordPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            newPassword: props.newPassword,
            newPasswordValidation: props.newPasswordValidation,
            isShowingModal: props.isShowingModal
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
        this.props.changePassword(
            this.state.newPassword,
            this.state.newPasswordValidation,
            () => {
                this.onChangePasswordClose();
            }, this.state.id
        );
    }

    onChangePasswordClose() {
        this.setState({isShowingModal: false});
    }

    render() {
        const {formatMessage} = this.props.intl;
        return (
            <Modal isOpen={this.state.isShowingModal}
                   style={simpleModal}
                   onRequestClose={() => this.onChangePasswordClose()}
                   shouldCloseOnOverlayClick
                   contentLabel={formatMessage({id: 'user.password.popup.title'})}>
                <h1>
                    <FormattedMessage id='user.password.popup.title'
                                      defaultMessage='Change password'/>
                </h1>
                <form className='pure-form pure-form-aligned'>
                    <fieldset>
                        <div className='pure-control-group'>
                            <label>
                                <FormattedMessage id='user.password.new.label'
                                                  defaultMessage='New password'/>
                            </label>
                            <input type='password'
                                   placeholder={formatMessage({id: 'user.password.new.input.placeholder'})}
                                   value={this.state.newPassword}
                                   required
                                   onChange={this.handleChange.bind(this, 'newPassword')}/>
                        </div>
                        <div className='pure-control-group'>
                            <label>
                                <FormattedMessage id='user.password.validate.label'
                                                  defaultMessage='Validate password'/>
                            </label>
                            <input type='password'
                                   placeholder={formatMessage({id: 'user.password.validate.input.placeholder'})}
                                   value={this.state.newPasswordValidation} required
                                   onChange={this.handleChange.bind(this, 'newPasswordValidation')}/>
                        </div>
                        <div className='pure-controls'>
                            <button type='button' className='pure-button pure-button-primary'
                                    onClick={() => this.onSavePasswordClicked()}>
                                <FormattedMessage id='global.button.save.label'
                                                  defaultMessage='Save'/>
                            </button>
                            <button type='button' className='pure-button'
                                    onClick={() => this.onChangePasswordClose()}>
                                <FormattedMessage id='global.button.cancel.label'
                                                  defaultMessage='Cancel'/>
                            </button>
                        </div>
                    </fieldset>
                </form>
            </Modal>
        )
    }
}

PasswordPopup.propTypes = {
    intl: React.PropTypes.any,
    id: React.PropTypes.number,
    newPassword: React.PropTypes.string,
    newPasswordValidation: React.PropTypes.string,
    isShowingModal: React.PropTypes.bool,
    changePassword: React.PropTypes.func.isRequired
};

PasswordPopup.defaultProps = {
    id: null,
    newPassword: '',
    newPasswordValidation: '',
    isShowingModal: false
};

export default injectIntl(PasswordPopup);