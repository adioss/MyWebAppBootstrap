import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Route} from 'react-router';
import {Link} from 'react-router-dom';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {updateIntl} from 'react-intl-redux';
import {Grid, Icon, Image, Menu, Segment, Sidebar} from 'semantic-ui-react';
import {customStyle, selectizeStyle} from '../../style/index';
import {ADMIN_ROLE, USER_ROLE} from '../../actions/constants';
import {get} from '../../apis/CurrentUserApi';
import {getStore} from '../../store';
import {getCurrentUserSuccess} from '../../actions/currentUser';
import AlertPopup from '../utils/AlertPopup';
import eni18n from '../../i18n/en-US';
import fri18n from '../../i18n/fr-FR';
import {hasUserRole} from '../utils/CurrentUserManager';
import EnterpriseListContainer from '../containers/enterprise/EnterpriseListContainer';
import EnterpriseEditContainer from '../containers/enterprise/EnterpriseEditContainer';
import PersonListContainer from '../containers/person/PersonListContainer';
import PersonEditContainer from '../containers/person/PersonEditContainer';
import UserListContainer from '../containers/user/UserListContainer';
import UserEditContainer from '../containers/user/UserEditContainer';
import ProfileEditContainer from '../containers/profile/ProfileEditContainer';
import Dashboard from '../views/Dashboard';

/*eslint-disable no-unused-vars*/
// prevent optimize import auto removal
//noinspection JSUnusedLocalSymbols
const customStyleImport = customStyle;
//noinspection JSUnusedLocalSymbols
const selectizeStyleImport = selectizeStyle;

class Global extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarUrl:      '/api/avatars/-1',
            isMenuExpanded: false,
            menuActiveItem: ''
        };
    }

    componentDidMount() {
        get((user) => {
            const language = [eni18n, fri18n].find((item) => item.language === user.language);
            getStore().dispatch(updateIntl(language));
            getStore().dispatch(getCurrentUserSuccess(user));
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState(Object.assign({}, this.state, {
            currentUser:    nextProps.currentUser,
            menuActiveItem: nextProps.menuActiveItem
        }));
    }

    render() {
        return (
            <div>
                <AlertPopup {...this.props.popupData}/>
                <Sidebar.Pushable as={Segment} attached='bottom'>
                    <Sidebar width={this.state.isMenuExpanded ? 'thin' : 'very thin'} as={Menu} animation='push' visible icon vertical inverted>
                        <Menu.Item onClick={() => this.setState({isMenuExpanded: !this.state.isMenuExpanded})}>
                            <Icon name='sidebar' size='large'/>
                        </Menu.Item>
                        <Menu.Item name='dashboard' active={this.state.menuActiveItem === 'dashboard'}>
                            <Link to='/'>
                                <Icon name='dashboard' size='large'/>
                                <div className={!this.state.isMenuExpanded ? 'hidden' : ''}><br/>
                                    <FormattedMessage id='menu.dashboard.link' defaultMessage='Dashboard'/>
                                </div>
                            </Link>
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
                                    <Segment>
                                        <Route path='/' exact component={Dashboard}/>
                                        <Route path='/enterprise/list' component={EnterpriseListContainer}/>
                                        <Route path='/enterprise/new' component={EnterpriseEditContainer}/>
                                        <Route path='/enterprise/edit/:id' component={EnterpriseEditContainer}/>
                                        <Route path='/person/list' component={PersonListContainer}/>
                                        <Route path='/person/new' component={PersonEditContainer}/>
                                        <Route path='/person/edit/:id' component={PersonEditContainer}/>
                                        <Route path='/user/list' component={UserListContainer}/>
                                        <Route path='/user/new' component={UserEditContainer}/>
                                        <Route path='/user/edit/:id' component={UserEditContainer}/>
                                        <Route path='/profile' component={ProfileEditContainer}/>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column width={this.state.isMenuExpanded ? 2 : 1}/>
                            </Grid.Row>
                        </Grid>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}

Global.propTypes = {
    intl:           intlShape.isRequired,
    currentUser:    PropTypes.shape({
        id:       PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        email:    PropTypes.string.isRequired,
        roles:    PropTypes.arrayOf(PropTypes.oneOf([ADMIN_ROLE, USER_ROLE]))
    }),
    avatarUrl:      PropTypes.string,
    popupData:      PropTypes.shape({
        visible:  PropTypes.boolean,
        content:  PropTypes.string,
        messages: PropTypes.arrayOf(PropTypes.any),
        status:   PropTypes.string
    }),
    menuActiveItem: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
    const menuActiveItem = ownProps.location.pathname.split('/')[1] === '' ? 'dashboard' : ownProps.location.pathname.split('/')[1];
    return {
        currentUser: state.currentUserReducer.get('currentUser'),
        avatarUrl:   state.currentUserReducer.get('avatarUrl'),
        popupData:   state.alertPopupReducer.get('popupData'),
        menuActiveItem
    };
};

export default injectIntl(connect(mapStateToProps)(Global));

