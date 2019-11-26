import React from 'react';
import {connect} from 'react-redux';
import './PlayerForm.scss';

//components
import Player from '../Player/Player.jsx';
import EmbeddedCode from '../EmbeddedCode/EmbeddedCode.jsx';

class PlayerForm extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        const {playlistId, userName, narrationId} = this.props;

        return [
            <div className="columns form-row" key="player-preview">
                <div className="row-title">
                    <h3>Player</h3>
                </div>
                <Player playlistId={playlistId} userName={userName} narrationId={narrationId} />
            </div>,
            <EmbeddedCode />
        ];
    }
}

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = () => {
    return {};
};


export default connect(mapStateToProps, mapDispatchToProps)(PlayerForm);