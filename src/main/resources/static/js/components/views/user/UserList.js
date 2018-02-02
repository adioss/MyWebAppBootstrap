import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl} from 'react-intl';
import {Button, Header, Icon, Pagination, Table} from 'semantic-ui-react';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: props.users
        };
    }

    onPaginationChanged(page) {
        this.props.list(page - 1, null);
    }

    render() {
        return (
            <div>
                <Header as='h2'>
                    <Icon name='users'/>
                    <Header.Content>
                        <FormattedMessage id='user.title' defaultMessage='User'/>
                        <Header.Subheader>
                            <FormattedMessage id='user.list.title' defaultMessage='Manage users'/>
                        </Header.Subheader>
                    </Header.Content>
                </Header>
                <Table compact celled definition>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell/>
                            <Table.HeaderCell><FormattedMessage id='user.list.column.name.label' defaultMessage='Name'/></Table.HeaderCell>
                            <Table.HeaderCell><FormattedMessage id='user.list.column.email.label' defaultMessage='Email'/></Table.HeaderCell>
                            <Table.HeaderCell><FormattedMessage id='user.list.column.roles.label' defaultMessage='Roles'/></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.props.users !== undefined && this.props.users.content !== undefined ? //
                         this.props.users.content.map((user) => //
                             (<Table.Row onClick={() => this.props.edit(user.id)} key={user.id}>
                                 <Table.Cell>{user.id}</Table.Cell>
                                 <Table.Cell>{user.username}</Table.Cell>
                                 <Table.Cell>{user.email}</Table.Cell>
                                 <Table.Cell>{user.roles !== undefined ? user.roles.join(', ') : ''}</Table.Cell>
                             </Table.Row>)) : <Table.Row/>}
                    </Table.Body>
                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell colSpan='4'>
                                <Button floated='right' icon labelPosition='left' primary size='small' onClick={() => this.props.create()}>
                                    <Icon name='industry'/>
                                    <FormattedMessage id='global.button.new.label' defaultMessage='New'/>&nbsp;
                                    <FormattedMessage id='user.title' defaultMessage='User'/>
                                </Button>
                                {this.props.users !== undefined && this.props.users.totalElements !== undefined ? //
                                 <Pagination defaultActivePage={this.props.users.number + 1} totalPages={this.props.users.totalPages}
                                             onPageChange={(event, data) => this.onPaginationChanged(data.activePage)}/> : <div/>}
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </div>
        );
    }
}

UserList.propTypes = {
    users:  PropTypes.shape({
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
    list:   PropTypes.func.isRequired,
    edit:   PropTypes.func.isRequired,
    create: PropTypes.func.isRequired
};

UserList.defaultProps = {
    users: null
};

export default injectIntl(UserList);
