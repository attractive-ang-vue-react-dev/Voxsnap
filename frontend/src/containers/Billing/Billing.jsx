import React from 'react';
import {connect} from 'react-redux';

import './Billing.scss';
import * as actions from './actions.es6';
import moment from 'moment/moment';

//components
import SearchForm from './components/SearchForm/SearchForm.jsx';
import LoadingComponent from '../../components/LoadingComponent/Loading.jsx';

class Billing extends React.Component {
    componentDidMount() {
        const { getTransactions } = this.props;
        getTransactions();
    }

    render() {
        const { transactionsList, getTransactions, transactionsLoading } = this.props;
        return (
            <div className="billing">
                <SearchForm onSearchValueChange={getTransactions}/>
                <div className="container table-container">
                    {transactionsLoading && <LoadingComponent/> ||
                    <table className="billing-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Transaction Date</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Action</th>
                                <th/>
                            </tr>
                        </thead>
                        <tbody>
                            {transactionsList.map(transaction =>
                                <tr key={transaction.id}>
                                    <td className="id">{transaction.id}</td>
                                    <td className="date">{moment(transaction.created_at).format('DD MMMM YYYY')}</td>
                                    <td className="description">{transaction.notes}</td>
                                    <td className="amount">${transaction.price}</td>
                                    <td className="download">
                                        <a href={transaction.file} target="_blank">Download</a>
                                    </td>
                                    <td className="buttons"><i className="fa fa-ellipsis-v"/></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        transactionsList: state.billingReducer.transactionsList,
        transactionsLoading: state.billingReducer.transactionsLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTransactions: searchParams => {
            dispatch(actions.getTransactions(searchParams));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Billing);