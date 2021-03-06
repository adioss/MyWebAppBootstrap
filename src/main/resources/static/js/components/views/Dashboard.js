import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {decrease, increase} from '../../actions/count';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: props.number,
        };
    }

    render() {
        return (
            <div>
                <div className='header'>
                    <h1 className='principal-content-title'>
                        <FormattedMessage id='dashboard.title' defaultMessage='Dashboard page'/>
                    </h1>
                </div>
                <br/>
                <div>
                    <div>
                        <FormattedMessage id='dashboard.example.label' defaultMessage='Here a basic react component:'/>
                        <br/>
                        <FormattedMessage id='dashboard.example.number.label' defaultMessage='Number:'/>
                        {this.props.number}
                        <br/>
                        <button onClick={() => this.props.increase(1)}>
                            <FormattedMessage id='dashboard.example.button.increase.label' defaultMessage='Increase'/>
                        </button>
                        <button onClick={() => this.props.decrease(1)}>
                            <FormattedMessage id='dashboard.example.button.decrease.label' defaultMessage='Decrease'/>
                        </button>
                        <br/>
                    </div>
                    <br/>
                </div>
            </div>)
    }

}

Dashboard.propTypes = {
    number:   PropTypes.number,
    increase: PropTypes.func,
    decrease: PropTypes.func
};

export default connect((state) => ({number: state.count.number}), {
    increase,
    decrease
})(Dashboard)
