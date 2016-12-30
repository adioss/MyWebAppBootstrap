import React from 'react';
import {injectIntl} from 'react-intl';
import Fetch from '../../../apis/Fetch';
import {POST, DELETE} from '../../../apis/ApiConstants';
import {getStore} from '../../../store';
import {getAvatarUrl} from '../../utils/CurrentUserManager';
import {updateCurrentUserAvatar} from '../../../actions/currentUser';

class AvatarEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            avatarUrl: props.id === null ? props.avatarUrl : getAvatarUrl(props.id)
        };
    }

    uploadAvatar() {
        const that = this;
        const formData = new FormData();
        formData.append('file', this.avatarInput.files[0]);
        new Fetch('/api/avatars/' + this.state.id, {
                method: POST,
                body: formData
            }
        ).then(() => {
            that.state = Object.assign({}, that.state, {avatarUrl: getAvatarUrl(that.state.id)});
            that.setState(that.state);
            getStore().dispatch(updateCurrentUserAvatar(that.state.id));
               }
        );
    }

    cleanAvatar() {
        const that = this;
        new Fetch('/api/avatars/' + this.state.id, {
                method: DELETE,
            }
        ).then(() => {
            let avatarUrl = (that.state.id === null ? '-1' : that.state.id);
            avatarUrl += '?temp=' + Math.random();
            that.state = Object.assign({}, that.state, {avatarUrl: '/api/avatars/' + avatarUrl});
            that.setState(that.state);
            getStore().dispatch(updateCurrentUserAvatar(that.state.id));
               }
        );
    }

    render() {
        const {formatMessage} = this.props.intl;
        return (
            <span>
                <label htmlFor='avatarInput' className='pure-form-aligned-label'>
                    <img className='user-avatar' alt='avatar' height='48' width='48' src={this.state.avatarUrl}/>
                </label>
                <input id='avatarInput' type='file' onChange={() => this.uploadAvatar()}
                       accept='image/*' className='user-avatar-upload-button'
                       placeholder={formatMessage({id: 'user.edition.input.avatar.placeholder'})}
                       ref={(input) => (this.avatarInput = input)}/>
                <i className='fa fa-trash pure-form-aligned-test' aria-hidden='true'
                   onClick={() => this.cleanAvatar()}/>
            </span>
        )
    }
}

AvatarEditor.propTypes = {
    intl: React.PropTypes.any,
    id: React.PropTypes.number,
    avatarUrl: React.PropTypes.string
};

AvatarEditor.defaultProps = {
    id: null,
    avatarUrl: '/api/avatars/-1'
};
export default injectIntl(AvatarEditor);