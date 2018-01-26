import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import NotificationSystem from 'react-notification-system';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {updateIntl} from 'react-intl-redux';
import {Grid, Icon, Image, Menu, Segment, Sidebar} from 'semantic-ui-react';
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
            isMenuExpanded: false,
            menuLink:       props.menuLink,
            layout:         props.layout,
            menu:           props.menu,
        };
    }

    componentDidMount() {
        init(this.refs.notificationSystem, this.props.intl);
        get((user) => {
            const language = [eni18n, fri18n].find((item) => item.language === user.language);
            getStore().dispatch(updateIntl(language));
            getStore().dispatch(getCurrentUserSuccess(user));
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState(Object.assign({}, this.state, {currentUser: nextProps.currentUser}));
    }

    onMenuButtonClick() {
        this.setState({
            'menuLink': this.state.menuLink === 'menu-link' ? 'menu-link active' : 'menu-link',
            'layout':   this.state.layout === '' ? 'active' : '',
            'menu':     this.state.menu === '' ? 'active' : ''
        });
    }

    render() {
        return (
            <div>
                <Sidebar.Pushable as={Segment} attached='bottom'>
                    <Sidebar width={this.state.isMenuExpanded ? 'thin' : 'very thin'} as={Menu} animation='push' visible icon vertical inverted>
                        <Menu.Item onClick={() => this.setState({isMenuExpanded: !this.state.isMenuExpanded})}>
                            <Icon name='sidebar' size='large'/>
                        </Menu.Item>
                        <Menu.Item name='enterprise' active={this.state.menuActiveItem === 'enterprise'}>
                            <Link to='/enterprise/list'>
                                <Icon name='industry' size='large'/>
                                <div className={!this.state.isMenuExpanded ? 'hidden' : ''}><br/>
                                    <FormattedMessage id='menu.enterprises.link' defaultMessage='Enterprises'/>
                                </div>
                            </Link>
                        </Menu.Item>
                        <Menu.Item name='person' active={this.state.menuActiveItem === 'person'}>
                            <Link to='/person/list'>
                                <Icon name='address book' size='large'/>
                                <div className={!this.state.isMenuExpanded ? 'hidden' : ''}><br/>
                                    <FormattedMessage id='menu.persons.link' defaultMessage='Persons'/>
                                </div>
                            </Link>
                        </Menu.Item>
                        <Menu.Item name='user' active={this.state.menuActiveItem === 'user'} className={!hasUserRole(ADMIN_ROLE) ? 'hidden' : ''}>
                            <Link to='/user/list'>
                                <Icon name='users' size='large'/>
                                <div className={!this.state.isMenuExpanded ? 'hidden' : ''}><br/>
                                    <FormattedMessage id='menu.users.link' defaultMessage='Users'/>
                                </div>
                            </Link>
                        </Menu.Item>
                    </Sidebar>
                    <Sidebar.Pusher>
                        <Menu secondary attached='top'>
                            <Menu.Menu position='right'>
                                <Menu.Item name='avatar' className={this.state.isMenuExpanded ? 'menu-double-padded' : 'menu-padded'}>
                                    <Image src={this.props.avatarUrl} avatar/>
                                    <Link to='/profile'><span>{this.props.currentUser !== undefined ? this.props.currentUser.username : ''}</span></Link>
                                    &nbsp;<a href='/logout'><FormattedMessage id='menu.logout.alt.message' defaultMessage='Logout'/></a>&nbsp;
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>
                        &nbsp;
                        <Grid className='grid-padded'>
                            <Grid.Row>
                                <Grid.Column width={this.state.isMenuExpanded ? 14 : 15}>
                                    <Segment>
                                        {this.props.children}
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column width={this.state.isMenuExpanded ? 2 : 1}/>
                            </Grid.Row>
                        </Grid>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
                <NotificationSystem ref='notificationSystem'/>
            </div>
        );
    }
}

Global.propTypes = {
    intl:        intlShape.isRequired,
    currentUser: React.PropTypes.shape({
        id:       React.PropTypes.number.isRequired,
        username: React.PropTypes.string.isRequired,
        email:    React.PropTypes.string.isRequired,
        roles:    React.PropTypes.arrayOf(React.PropTypes.oneOf([ADMIN_ROLE, USER_ROLE]))
    }),
    avatarUrl:   React.PropTypes.string.isRequired
};

Global.propTypes = {
    menuLink:  React.PropTypes.string,
    layout:    React.PropTypes.string,
    menu:      React.PropTypes.string,
    avatarUrl: React.PropTypes.string,
    children:  React.PropTypes.object
};

Global.defaultProps = {
    menuLink:  'menu-link',
    layout:    '',
    menu:      '',
    avatarUrl: '/api/avatars/-1'
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUserReducer.get('currentUser'),
        avatarUrl:   state.currentUserReducer.get('avatarUrl')
    };
};

export default injectIntl(connect(mapStateToProps)(Global));

