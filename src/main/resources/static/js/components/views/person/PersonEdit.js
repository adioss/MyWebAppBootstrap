import React from 'react';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {SimpleSelect} from 'react-selectize';
import {search} from '../../../apis/EnterpriseApi';

class PersonEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: props.name,
            url: props.url,
            enterprise: props.enterprise,
            enterprises: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.enterprise != null) {
            nextProps.enterprise.label = nextProps.enterprise.name;
        }
        this.state = nextProps;
        this.setState(this.state);
    }

    onSaveClicked() {
        this.props.save(this.state);
    }

    handleChange(item, event) {
        this.setState({[item]: event.target.value});
    }

    handleEnterpriseChange(enterprise) {
        this.setState({'enterprise': enterprise});
    }

    fetchEnterprise(filter) {
        this.setState({search: filter});
        if (filter.length > 0) {
            search(filter, //
                   (result) => {
                       result = result.map((item) => {
                                               item.label = item.name;
                                               return item;
                                           }
                       );
                       this.setState({enterprises: result}
                       );
                   }
            );
        }
    }

    render() {
        const {formatMessage} = this.props.intl;
        return (
            <div>
                <div className='header'>
                    <h1 className='principal-content-title'>
                        <FormattedMessage id='person.edition.title' defaultMessage='Person edition'/>
                    </h1>
                </div>
                <br/>
                <div className='pure-g'>
                    <div className='pure-u-1-1 base-content'>
                        <form className='pure-form pure-form-aligned'>
                            <fieldset>
                                <div className='pure-control-group'>
                                    <label>
                                        <FormattedMessage id='person.edition.label.name.value'
                                                          defaultMessage='Name'/>
                                    </label>
                                    <input type='text'
                                           placeholder={formatMessage({id: 'person.edition.input.name.placeholder'})}
                                           value={this.state.name}
                                           required
                                           onChange={this.handleChange.bind(this, 'name')}/>
                                </div>
                                <div className='pure-control-group'>
                                    <label><FormattedMessage id='person.edition.label.url.value'
                                                             defaultMessage='Url'/>
                                    </label>
                                    <input type='url'
                                           placeholder={formatMessage({id: 'person.edition.input.url.placeholder'})}
                                           value={this.state.url}
                                           required pattern='https?://.+'
                                           onChange={this.handleChange.bind(this, 'url')}/>
                                </div>
                                <div className='pure-control-group'>
                                    <label><FormattedMessage id='person.edition.label.enterprise.value'
                                                             defaultMessage='Enterprise'/>
                                    </label>
                                    <div className='pure-form-aligned-item'>
                                        <SimpleSelect value={this.state.enterprise}
                                                      ref='select'
                                                      uid={(item) => {
                                                          return item.name;
                                                      }}
                                                      onValueChange={(selected) =>
                                                          this.handleEnterpriseChange(selected)
                                                      }
                                                      onSearchChange={(filter) => {
                                                          this.fetchEnterprise(filter);
                                                      }}
                                                      options={this.state.enterprises}
                                                      placeholder={
                                                          formatMessage(
                                                              {id: 'person.edition.input.enterprise.placeholder'}
                                                          )}/>
                                    </div>
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

PersonEdit.propTypes = {
    intl: intlShape.isRequired,
    id: React.PropTypes.number,
    name: React.PropTypes.string,
    label: React.PropTypes.string,
    url: React.PropTypes.string,
    enterprise: React.PropTypes.shape(
        {
            id: React.PropTypes.number.isRequired,
            name: React.PropTypes.string.isRequired,
            label: React.PropTypes.string,
            url: React.PropTypes.string.isRequired
        }
    ),
    save: React.PropTypes.func.isRequired,
    cancel: React.PropTypes.func.isRequired,
    remove: React.PropTypes.func.isRequired
};

PersonEdit.defaultProps = {
    id: null,
    name: '',
    url: '',
    enterprise: null
};

export default injectIntl(PersonEdit);