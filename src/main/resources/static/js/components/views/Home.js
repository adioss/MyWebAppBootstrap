import React from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {increase, decrease} from '../../actions/count';

class Home extends React.Component {
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
                        <FormattedMessage id='home.title' defaultMessage='Home page'/>
                    </h1>
                </div>
                <br/>
                <div className='pure-g'>
                    <div className='pure-u-1-1 base-content'>
                        <FormattedMessage id='home.example.label' defaultMessage='Here a basic react component:'/>
                        <br/>
                        <FormattedMessage id='home.example.number.label' defaultMessage='Number:'/>
                        {this.props.number}
                        <br/>
                        <button onClick={() => this.props.increase(1)}>
                            <FormattedMessage id='home.example.button.increase.label' defaultMessage='Increase'/>
                        </button>
                        <button onClick={() => this.props.decrease(1)}>
                            <FormattedMessage id='home.example.button.decrease.label' defaultMessage='Decrease'/>
                        </button>
                        <br/>
                    </div>
                    <br/>
                </div>
            </div>)
    }

}

Home.propTypes = {
    number: React.PropTypes.number,
    increase: React.PropTypes.func,
    decrease: React.PropTypes.func
};

export default connect(
    (state) => ({number: state.count.number}),
    {increase, decrease}
)(Home)
