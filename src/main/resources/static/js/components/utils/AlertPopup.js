import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Message, Portal} from 'semantic-ui-react';
import {injectIntl, intlShape} from 'react-intl';

export const ERROR_TYPE = 'ERROR_TYPE';
export const INFO_TYPE = 'INFO_TYPE';

class AlertPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content:  '',
            messages: undefined,
            status:   ERROR_TYPE,
            visible:  false
        };
    }

    componentWillReceiveProps(nextProps) {
        let content = '';
        if (nextProps.content !== undefined) {
            content = nextProps.content;
        }
        else if (nextProps.messages !== undefined) {
            const intl = nextProps.intl;
            const messages = nextProps.messages;
            content = Array.isArray(messages) ? this.extractMessages(messages, intl) : this.extractMessage(messages, intl);
        }

        this.setState(Object.assign({}, this.state, {
            visible: nextProps.visible,
            status:  nextProps.status,
            content
        }));
    }

    onDismissClicked() {
        this.setState({visible: false})
    }

    extractMessages(errors, intl) {
        let message = '';
        errors.forEach((error) => {
            message += (message === '' ? '' : ' ') + this.extractMessage(error, intl);
        });
        return message;
    }

    extractMessage(error, intl) {
        let formatMessage;
        try {
            formatMessage = intl.formatMessage({id: error.defaultMessage});
        }
        catch (e1) {
            if (error.message !== null && error.message !== undefined) {
                try {
                    formatMessage = intl.formatMessage({id: error.message});
                }
                catch (e2) {
                    if (error.error !== null && error.error !== undefined) {
                        try {
                            formatMessage = intl.formatMessage({id: error.error});
                        }
                        catch (e3) {
                            formatMessage = error.error;
                        }
                    }
                }
            }
            else {
                formatMessage = error.defaultMessage;
            }
        }
        return formatMessage;
    }

    render() {
        const style = {
            width:    '50%',
            left:     '30%',
            position: 'fixed',
            top:      '1%',
            zIndex:   1000
        };
        return (
            <Portal basic content={this.state.content} open={this.state.visible} position='bottom center' onClose={() => this.onDismissClicked()}>
                <Message header={this.state.status === ERROR_TYPE ? 'Error' : 'Info'} content={this.state.content} onDismiss={() => this.onDismissClicked()}
                         style={style} compact icon={this.state.status === ERROR_TYPE ? 'warning sign' : 'info circle'}
                         positive={this.state.status === INFO_TYPE} negative={this.state.status === ERROR_TYPE}/>
            </Portal>
        );
    }
}

AlertPopup.propTypes = {
    intl:     intlShape,
    visible:  PropTypes.bool,
    content:  PropTypes.string,
    messages: PropTypes.arrayOf(PropTypes.any),
    status:   PropTypes.string
};

export default injectIntl(AlertPopup);
