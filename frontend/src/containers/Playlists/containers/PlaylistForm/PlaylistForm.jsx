import React from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Field, FieldArray, reduxForm } from 'redux-form';

import './PlaylistForm.scss';

import * as actions from '../../actions.es6';

//components
import NarrationsFormComponent from './components/NarrationsFormComponent/NarrationsFormComponent.jsx';
import PlayerForm from '../../../../components/PlayerForm/PlayerForm.jsx';
import {addPlaylist, updatePlaylist} from '../../actions.es6';

class PlaylistForm extends React.Component {
    componentDidMount() {
        const { match, getPlaylistDetails } = this.props;
        if (match.params.playlistId !== 'new') {
            getPlaylistDetails(match.params.playlistId);
        }
    }
    componentWillUnmount() {
        this.props.clearPlaylistDetails();
    }
    render() {
        const {handleSubmit, onFormSubmit} = this.props;
        return (
            <form className="playlist-form-container container">
                <Tabs className="playlist-form">
                    <div className="section">
                        <div className="title">
                            <h3>New playlist</h3>
                            <TabList>
                                <Tab>Edit</Tab>
                                <Tab>Settings</Tab>
                            </TabList>
                        </div>
                    </div>
                    <TabPanel>
                        <div className="playlist-name-wrapper">
                            <label htmlFor="playlistName">Playlist name</label>
                            <Field component="input" type="text" id="playlistName" name="name" className="input"/>
                        </div>
                        <FieldArray component={NarrationsFormComponent} name="narrations" />
                    </TabPanel>
                    <TabPanel className="form-tab">
                        <div className="section">
                            <PlayerForm playlistId={123}/>
                        </div>
                    </TabPanel>
                    <div className="submit-button-container">
                        <button className="btn btn-pink big" type="submit" onClick={handleSubmit(onFormSubmit)}>
                            Save
                        </button>
                    </div>
                </Tabs>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        formValues: state.form.playlistForm && state.form.playlistForm.values ? state.form.playlistForm.values : {},
        initialValues: state.playlistsReducer.playlistDetails.id ? state.playlistsReducer.playlistDetails : undefined
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getPlaylistDetails: (playlistId) => {
            dispatch(actions.getPlaylistDetails(playlistId));
        },
        onFormSubmit: (formData) => {
            const editedFormData = {...formData};
            editedFormData['narrations'] = editedFormData['narrations'] &&
                editedFormData['narrations'].map(narrationObj => ({narration: narrationObj.id}));
            const addUpdatePlaylist = editedFormData['id'] ? updatePlaylist(editedFormData) : addPlaylist(editedFormData);
            dispatch(addUpdatePlaylist);
        },
        clearPlaylistDetails: () => {
            dispatch(actions.clearPlaylistDetails());
        }
    };
};

PlaylistForm = reduxForm({
    form: 'playlistForm'
})(PlaylistForm);

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistForm);