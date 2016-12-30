import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import EnterpriseList from '../../views/enterprise/EnterpriseList';
import {list} from '../../../apis/EnterpriseApi';
import {getStore} from '../../../store';
import {listEnterprisesSuccess} from '../../../actions/enterprise';

class EnterpriseListContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        list((enterprises) => getStore().dispatch(listEnterprisesSuccess(enterprises)));
    }

    render() {
        return (<div>
                <EnterpriseList enterprises={this.props.enterprises}
                                list={this.props.list}
                                edit={this.props.edit}
                                create={this.props.create}/>
            </div>
        );
    }
}

EnterpriseListContainer.propTypes = {
    enterprises: React.PropTypes.any,
    list: React.PropTypes.func.isRequired,
    edit: React.PropTypes.func.isRequired,
    create: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        enterprises: state.enterpriseReducer.get('enterprises')
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        list: (page, sort) => {
            list((enterprises) => dispatch(listEnterprisesSuccess(enterprises)), page, sort);
        },
        edit: (id) => {
            dispatch(push('/enterprise/edit/' + id));
        },
        create: () => {
            dispatch(push('/enterprise/new'));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EnterpriseListContainer);