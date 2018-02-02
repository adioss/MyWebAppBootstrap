import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import UserList from '../../views/user/UserList';
import {list} from '../../../apis/UserApi';
import {getStore} from '../../../store';
import {listUsersSuccess} from '../../../actions/user';

class UserListContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        list((users) => getStore().dispatch(listUsersSuccess(users)));
    }

    render() {
        return ( //
            <div>
                <UserList users={this.props.users} list={this.props.list} edit={this.props.edit} create={this.props.create}/>
            </div>
        );
    }
}

UserListContainer.propTypes = {
    users:  PropTypes.any,
    isNew:  PropTypes.bool,
    list:   PropTypes.func.isRequired,
    edit:   PropTypes.func.isRequired,
    create: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        users: state.userReducer.get('users')
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        list:   (page, sort) => {
            list((users) => dispatch(listUsersSuccess(users)), page, sort);
        },
        edit:   (id) => {
            dispatch(push('/user/edit/' + id));
        },
        create: () => {
            dispatch(push('/user/new'));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserListContainer);
