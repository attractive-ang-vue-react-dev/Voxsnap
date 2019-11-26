import React from 'react';
import { Switch, Route } from 'react-router';
import uuid from 'uuid';
import {connect} from 'react-redux';

import urls from '../../urls.es6';

//components
import PlaylistsList from './containers/PlaylistsList/PlaylistsList.jsx';
import PlaylistForm from './containers/PlaylistForm/PlaylistForm.jsx';
import LoadingComponent from '../../components/LoadingComponent/Loading.jsx';

class Playlists extends React.Component {
    render() {
        const showLoader = false;
        return (
            <Switch>
                <Route path={urls.playlists} exact component={PlaylistsList}/>
                <Route path={urls.playlistDetails} exact render={matchProps => showLoader ? <LoadingComponent/> :(
                    <PlaylistForm {...matchProps} />
                )} />
                <Route path={urls.playlistForm} exact render={matchProps => showLoader ? <LoadingComponent/> :(
                    <PlaylistForm {...matchProps} initialValues={{narrations: [({uuid: uuid.v4()})]}} />
                )} />
            </Switch>
        );
    }
}
const mapStateToProps = (state, ) => {
    return {
        playlistDetails: state.playlistsReducer.playlistDetails
    };
};

export default connect(mapStateToProps)(Playlists);