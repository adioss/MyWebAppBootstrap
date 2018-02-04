import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {Button, Form, Header, Icon} from 'semantic-ui-react';

class EnterpriseEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enterprise: {
                id:   -1,
                name: '',
                url:  ''
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        const enterprise = nextProps.enterprise;
        this.setState({enterprise});
    }

    onSaveClicked() {
        this.props.save(this.state.enterprise);
    }

    handleChange(item, event) {
        const enterprise = Object.assign({}, this.state.enterprise, {[item]: event.target.value});
        this.setState({enterprise});
    }

    render() {
        const {formatMessage} = this.props.intl;
        return (
            <div>
                <Header as='h2'>
                    <Icon name='industry'/>
                    <Header.Content>
                        <FormattedMessage id='enterprise.title' defaultMessage='Enterprise'/>
                        <Header.Subheader><FormattedMessage id='enterprise.edition.title' defaultMessage='Enterprise edition'/></Header.Subheader>
                    </Header.Content>
                </Header>
                <Form>
                    <Form.Field>
                        <label><FormattedMessage id='enterprise.edition.label.name.value' defaultMessage='Name'/></label>
                        <input type='text' value={this.state.enterprise.name} required onChange={this.handleChange.bind(this, 'name')}
                               placeholder={formatMessage({id: 'enterprise.edition.input.name.placeholder'})}/>
                    </Form.Field>
                    <Form.Field>
                        <label><FormattedMessage id='enterprise.edition.label.url.value' defaultMessage='Url'/></label>
                        <input type='url' value={this.state.enterprise.url} required pattern='https?://.+' onChange={this.handleChange.bind(this, 'url')}
                               placeholder={formatMessage({id: 'enterprise.edition.input.url.placeholder'})}/>
                    </Form.Field>
                    <Button primary onClick={() => this.onSaveClicked()}>
                        <FormattedMessage id='global.button.save.label' defaultMessage='Save'/>
                    </Button>
                    <Button negative onClick={() => this.props.remove(this.state.enterprise.id)} className={this.state.enterprise.id === null ? 'hidden' : ''}>
                        <FormattedMessage id='global.button.delete.label' defaultMessage='Delete' className='hidden'/>
                    </Button>
                    <Button onClick={() => this.props.cancel()}>
                        <FormattedMessage id='global.button.cancel.label' defaultMessage='Cancel'/>
                    </Button>
                </Form>
            </div>
        );
    }
}

EnterpriseEdit.propTypes = {
    intl:       intlShape.isRequired,
    enterprise: PropTypes.shape({
        id:   PropTypes.number,
        name: PropTypes.string,
        url:  PropTypes.string
    }),
    save:       PropTypes.func.isRequired,
    cancel:     PropTypes.func.isRequired,
    remove:     PropTypes.func.isRequired
};

export default injectIntl(EnterpriseEdit);
