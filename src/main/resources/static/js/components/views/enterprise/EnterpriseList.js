import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Button, Header, Icon, Table} from 'semantic-ui-react';
import Pagination from 'rc-pagination';

class EnterpriseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enterprises: props.enterprises
        };
    }

    onPaginationChanged(page) {
        this.props.list(page - 1, null);
    }

    render() {
        return (
            <div>
                <Header as='h2'>
                    <Icon name='industry'/>
                    <Header.Content>
                        <FormattedMessage id='enterprise.title' defaultMessage='Enterprise'/>
                        <Header.Subheader>
                            <FormattedMessage id='enterprise.list.title' defaultMessage='Manage enterprises'/>
                        </Header.Subheader>
                    </Header.Content>
                </Header>
                <Table compact celled definition>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell/>
                            <Table.HeaderCell><FormattedMessage id='enterprise.list.column.name.label' defaultMessage='Name'/></Table.HeaderCell>
                            <Table.HeaderCell><FormattedMessage id='enterprise.list.column.url.label' defaultMessage='Url'/></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.props.enterprises != null && this.props.enterprises.content != null ? this.props.enterprises.content
                            .map((enterprise) => //
                                <Table.Row onClick={() => this.props.edit(enterprise.id)} key={enterprise.id}>
                                    <Table.Cell>{enterprise.id}</Table.Cell>
                                    <Table.Cell>{enterprise.name}</Table.Cell>
                                    <Table.Cell>{enterprise.url}</Table.Cell>
                                </Table.Row>) : <Table.Row/>}
                    </Table.Body>
                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell colSpan='3'>
                                <Button floated='right' icon labelPosition='left' primary size='small' onClick={() => this.props.create()}>
                                    <Icon name='industry'/>
                                    <FormattedMessage id='global.button.new.label' defaultMessage='New'/>&nbsp;
                                    <FormattedMessage id='enterprise.title' defaultMessage='Enterprise'/>
                                </Button>
                                {this.props.enterprises != null && this.props.enterprises.totalElements != null ? //
                                 <Pagination current={this.props.enterprises.number + 1} total={this.props.enterprises.totalElements}
                                             onChange={(page) => this.onPaginationChanged(page)}/> : <div/>}
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </div>
        );
    }
}

EnterpriseList.propTypes = {
    enterprises: React.PropTypes.shape({
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
    list:        React.PropTypes.func.isRequired,
    edit:        React.PropTypes.func.isRequired,
    create:      React.PropTypes.func.isRequired
};

EnterpriseList.defaultProps = {
    enterprises: null
};

export default EnterpriseList;
