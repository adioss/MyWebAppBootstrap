import React from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import Pagination from 'rc-pagination';

class UserList extends React.Component {
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
                <div className='header'>
                    <h1 className='principal-content-title'>
                        <FormattedMessage id='user.list.title' defaultMessage='User list'/>
                    </h1>
                </div>
                <br/>
                <div className='base-content'>
                    <button className='pure-button' onClick={() => this.props.create()}>
                        <FormattedMessage id='global.button.new.label' defaultMessage='New'/>&nbsp;
                        <FormattedMessage id='user.title' defaultMessage='Enterprise'/>
                    </button>
                    <br/>
                    <br/>
                    <div className='pure-g'>
                        <div className='pure-u-1-1'>
                            <table className='pure-table pure-table-bordered'>
                                <thead>
                                <tr>
                                    <th>
                                        <FormattedMessage id='global.list.column.header.id'
                                                          defaultMessage='#'/>
                                    </th>
                                    <th>
                                        <FormattedMessage id='user.list.column.name.label' defaultMessage='Name'/>
                                    </th>
                                    <th>
                                        <FormattedMessage id='user.list.column.email.label' defaultMessage='Email'/>
                                    </th>
                                    <th>
                                        <FormattedMessage id='user.list.column.roles.label' defaultMessage='Roles'/>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.props.users != null && this.props.users.content != null ?
                                        this.props.users.content.map((user) =>
                                                                         <tr onClick={() => this.props.edit(user.id
                                                                         )} key={user.id}>
                                                                             <td>{user.id}</td>
                                                                             <td>{user.username}</td>
                                                                             <td>{user.email}</td>
                                                                             <td>{user.roles.join(', ')}</td>
                                                                         </tr>
                                        ) : <tr/>
                                }
                                </tbody>
                            </table>
                        </div>
                        {this.props.users != null && this.props.users.totalElements != null ?
                            <Pagination
                                current={this.props.users.number + 1}
                                total={this.props.users.totalElements}
                                onChange={(page) => this.onPaginationChanged(page)}/> : <div/>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

UserList.propTypes = {
    users: React.PropTypes.shape(
        {
            content: React.PropTypes.any,
            first: React.PropTypes.any,
            last: React.PropTypes.any,
            number: React.PropTypes.number,
            size: React.PropTypes.number,
            totalElements: React.PropTypes.number,
            totalPages: React.PropTypes.number,
            numberOfElements: React.PropTypes.number,
            sort: React.PropTypes.any
        }
    ),
    list: React.PropTypes.func.isRequired,
    edit: React.PropTypes.func.isRequired,
    create: React.PropTypes.func.isRequired
};

UserList.defaultProps = {
    users: null
};

export default injectIntl(UserList);
