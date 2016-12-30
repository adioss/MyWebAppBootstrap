import React from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import Pagination from 'rc-pagination';

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
                <div className='header'>
                    <h1 className='principal-content-title'>
                        <FormattedMessage id='person.list.title' defaultMessage='Person list'/>
                    </h1>
                </div>
                <br/>
                <div className='base-content'>
                    <button className='pure-button' onClick={() => this.props.create()}>
                        <FormattedMessage id='global.button.new.label' defaultMessage='New'/>&nbsp;
                        <FormattedMessage id='person.title' defaultMessage='Enterprise'/>
                    </button>
                    <br/>
                    <br/>
                    <div className='pure-g'>
                        <div className='pure-u-1-1'>
                            <table className='pure-table pure-table-bordered'>
                                <thead>
                                <tr>
                                    <th>
                                        <FormattedMessage id='global.list.column.header.id' defaultMessage='#'/>
                                    </th>
                                    <th>
                                        <FormattedMessage id='person.list.column.name.label' defaultMessage='Name'/>
                                    </th>
                                    <th>
                                        <FormattedMessage id='person.list.column.url.label' defaultMessage='Url'/>
                                    </th>
                                    <th>
                                        <FormattedMessage id='person.list.column.enterprise.label'
                                                          defaultMessage='Enterprise'/>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.props.persons != null && this.props.persons.content != null ?
                                        this.props.persons.content.map((person) =>
                                                                           <tr
                                                                               onClick={
                                                                                   () => {
                                                                                       this.props.edit(person.id)
                                                                                   }
                                                                               }
                                                                               key={person.id}>
                                                                               <td>{person.id}</td>
                                                                               <td>{person.name}</td>
                                                                               <td>{person.url}</td>
                                                                               <td>{person.enterprise != null ?
                                                                                   person.enterprise.name : ''}</td>
                                                                           </tr>
                                        ) : <tr/>
                                }
                                </tbody>
                            </table>
                        </div>
                        {this.props.persons != null && this.props.persons.totalElements != null ?
                            <Pagination
                                current={this.props.persons.number + 1}
                                total={this.props.persons.totalElements}
                                onChange={(page) => this.onPaginationChanged(page)}/> : <div/>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

PersonList.propTypes = {
    persons: React.PropTypes.shape(
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

PersonList.defaultProps = {
    persons: null
};

export default injectIntl(PersonList);
