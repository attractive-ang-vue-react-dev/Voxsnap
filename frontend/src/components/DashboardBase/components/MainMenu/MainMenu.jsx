import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import classNames from 'classnames';
import Dropdown, {DropdownTrigger, DropdownContent} from 'react-simple-dropdown';
import 'react-simple-dropdown/styles/Dropdown.css';

import urls from '../../../../urls.es6';

import logo from '../../../../assets/img/logo.svg';
import './MainMenu.scss';

class MainMenu extends React.Component {
    constructor(props) {
        super(props);

        this.dropdownRef = null;
    }

    render() {
        const { hideMenu, currentUser, logout, unreadNotificationsCount } = this.props;

        const containerClasses = classNames({
            'hided-menu': hideMenu,
            container: true
        });
        return (
            <div className="main-menu">
                <div className={containerClasses}>
                    <div className="nav-menu">
                        <a href={urls.home} className="logo">
                            <img src={logo} alt="Voxsnap"/>
                        </a>
                        {!hideMenu &&
                        <ul>
                            <li>
                                <NavLink to={urls.narrations}>
                                    Narrations
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={urls.playlists}>
                                    Playlists
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={urls.distribution} exact>
                                    Distribution
                                </NavLink>
                            </li>
                            <li>
                                <a href={urls.analytics}>
                                    Analytics
                                </a>
                            </li>
                        </ul>
                        }
                    </div>
                    {!hideMenu && currentUser &&
                        <div>
                            <Link to={urls.notifications} className="notification-link">
                                <i className="fa fa-bell" />
                                {unreadNotificationsCount > 0 &&
                                    <div className="notifications-count">{unreadNotificationsCount}</div>
                                }
                            </Link>
                            <Dropdown className="user-menu" ref={ref => this.dropdownRef = ref}>
                                <DropdownTrigger className="current-user">
                                    {currentUser.first_name}
                                    <i className="fa fa-chevron-down"/>
                                </DropdownTrigger>
                                <DropdownContent className="user-menu-dropdown">
                                    <ul>
                                        <li>
                                            <Link to={urls.settings} onClick={() => this.dropdownRef.hide()}>
                                                <i className="fa fa-cogs"/>
                                                Settings
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={urls.passwordChange} onClick={() => this.dropdownRef.hide()}>
                                                <i className="fa fa-lock"/>
                                                Change Password
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={urls.billing} onClick={() => this.dropdownRef.hide()}>
                                                <i className="fa fa-usd" />
                                                Billing
                                            </Link>
                                        </li>
                                        <li>
                                            <button onClick={logout}>
                                                <i className="fa fa-sign-out"/>
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </DropdownContent>
                            </Dropdown>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default MainMenu;