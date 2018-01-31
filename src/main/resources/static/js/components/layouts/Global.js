import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
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
                <AlertPopup {...this.props.popupData}/>
                <Sidebar.Pushable as={Segment} attached='bottom'>
                    <Sidebar width={this.state.isMenuExpanded ? 'thin' : 'very thin'} as={Menu} animation='push' visible icon vertical inverted>
                        <Menu.Item onClick={() => this.setState({isMenuExpanded: !this.state.isMenuExpanded})}>
                            <Icon name='sidebar' size='large'/>
                        </Menu.Item>
                        {/*onClick={() => this.setState({menuActiveItem: 'enterprise'})}*/}
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
                                    <Segment>{this.props.children}</Segment>
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
    intl:        intlShape.isRequired,
    currentUser: React.PropTypes.shape({
        id:       React.PropTypes.number.isRequired,
        username: React.PropTypes.string.isRequired,
        email:    React.PropTypes.string.isRequired,
        roles:    React.PropTypes.arrayOf(React.PropTypes.oneOf([ADMIN_ROLE, USER_ROLE]))
    }),
    avatarUrl:   React.PropTypes.string.isRequired,
    popupData:   React.PropTypes.shape({
        visible:  React.PropTypes.boolean,
        content:  React.PropTypes.string,
        messages: React.PropTypes.arrayOf(React.PropTypes.any),
        status:   React.PropTypes.string.isRequired
    }),
    children:    React.PropTypes.object
};

Global.defaultProps = {
    avatarUrl: '/api/avatars/-1'
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUserReducer.get('currentUser'),
        avatarUrl:   state.currentUserReducer.get('avatarUrl'),
        popupData:   state.alertPopupReducer.get('popupData')
    };
};

export default injectIntl(connect(mapStateToProps)(Global));

