import React from 'react';
import { connect } from 'react-redux';

import * as actions from './actions.es6';

//components
import MainMenu from './components/MainMenu/MainMenu.jsx';
import Footer from './components/Footer/Footer.jsx';

import './DashboardBase.scss';
import history from '../../history.es6';

class DashboardBase extends React.Component {
    constructor(props) {
        super(props);

        history.listen(() => {
            props.getUnreadNotificationsCount();
        });
    }
    componentWillMount() {
        const { getCurrentUser } = this.props;
        getCurrentUser();
    }

    componentDidMount() {
        this.props.getUnreadNotificationsCount();
    }

    render() {
        const { hideMenu, hideFooter, currentUser, logout, unreadNotificationsCount } = this.props;
        return (
            <div className="dashboard-base">
                <MainMenu hideMenu={hideMenu} currentUser={currentUser} logout={logout} unreadNotificationsCount={unreadNotificationsCount}/>
                <div className="dashboard-content">
                    {this.props.children}
                </div>
                {!hideFooter &&
                    <Footer/>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.authReducer.currentUser,
        unreadNotificationsCount: state.notificationsReducer.unreadNotificationsCount
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCurrentUser: () => {
            dispatch(actions.getCurrentUser());
        },
        logout: () => {
            dispatch(actions.logout());
        },
        getUnreadNotificationsCount: () => {
            dispatch(actions.unreadNotificationsCount());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardBase);