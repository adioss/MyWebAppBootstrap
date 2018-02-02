import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import EnterpriseList from '../../views/enterprise/EnterpriseList';
import {list} from '../../../apis/EnterpriseApi';
import {getStore} from '../../../store';
import {listEnterprisesSuccess} from '../../../actions/enterprise';

class EnterpriseListContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        list((enterprises) => getStore().dispatch(listEnterprisesSuccess(enterprises)));
    }

    render() {
        return ( //
            <div>
                <EnterpriseList enterprises={this.props.enterprises} list={this.props.list} edit={this.props.edit} create={this.props.create}/>
            </div>
        );
    }
}

EnterpriseListContainer.propTypes = {
    enterprises: PropTypes.any,
    list:        PropTypes.func.isRequired,
    edit:        PropTypes.func.isRequired,
    create:      PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        enterprises: state.enterpriseReducer.get('enterprises')
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        list:   (page, sort) => {
            list((enterprises) => dispatch(listEnterprisesSuccess(enterprises)), page, sort);
        },
        edit:   (id) => {
            dispatch(push('/enterprise/edit/' + id));
        },
        create: () => {
            dispatch(push('/enterprise/new'));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EnterpriseListContainer);
