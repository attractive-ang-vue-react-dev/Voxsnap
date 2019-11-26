import React from 'react';
import {connect} from 'react-redux';
import Pagination from 'react-js-pagination';
import moment from 'moment';

import './Notifications.scss';
import * as actions from './actions.es6';

//components
import LoadingComponent from '../../components/LoadingComponent/Loading.jsx';

class Notifications extends React.Component {
    componentDidMount() {
        const { getNotifications } = this.props;
        getNotifications();
    }

    handlePageChange(pageNumber) {
        const { getNotifications } = this.props;
        getNotifications(pageNumber);
    }

    render() {
        const { notificationsList, notificationsLoading, activePage } = this.props;
        const itemsPerPage = 20;
        const pageRangeDisplayed = notificationsList.count < itemsPerPage ? 1 : (notificationsList.count / itemsPerPage) + 1;

        return (
            <div className="notifications">
                <div className="container title-container">
                    <h2>Notifications</h2>
                </div>
                <div className="container table-container">
                    {notificationsLoading && <LoadingComponent/> ||
                        <table className="notifications-table">
                            <thead>
                                <tr>
                                    <th>Message</th>
                                    <th>Date</th>
                                    <th/>
                                </tr>
                            </thead>
                            <tbody>
                                {notificationsList.results && notificationsList.results.map((notification, i) =>
                                    <tr key={i}>
                                        <td className="message">{notification.text}</td>
                                        <td className="date">{moment(notification.created_at).format('DD MMMM YYYY')}</td>
                                        <td className="buttons"><i className="fa fa-ellipsis-v"/></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    }
                    <Pagination
                        activePage={activePage}
                        itemsCountPerPage={itemsPerPage}
                        totalItemsCount={notificationsList.count}
                        pageRangeDisplayed={pageRangeDisplayed}
                        onChange={::this.handlePageChange}
                        hideNavigation="true"
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        notificationsList: state.notificationsReducer.notificationsList,
        notificationsLoading: state.notificationsReducer.notificationsLoading,
        activePage: state.notificationsReducer.activePage
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getNotifications: (pageNumber) => {
            dispatch(actions.getNotifications(pageNumber ? pageNumber : 1));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);