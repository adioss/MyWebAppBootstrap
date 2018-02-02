import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import EnterpriseEdit from '../../views/enterprise/EnterpriseEdit';
import {get, remove, save} from '../../../apis/EnterpriseApi';
import {getStore} from '../../../store';
import {createEnterprise, getEnterpriseSuccess} from '../../../actions/enterprise';
import {openErrorPopupWithContent} from '../../../actions/alertPopup';

class EnterpriseEditContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.params !== undefined && this.props.params.id !== undefined) {
            get(this.props.params.id, (enterprise) => getStore().dispatch(getEnterpriseSuccess(enterprise)));
        }
        else {
            getStore().dispatch(createEnterprise())
        }
    }

    render() {
        return ( //
            <div>
                <EnterpriseEdit {...this.props.enterprise} showError={this.props.showError} save={this.props.save} remove={this.props.remove}
                                cancel={this.props.cancel}/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        params:     ownProps.match.params,
        enterprise: state.enterpriseReducer.get('enterprise')
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showError: (message) => {
            getStore().dispatch(openErrorPopupWithContent(message));
        },
        save:      (enterprise) => {
            save(enterprise, () => dispatch(push('/enterprise/list')));
        },
        remove:    (id) => {
            remove(id, () => dispatch(push('/enterprise/list')));
        },
        cancel:    () => {
            dispatch(push('/enterprise/list'));
        }
    };
};

EnterpriseEditContainer.propTypes = {
    params:     PropTypes.any,
    enterprise: PropTypes.any,
    showError:  PropTypes.func.isRequired,
    save:       PropTypes.func.isRequired,
    cancel:     PropTypes.func.isRequired,
    remove:     PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(EnterpriseEditContainer);
