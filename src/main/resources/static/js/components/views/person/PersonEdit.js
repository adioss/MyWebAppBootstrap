import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {Button, Dropdown, Form, Header, Icon} from 'semantic-ui-react';
import {search} from '../../../apis/EnterpriseApi';

class PersonEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            person:      {
                id:         null,
                name:       '',
                url:        '',
                enterprise: {}
            },
            enterprises: []
        };
    }

    componentWillReceiveProps(nextProps) {
        const person = nextProps.person;
        if (nextProps.person.enterprise !== null && nextProps.person.enterprise !== undefined) {
            // this.fetchEnterprise({'searchQuery': nextProps.person.enterprise.name});
            person.enterprise.key = nextProps.person.enterprise.id;
            person.enterprise.text = nextProps.person.enterprise.name;
            person.enterprise.value = nextProps.person.enterprise.id;
            this.setState({enterprises: [person.enterprise]});
        }
        this.setState({
            person
        });
    }

    onSaveClicked() {
        this.props.save(this.state.person);
    }

    handleChange(item, event) {
        const person = Object.assign({}, this.state.person, {[item]: event.target.value});
        this.setState({person});
    }

    handleEnterpriseChange(data) {
        const enterprise = data.options.find((element) => element.value === data.value);
        const person = Object.assign({}, this.state.person, {enterprise});
        this.setState({person});
    }

    fetchEnterprise(filter) {
        this.setState({search: filter.searchQuery});
        search(filter.searchQuery, //
            (result) => {
                result = result.map((item) => {
                    item.key = item.value = item.id;
                    item.text = item.name;
                    return item;
                });
                this.setState({enterprises: result});
            });
    }

    render() {
        const {formatMessage} = this.props.intl;
        const {enterprise} = this.state.person;
        const {enterprises} = this.state;
        return (
            <div>
                <Header as='h2'>
                    <Icon name='address book'/>
                    <Header.Content>
                        <FormattedMessage id='person.title' defaultMessage='Person'/>
                        <Header.Subheader><FormattedMessage id='person.edition.title' defaultMessage='Person edition'/></Header.Subheader>
                    </Header.Content>
                </Header>
                <Form>
                    <Form.Field>
                        <label><FormattedMessage id='person.edition.label.name.value' defaultMessage='Name'/></label>
                        <input type='text' value={this.state.person.name} required onChange={this.handleChange.bind(this, 'name')}
                               placeholder={formatMessage({id: 'person.edition.input.name.placeholder'})}/>
                    </Form.Field>
                    <Form.Field>
                        <label><FormattedMessage id='person.edition.label.url.value' defaultMessage='Url'/></label>
                        <input type='url' value={this.state.person.url} required pattern='https?://.+' onChange={this.handleChange.bind(this, 'url')}
                               placeholder={formatMessage({id: 'person.edition.input.url.placeholder'})}/>
                    </Form.Field>
                    <Form.Field>
                        <label><FormattedMessage id='person.edition.label.enterprise.value' defaultMessage='Enterprise'/></label>
                        {enterprise !== undefined ? //
                         <Dropdown options={enterprises} value={enterprise.value} fluid search selection
                                   placeholder={formatMessage({id: 'person.edition.input.enterprise.placeholder'})}
                                   onChange={(event, data) => this.handleEnterpriseChange(data)}
                                   onSearchChange={(event, data) => this.fetchEnterprise(data)}/> : //
                         <Dropdown options={enterprises} fluid search selection placeholder={formatMessage({id: 'person.edition.input.enterprise.placeholder'})}
                                   onChange={(event, data) => this.handleEnterpriseChange(data)}
                                   onSearchChange={(event, data) => this.fetchEnterprise(data)}/>}

                    </Form.Field>
                    <Button primary onClick={() => this.onSaveClicked()}>
                        <FormattedMessage id='global.button.save.label' defaultMessage='Save'/>
                    </Button>
                    <Button negative onClick={() => this.props.remove(this.state.person.id)} className={this.state.person === null ? 'hidden' : ''}>
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
    intl:   intlShape.isRequired,
    person: PropTypes.shape({
        id:         PropTypes.number,
        name:       PropTypes.string,
        url:        PropTypes.string,
        enterprise: PropTypes.shape({
            id:    PropTypes.number,
            name:  PropTypes.string,
            url:   PropTypes.string,
            value: PropTypes.number
        })
    }),
    save:   PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
};

export default injectIntl(PersonEdit);
