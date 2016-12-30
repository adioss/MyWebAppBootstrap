import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import NotificationSystem from 'react-notification-system';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {updateIntl} from 'react-intl-redux';
import {init} from '../utils/PopupManager';
import {hasUserRole} from '../utils/CurrentUserManager';
import {customStyle, pureStyle, rePaginationStyle, selectizeStyle} from '../../style/index';
import {ADMIN_ROLE, USER_ROLE} from '../../actions/constants';
import {get} from '../../apis/CurrentUserApi';
import {getStore} from '../../store';
import {getCurrentUserSuccess} from '../../actions/currentUser';
import eni18n from '../../i18n/en-US';
import fri18n from '../../i18n/fr-FR';

/*eslint-disable no-unused-vars*/
// prevent optimize import auto removal
//noinspection JSUnusedLocalSymbols
const customStyleImport = customStyle;
//noinspection JSUnusedLocalSymbols
const pureStyleImport = pureStyle;
//noinspection JSUnusedLocalSymbols
const rePaginationStyleImport = rePaginationStyle;
//noinspection JSUnusedLocalSymbols
const selectizeStyleImport = selectizeStyle;

class Global extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuLink: props.menuLink,
            layout: props.layout,
            menu: props.menu,
        };
    }

    componentDidMount() {
        init(this.refs.notificationSystem, this.props.intl);
        get(
            (user) => {
                const language = [eni18n, fri18n].find((item) => item.language === user.language);
                getStore().dispatch(updateIntl(language));
                getStore().dispatch(getCurrentUserSuccess(user));
            }
        );
    }

    componentWillReceiveProps(nextProps) {
        this.setState(
            Object.assign({}, this.state, {currentUser: nextProps.currentUser})
        );
    }

    onMenuButtonClick() {
        this.setState(
            {
                'menuLink': this.state.menuLink == 'menu-link' ? 'menu-link active' : 'menu-link',
                'layout': this.state.layout == '' ? 'active' : '',
                'menu': this.state.menu == '' ? 'active' : ''
            }
        );
    }

    render() {
        const {formatMessage} = this.props.intl;
        return (
            <div id='layout' className={this.state.layout}>
                <a href='#menu' id='menuLink' className={this.state.menuLink}
                   onClick={() => this.onMenuButtonClick()}>
                    <span>&nbsp;</span>
                </a>
                <div id='menu' className={this.state.menu}>
                    <div className='pure-menu'>
                        <a className='pure-menu-heading' href='/'>
                            <FormattedMessage id='menu.global.title' defaultMessage='Company'/>
                        </a>
                        <ul className='pure-menu-list'>
                            <li className='pure-menu-item'>
                                <Link className='pure-menu-link' to={'/'}>
                                    <FormattedMessage id='menu.example.link' defaultMessage='Example'/>
                                </Link>
                            </li>
                            <li className='pure-menu-item'>
                                <Link className='pure-menu-link' to={'/enterprise/list'}>
                                    <FormattedMessage id='menu.enterprises.link' defaultMessage='Enterprises'/>
                                </Link>
                            </li>
                            <li className='pure-menu-item'>
                                <Link className='pure-menu-link' to={'/person/list'}>
                                    <FormattedMessage id='menu.persons.link' defaultMessage='Persons'/>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={!hasUserRole(ADMIN_ROLE) ? 'hidden' : ''}>
                        <div className='pure-menu'>
                            <ul className='pure-menu-list'>
                                <li className='pure-menu-item'>
                                    <Link className='pure-menu-link' to={'/user/list'}>
                                        <FormattedMessage id='menu.users.link' defaultMessage='Users'/>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='pure-menu user-tab'>
                        <ul className='pure-menu-list'>
                            <li className='pure-menu-item'>
                                <Link className='user-details pure-menu-link' to={'/profile'}>
                                    <p>
                                        <img className='user-avatar' alt='avatar' height='48' width='48'
                                             src={this.props.avatarUrl}/>
                                    </p>
                                    <p>{this.props.currentUser != null ? this.props.currentUser.username : ''}</p>
                                </Link>
                            </li>
                            <li className='pure-menu-item' alt={formatMessage({id: 'menu.logout.alt.message'})}>
                                <a className='user-logout pure-menu-link ' href={'/logout'}>
                                    <i className='fa fa-sign-out' aria-hidden='true'>&nbsp;</i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div id='main'>
                    {this.props.children}
                </div>
                <NotificationSystem ref='notificationSystem'/>
            </div>
        );
    }
}

Global.propTypes = {
    intl: intlShape.isRequired,
    currentUser: React.PropTypes.shape({
                                           id: React.PropTypes.number.isRequired,
                                           username: React.PropTypes.string.isRequired,
                                           email: React.PropTypes.string.isRequired,
                                           roles: React.PropTypes.arrayOf(
                                               React.PropTypes.oneOf([ADMIN_ROLE, USER_ROLE])
                                           )
                                       }
    ),
    avatarUrl: React.PropTypes.string.isRequired
};

Global.propTypes = {
    menuLink: React.PropTypes.string,
    layout: React.PropTypes.string,
    menu: React.PropTypes.string,
    avatarUrl: React.PropTypes.string,
    children: React.PropTypes.object
};

Global.defaultProps = {
    menuLink: 'menu-link',
    layout: '',
    menu: '',
    avatarUrl: '/api/avatars/-1'
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUserReducer.get('currentUser'),
        avatarUrl: state.currentUserReducer.get('avatarUrl')
    };
};

export default injectIntl(connect(mapStateToProps)(Global));

