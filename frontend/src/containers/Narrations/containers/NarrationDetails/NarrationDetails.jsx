import React from 'react';

import moment from 'moment';

import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';

import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';

import './NarrationDetails.scss';

import * as actions from './actions.es6';

//components
import Player from '../../../../components/Player/Player.jsx';
import EmbeddedCode from '../../../../components/EmbeddedCode/EmbeddedCode.jsx';

const Narrator = ({ narrator }) => (
    <div className="columns form-row package-row">
        <div className="row-title">
            <h3>Narrator</h3>
        </div>
        <div className="narrator-details">
            <div>
                <h5>Name</h5>
                <div>{narrator.first_name} {narrator.last_name.charAt(0)}.</div>
            </div>
            <div>
                <h5>Gender</h5>
                <div>{narrator.gender}</div>
            </div>
            <div>
                <h5>Languages</h5>
                <div>{
                    narrator && narrator.languages && narrator.languages.map(language =>
                        <span key={language.id}>{language.language}, </span>
                    )
                }</div>
            </div>
        </div>
    </div>
);

class NarrationDetails extends React.Component {
    componentDidMount() {
        const { match, getNarrationDetails } = this.props;
        getNarrationDetails(match.params.narrationId);
    }

    render() {
        const { narrationDetails, onSubmit } = this.props;
        
        return (
            <form className="narration-details container" onSubmit={onSubmit}>
                <div className="narration">
                    <div className="section">
                        <div className="title">
                            <div className="title-content">
                                <h3>Narration</h3>
                                <div className="status-info">
                                    <div>
                                        <span className="label">Status</span>
                                        <span className="value">{narrationDetails.status}</span>
                                    </div>
                                    <div>
                                        <span className="label">Player</span>
                                        <span className="value">{narrationDetails.player_status}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="columns form-row">
                            <div className="row-title">
                                <h3>Post URL</h3>
                            </div>
                            <div className="post-url">
                                <div className="post-url-title">
                                    {narrationDetails.title || 'N/A'}
                                </div>
                                <div className="post-url-details">
                                    <span title={narrationDetails.url}>{narrationDetails.url}</span>
                                    <a href={narrationDetails.url} target="_blank">Open</a>
                                </div>
                            </div>
                        </div>
                        <div className="columns form-row">
                            <div className="row-title">
                                <h3>Player</h3>
                            </div>
                            <div className="player-container">
                                <Player 
                                    userName={narrationDetails.customer ? narrationDetails.customer.company_name : null}
                                    narrationId={narrationDetails.id} />
                            </div>
                        </div>
                    </div>
                    <div className="section">
                        <EmbeddedCode />
                    </div>
                    { 
                        narrationDetails.narrator && (
                            <div className="section narrator">
                                <Narrator narrator={narrationDetails.narrator} /> 
                            </div>
                        )
                    }
                    <div className="section">
                        <div className="columns form-row package-row">
                            <div className="row-title">
                                <h3>Created</h3>
                            </div>
                            <div>
                                {narrationDetails.order && moment(narrationDetails.order.created).format('DD MMMM YYYY')}
                            </div>
                        </div>
                    </div>
                    <div className="section">
                        <div className="columns form-row package-row">
                            <div className="row-title">
                                <h3>Library</h3>
                            </div>
                            <div>
                                Add this post to VoxSnap Library 
                            </div>
                            <div>
                                <Checkbox checked/>
                            </div>
                        </div>
                    </div>
                    <div className="submit-button-container">
                        <button className="btn btn-pink big">
                            Save
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        narrationDetails: state.narrationsReducer.narrationDetails,
        initialValues: {
            color: {
                label: 'PINK',
                value: '#ff5d86'
            },
            id: ownProps.match.params.narrationId
        }
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getNarrationDetails: (narrationId) => {
            dispatch(actions.getNarrationDetails(narrationId));
        },
        onSubmit: formData => {
            dispatch(actions.updateNarrationDetails({...formData, color: formData.color.label}));
        }
    };
};

NarrationDetails = reduxForm({
    form: 'narrationDetailsForm'
})(NarrationDetails);

export default connect(mapStateToProps, mapDispatchToProps)(NarrationDetails);