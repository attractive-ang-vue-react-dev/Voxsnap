import React from 'react';
import {connect} from 'react-redux';

import './NarrationsList.scss';
import * as actions from './actions.es6';

import history from '../../../../history.es6';
import urls from '../../../../urls.es6';

//components
import SearchForm from './components/SearchForm/SearchForm.jsx';
import LoadingComponent from '../../../../components/LoadingComponent/Loading.jsx';

class NarrationsList extends React.Component {
    componentDidMount() {
        const { getNarrations } = this.props;
        getNarrations();
    }
    render() {
        const { narrationsList, getNarrations, narrationsLoading } = this.props;
        return (
            <div className="narrations-list">
                <SearchForm narrationsCount={narrationsList.length} onSearchValueChange={getNarrations}/>
                <div className="container">
                    {narrationsLoading && <LoadingComponent/> ||
                    <table className="narrations-list-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Post Url</th>
                                <th>Created</th>
                                <th>Narrator</th>
                                <th>State</th>
                                <th/>
                            </tr>
                        </thead>
                        <tbody>
                            {narrationsList.map(narration =>
                                <tr key={narration.id} onClick={() => history.push(urls.narrationDetails.replace(':narrationId', narration.id))}>
                                    <td className="numbers">{narration.id}</td>
                                    <td className="url">
                                        <span>{narration.url}</span>
                                    </td>
                                    <td className="numbers">12 Jan 2017</td>
                                    <td>{narration.narrator && `${narration.narrator.first_name} ${narration.narrator.last_name.charAt(0)}`}</td>
                                    {narration.status === 'Approved' ? <td className="state-ready">Ready</td> : <td className="state-processing">Processing</td>}
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
        narrationsList: state.narrationsReducer.narrationsList,
        narrationsLoading: state.narrationsReducer.narrationsLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getNarrations: searchParams => {
            dispatch(actions.getNarrations(searchParams));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NarrationsList);