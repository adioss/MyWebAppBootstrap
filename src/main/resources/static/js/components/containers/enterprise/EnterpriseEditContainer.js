import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import EnterpriseEdit from '../../views/enterprise/EnterpriseEdit';
import {get, save, remove} from '../../../apis/EnterpriseApi';
import {getStore} from '../../../store';
import {getEnterpriseSuccess, createEnterprise} from '../../../actions/enterprise';
import {showErrorPopup} from '../../utils/PopupManager';

class EnterpriseEditContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.routeParams.id != undefined) {
            get(this.props.routeParams.id,
                (enterprise) => getStore().dispatch(getEnterpriseSuccess(enterprise))
            );
        } else {
            getStore().dispatch(createEnterprise())
        }
    }

    render() {
        return (<div>
                <EnterpriseEdit {...this.props.enterprise}
                                showError={this.props.showError}
                                save={this.props.save}
                                remove={this.props.remove}
                                cancel={this.props.cancel}
                />
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        enterprise: state.enterpriseReducer.get('enterprise')
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showError: (message) => {
            showErrorPopup(message);
        },
        save: (enterprise) => {
            save(enterprise, () => dispatch(push('/enterprise/list')));
        },
        remove: (id) => {
            remove(id, () => dispatch(push('/enterprise/list')));
        },
        cancel: () => {
            dispatch(push('/enterprise/list'));
        }
    };
};

EnterpriseEditContainer.propTypes = {
    routeParams: React.PropTypes.any,
    enterprise: React.PropTypes.any,
    showError: React.PropTypes.func.isRequired,
    save: React.PropTypes.func.isRequired,
    cancel: React.PropTypes.func.isRequired,
    remove: React.PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EnterpriseEditContainer);