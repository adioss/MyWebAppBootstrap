import React from 'react';
import {FormattedMessage} from 'react-intl';
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
                <div className='header'>
                    <h1 className='principal-content-title'>
                        <FormattedMessage id='enterprise.list.title' defaultMessage='Enterprise list'/>
                    </h1>
                </div>
                <br/>
                <div className='base-content'>
                    <button className='pure-button' onClick={() => this.props.create()}>
                        <FormattedMessage id='global.button.new.label' defaultMessage='New'/>&nbsp;
                        <FormattedMessage id='enterprise.title' defaultMessage='Enterprise'/>
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
                                        <FormattedMessage id='enterprise.list.column.name.label' defaultMessage='Name'/>
                                    </th>
                                    <th>
                                        <FormattedMessage id='enterprise.list.column.url.label' defaultMessage='Url'/>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.props.enterprises != null && this.props.enterprises.content != null ?
                                    this.props.enterprises.content
                                        .map((enterprise) =>
                                                 <tr onClick={() =>
                                                     this.props.edit(
                                                         enterprise.id
                                                     )
                                                 }
                                                     key={enterprise.id}>
                                                     <td>{enterprise.id}</td>
                                                     <td>{enterprise.name}</td>
                                                     <td>{enterprise.url}</td>
                                                 </tr>
                                        ) : <tr/>
                                }
                                </tbody>
                            </table>
                        </div>
                        {this.props.enterprises != null && this.props.enterprises.totalElements != null ?
                            <Pagination
                                current={this.props.enterprises.number + 1}
                                total={this.props.enterprises.totalElements}
                                onChange={(page) => this.onPaginationChanged(page)}/> : <div/>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

EnterpriseList.propTypes = {
    enterprises: React.PropTypes.shape(
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

EnterpriseList.defaultProps = {
    enterprises: null
};

export default EnterpriseList;
