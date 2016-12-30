import React from 'react';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';

class EnterpriseEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: props.name,
            url: props.url,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.state = nextProps;
        this.setState(this.state);
    }

    onSaveClicked() {
        this.props.save(this.state);
    }

    handleChange(item, event) {
        this.setState({[item]: event.target.value});
    }

    render() {
        const {formatMessage} = this.props.intl;
        return (
            <div>
                <div className='header'>
                    <h1 className='principal-content-title'>
                        <FormattedMessage id='enterprise.edition.title' defaultMessage='Enterprise edition'/>
                    </h1>
                </div>
                <br/>
                <div className='pure-g'>
                    <div className='pure-u-1-1 base-content'>
                        <form className='pure-form pure-form-aligned'>
                            <fieldset>
                                <div className='pure-control-group'>
                                    <label>
                                        <FormattedMessage id='enterprise.edition.label.name.value'
                                                          defaultMessage='Name'/>
                                    </label>
                                    <input type='text'
                                           placeholder={
                                               formatMessage({id: 'enterprise.edition.input.name.placeholder'})
                                           }
                                           value={this.state.name}
                                           required
                                           onChange={this.handleChange.bind(this, 'name')}/>
                                </div>
                                <div className='pure-control-group'>
                                    <label><FormattedMessage id='enterprise.edition.label.url.value'
                                                             defaultMessage='Url'/>
                                    </label>
                                    <input type='url'
                                           placeholder={formatMessage({id: 'enterprise.edition.input.url.placeholder'})}
                                           value={this.state.url}
                                           required pattern='https?://.+'
                                           onChange={this.handleChange.bind(this, 'url')}/>
                                </div>
                                <div className='pure-controls'>
                                    <button type='button' className='pure-button pure-button-primary'
                                            onClick={() => this.onSaveClicked()}>
                                        <FormattedMessage id='global.button.save.label' defaultMessage='Save'/>
                                    </button>
                                    <button type='button'
                                            className={this.state.id != null ? 'pure-button button-error' : 'hidden'}
                                            onClick={() => this.props.remove(this.state.id)}>
                                        <FormattedMessage id='global.button.delete.label' defaultMessage='Delete'/>
                                    </button>
                                    <button type='button' className='pure-button'
                                            onClick={() => this.props.cancel()}>
                                        <FormattedMessage id='global.button.cancel.label' defaultMessage='Cancel'/>
                                    </button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>

            </div>
        );
    }
}

EnterpriseEdit.propTypes = {
    intl: intlShape.isRequired,
    id: React.PropTypes.number,
    name: React.PropTypes.string,
    url: React.PropTypes.string,
    save: React.PropTypes.func.isRequired,
    cancel: React.PropTypes.func.isRequired,
    remove: React.PropTypes.func.isRequired
};

EnterpriseEdit.defaultProps = {
    name: '',
    url: ''
};

export default injectIntl(EnterpriseEdit);