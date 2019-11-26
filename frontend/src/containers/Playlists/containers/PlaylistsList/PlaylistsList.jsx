import React from 'react';
import {connect} from 'react-redux';

import './PlaylistsList.scss';
import * as actions from './actions.es6';

import history from '../../../../history.es6';
import urls from '../../../../urls.es6';

//components
import SearchForm from './components/SearchForm/SearchForm.jsx';
import LoadingComponent from '../../../../components/LoadingComponent/Loading.jsx';
import moment from 'moment/moment';

class PlaylistsList extends React.Component {
    componentDidMount() {
        const { getPlaylists } = this.props;
        getPlaylists();
    }

    render() {
        const { playlists, getPlaylists, playlistsLoading } = this.props;
        return (
            <div className="playlists">
                <SearchForm onSearchValueChange={getPlaylists}/>
                <div className="container">
                    {playlistsLoading && <LoadingComponent/> ||
                    <table className="playlists-table">
                        <thead>
                            <tr>
                                <th>Playlist name</th>
                                <th>Narrations</th>
                                <th className="created">Created</th>
                                <th/>
                            </tr>
                        </thead>
                        <tbody>
                            {playlists.map(playList =>
                                <tr key={playList.id} onClick={() => history.push(urls.playlistDetails.replace(':playlistId', playList.id))}>
                                    <td>{playList.name}</td>
                                    <td className="narrations-count">{playList.narrations_count}</td>
                                    <td className="created">{moment(playList.created_dt).format('DD MMMM YYYY')}</td>
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
        playlists: state.playlistsReducer.playlists,
        playlistsLoading: state.playlistsReducer.playlistsLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getPlaylists: searchParams => {
            dispatch(actions.getPlaylists(searchParams));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistsList);