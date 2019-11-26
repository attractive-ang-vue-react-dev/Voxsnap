import React from 'react';
import { Switch, Route } from 'react-router';

import urls from '../../urls.es6';

//components
import NarrationsList from './containers/NarrationsList/NarrationsList.jsx';
import NarrationDetails from './containers/NarrationDetails/NarrationDetails.jsx';

class Narrations extends React.Component {
    render() {
        return (
            <Switch>
                <Route path={urls.narrations} exact component={NarrationsList}/>
                <Route path={urls.narrationDetails} exact component={NarrationDetails}/>
            </Switch>
        );
    }
}

export default Narrations;