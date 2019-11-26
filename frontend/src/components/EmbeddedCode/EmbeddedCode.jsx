import React from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';

class EmbeddedCode extends React.Component {
    render() {
        return (
            <div className="columns form-row" key="player-config">
                <div className="row-title">
                    <h3>Embedded Code</h3>
                </div>
                <div className="player-config">
                    <Tabs className="tabs">
                        <TabList>
                            <Tab> Wordpress / CMS</Tab>
                            <Tab>Medium / Linkedin / Twitter</Tab>
                        </TabList>
                        <TabPanel>
                            <textarea value="<div><script type='text/javascript' src='https://data.voxsnap.com/player/v1/fusephase/7/voxsnap.js'></script></div>" readOnly />
                        </TabPanel>
                        <TabPanel>
                            <textarea value="<div><script type='text/javascript' src='https://data.voxsnap.com/player/v1/medium/7/voxsnap.js'></script></div>" readOnly />
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        );
    }
}

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(EmbeddedCode);