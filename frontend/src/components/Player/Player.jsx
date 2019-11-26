import React from 'react';
import { connect } from 'react-redux';

import VoxsnapPlayer from '../../../voxsnap_modules/voxsnap-embedded-player/voxsnap/VoxsnapPlayer.js';

class Player extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate() {
        return false;
    }

    // componentWillReceiveProps(props) {
    //     const {userName, narrationId} = props;

    //     if (userName && narrationId) {
    //         this.player.reload(userName.toLowerCase(), narrationId);
    //         this.player.setupActions();
            
    //         this.player.createHTML();
    //         this.player.appendTo(this.refs.voxsnapPlayer);
    //     }
    // }

    componentDidMount() {
        this.player = new VoxsnapPlayer('blazemeter', '61', null, 'https://data.voxsnap.com/player/');
        
        try {
            this.player.setupCSS();
        } catch(err) {
            console.error(err);
        }
    }

    render() {
        return (<div ref="voxsnapPlayer" id="voxsnap-player"></div>);
    }
}

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);