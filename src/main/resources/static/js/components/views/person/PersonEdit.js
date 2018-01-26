import React from 'react';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {Button, Form, Header, Icon} from 'semantic-ui-react';
import {SimpleSelect} from 'react-selectize';
import {search} from '../../../apis/EnterpriseApi';

class PersonEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id:          props.id,
            name:        props.name,
            url:         props.url,
            enterprise:  props.enterprise,
            enterprises: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.enterprise !== null) {
            nextProps.enterprise.label = nextProps.enterprise.name;
        }
        this.state = nextProps;
        this.setState(this.state);
    }

    onSaveClicked() {
        this.props.save(this.state);
    }

    handleChange(item, event) {
        this.setState({[item]: event.target.value});
    }

    handleEnterpriseChange(enterprise) {
        this.setState({'enterprise': enterprise});
    }

    fetchEnterprise(filter) {
        this.setState({search: filter});
        if (filter.length > 0) {
            search(filter, //
                (result) => {
                    result = result.map((item) => {
                        item.label = item.name;
                        return item;
                    });
                    this.setState({enterprises: result});
                });
        }
    }

    render() {
        const {formatMessage} = this.props.intl;
        return (
            <div>
                <Header as='h2'>
                    <Icon name='industry'/>
                    <Header.Content>
                        <FormattedMessage id='person.title' defaultMessage='Person'/>
                        <Header.Subheader><FormattedMessage id='person.edition.title' defaultMessage='Person edition'/></Header.Subheader>
                    </Header.Content>
                </Header>
                <Form>
                    <Form.Field>
                        <label><FormattedMessage id='person.edition.label.name.value' defaultMessage='Name'/></label>
                        <input type='text' value={this.state.name} required onChange={this.handleChange.bind(this, 'name')}
                               placeholder={formatMessage({id: 'person.edition.input.name.placeholder'})}/>
                    </Form.Field>
                    <Form.Field>
                        <label><FormattedMessage id='person.edition.label.url.value' defaultMessage='Url'/></label>
                        <input type='url' value={this.state.url} required pattern='https?://.+' onChange={this.handleChange.bind(this, 'url')}
                               placeholder={formatMessage({id: 'person.edition.input.url.placeholder'})}/>
                    </Form.Field>
                    <Form.Field>
                        <label><FormattedMessage id='person.edition.label.enterprise.value' defaultMessage='Enterprise'/></label>
                        <SimpleSelect uid={(item) => item.name} ref='select' value={this.state.enterprise} options={this.state.enterprises}
                                      placeholder={formatMessage({id: 'person.edition.input.enterprise.placeholder'})}
                                      onValueChange={(selected) => this.handleEnterpriseChange(selected)}
                                      onSearchChange={(filter) => this.fetchEnterprise(filter)}/>
                    </Form.Field>
                    <Button primary onClick={() => this.onSaveClicked()}>
                        <FormattedMessage id='global.button.save.label' defaultMessage='Save'/>
                    </Button>
                    <Button negative onClick={() => this.props.remove(this.state.id)} className={this.state.id === null ? 'hidden' : ''}>
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

PersonEdit.propTypes = {
    intl:       intlShape.isRequired,
    id:         React.PropTypes.number,
    name:       React.PropTypes.string,
    label:      React.PropTypes.string,
    url:        React.PropTypes.string,
    enterprise: React.PropTypes.shape({
        id:    React.PropTypes.number.isRequired,
        name:  React.PropTypes.string.isRequired,
        label: React.PropTypes.string,
        url:   React.PropTypes.string.isRequired
    }),
    save:       React.PropTypes.func.isRequired,
    cancel:     React.PropTypes.func.isRequired,
    remove:     React.PropTypes.func.isRequired
};

PersonEdit.defaultProps = {
    id:         null,
    name:       '',
    url:        '',
    enterprise: null
};

export default injectIntl(PersonEdit);
