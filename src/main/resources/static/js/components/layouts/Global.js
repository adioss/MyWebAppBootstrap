import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import NotificationSystem from 'react-notification-system';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {updateIntl} from 'react-intl-redux';
import {Grid, Icon, Image, Menu, Segment, Sidebar} from 'semantic-ui-react';
import {init} from '../utils/PopupManager';
import {hasUserRole} from '../utils/CurrentUserManager';
import {customStyle, selectizeStyle} from '../../style/index';
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
const selectizeStyleImport = selectizeStyle;

class Global extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuExpanded: false,
            menuActiveItem: ''
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

    render() {
        return (
            <div>
                <Sidebar.Pushable as={Segment} attached='bottom'>
                    <Sidebar width={this.state.isMenuExpanded ? 'thin' : 'very thin'} as={Menu} animation='push' visible icon vertical inverted>
                        <Menu.Item onClick={() => this.setState({isMenuExpanded: !this.state.isMenuExpanded})}>
                            <Icon name='sidebar' size='large'/>
                        </Menu.Item>
                        <Menu.Item name='enterprise' active={this.state.menuActiveItem === 'enterprise'}
                                   onClick={() => this.setState({menuActiveItem: 'enterprise'})}>
                            <Link to='/enterprise/list'>
                                <Icon name='industry' size='large'/>
                                <div className={!this.state.isMenuExpanded ? 'hidden' : ''}><br/>
                                    <FormattedMessage id='menu.enterprises.link' defaultMessage='Enterprises'/>
                                </div>
                            </Link>
                        </Menu.Item>
                        <Menu.Item name='person' active={this.state.menuActiveItem === 'person'}
                                   onClick={() => this.setState({menuActiveItem: 'person'})}>
                            <Link to='/person/list'>
                                <Icon name='address book' size='large'/>
                                <div className={!this.state.isMenuExpanded ? 'hidden' : ''}><br/>
                                    <FormattedMessage id='menu.persons.link' defaultMessage='Persons'/>
                                </div>
                            </Link>
                        </Menu.Item>
                        <Menu.Item name='user' active={this.state.menuActiveItem === 'user'} className={!hasUserRole(ADMIN_ROLE) ? 'hidden' : ''}
                                   onClick={() => this.setState({menuActiveItem: 'user'})}>
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
                                <Menu.Item name='avatar' style={{paddingRight: this.state.isMenuExpanded ? '170px' : '70px'}}>
                                    <Image src={this.props.avatarUrl} avatar/>
                                    <Link to='/profile'><span>{this.props.currentUser !== undefined ? this.props.currentUser.username : ''}</span></Link>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <a href='/logout'>
                                        <Icon name='log out' size='large'/>
                                        <FormattedMessage id='menu.logout.alt.message' defaultMessage='Logout'/>
                                    </a>
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>
                        &nbsp;
                        <Grid className='grid-padded' style={{'paddingLeft': '10px'}}>
                            <Grid.Row>
                                <Grid.Column width={this.state.isMenuExpanded ? 14 : 15}>
                                    <Segment>{this.props.children}</Segment>
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
    avatarUrl: React.PropTypes.string,
    children:  React.PropTypes.object
};

Global.defaultProps = {
    avatarUrl: '/api/avatars/-1'
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUserReducer.get('currentUser'),
        avatarUrl:   state.currentUserReducer.get('avatarUrl')
    };
};

export default injectIntl(connect(mapStateToProps)(Global));

