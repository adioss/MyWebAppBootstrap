import React from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import {Button, Header, Icon, Pagination, Table} from 'semantic-ui-react';

class PersonList extends React.Component {
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
                             <Table.Row onClick={() => this.props.edit(person.id)} key={person.id}>
                                 <Table.Cell>{person.id}</Table.Cell>
                                 <Table.Cell>{person.name}</Table.Cell>
                                 <Table.Cell>{person.url}</Table.Cell>
                                 <Table.Cell>{person.enterprise !== undefined ? person.enterprise.name : ''}</Table.Cell>
                             </Table.Row>) : <Table.Row/>}
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
    persons: React.PropTypes.shape({
        content:          React.PropTypes.any,
        first:            React.PropTypes.any,
        last:             React.PropTypes.any,
        number:           React.PropTypes.number,
        size:             React.PropTypes.number,
        totalElements:    React.PropTypes.number,
        totalPages:       React.PropTypes.number,
        numberOfElements: React.PropTypes.number,
        sort:             React.PropTypes.any
    }),
    list:    React.PropTypes.func.isRequired,
    edit:    React.PropTypes.func.isRequired,
    create:  React.PropTypes.func.isRequired
};

PersonList.defaultProps = {
    persons: null
};

export default injectIntl(PersonList);
