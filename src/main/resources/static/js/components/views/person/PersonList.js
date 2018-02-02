import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl} from 'react-intl';
import {Button, Header, Icon, Pagination, Table} from 'semantic-ui-react';

class PersonList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            persons: props.persons
        };
    }

    onPaginationChanged(page) {
        this.props.list(page - 1, null);
    }

    render() {
        return (
            <div>
                <Header as='h2'>
                    <Icon name='address book'/>
                    <Header.Content>
                        <FormattedMessage id='person.title' defaultMessage='Person'/>
                        <Header.Subheader>
                            <FormattedMessage id='person.list.title' defaultMessage='Manage persons'/>
                        </Header.Subheader>
                    </Header.Content>
                </Header>
                <Table compact celled definition>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell/>
                            <Table.HeaderCell><FormattedMessage id='person.list.column.name.label' defaultMessage='Name'/></Table.HeaderCell>
                            <Table.HeaderCell><FormattedMessage id='person.list.column.url.label' defaultMessage='Url'/></Table.HeaderCell>
                            <Table.HeaderCell><FormattedMessage id='person.list.column.enterprise.label' defaultMessage='Enterprise'/></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.props.persons !== undefined && this.props.persons.content !== undefined ? //
                         this.props.persons.content.map((person) => //
                             (<Table.Row onClick={() => this.props.edit(person.id)} key={person.id}>
                                 <Table.Cell>{person.id}</Table.Cell>
                                 <Table.Cell>{person.name}</Table.Cell>
                                 <Table.Cell>{person.url}</Table.Cell>
                                 <Table.Cell>{person.enterprise !== undefined && person.enterprise !== null ? person.enterprise.name : ''}</Table.Cell>
                             </Table.Row>)) : <Table.Row/>}
                    </Table.Body>
                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell colSpan='4'>
                                <Button floated='right' icon labelPosition='left' primary size='small' onClick={() => this.props.create()}>
                                    <Icon name='industry'/>
                                    <FormattedMessage id='global.button.new.label' defaultMessage='New'/>&nbsp;
                                    <FormattedMessage id='person.title' defaultMessage='Person'/>
                                </Button>
                                {this.props.persons !== undefined && this.props.persons.totalElements !== undefined ? //
                                 <Pagination defaultActivePage={this.props.persons.number + 1} totalPages={this.props.persons.totalPages}
                                             onPageChange={(event, data) => this.onPaginationChanged(data.activePage)}/> : <div/>}
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </div>
        );
    }
}

PersonList.propTypes = {
    persons: PropTypes.shape({
        content:          PropTypes.any,
        first:            PropTypes.any,
        last:             PropTypes.any,
        number:           PropTypes.number,
        size:             PropTypes.number,
        totalElements:    PropTypes.number,
        totalPages:       PropTypes.number,
        numberOfElements: PropTypes.number,
        sort:             PropTypes.any
    }),
    list:    PropTypes.func.isRequired,
    edit:    PropTypes.func.isRequired,
    create:  PropTypes.func.isRequired
};

PersonList.defaultProps = {
    persons: null
};

export default injectIntl(PersonList);
