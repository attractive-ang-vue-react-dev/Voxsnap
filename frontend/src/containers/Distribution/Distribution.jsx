import React from 'react';
import { Switch, Route } from 'react-router';

import urls from '../../urls.es6';

//components
import DistributionDetails from './containers/DistributionDetails/DistributionDetails.jsx';

class Distribution extends React.Component {
    render() {
        return (
            <Switch>
                <Route path={urls.distribution} exact component={DistributionDetails}/>
            </Switch>
        );
    }
}

export default Distribution;