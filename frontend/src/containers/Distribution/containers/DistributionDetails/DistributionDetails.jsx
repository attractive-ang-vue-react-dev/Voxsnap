import React from 'react';
import {connect} from 'react-redux';

import './DistributionDetails.scss';

//components
import DistributionElement from '../../components/DistributionElement/DistributionElement.jsx';
import * as actions from '../../../Distribution/containers/DistributionDetails/actions.es6';

const defaultDistributions = [
    {
        id: 1,
        title: 'Blog',
        description: 'Client blog',
        status: 'default'
    },
    {
        id: 2,
        title: 'Library',
        description: 'VoxSnap Library',
        status: 'default'
    }
];


class DistributionDetails extends React.Component {
    componentDidMount() {
        const { getAdditionalServices } = this.props;
        getAdditionalServices();
    }

    render() {
        const { additionalServicesList } = this.props;

        return (
            <div className="distribution-details container">
                <div className="distribution">
                    <div className="section">
                        <div className="title">
                            <h3>Distribution</h3>
                        </div>
                        <div className="columns form-row">
                            <div className="col-3">
                                <h3>Included</h3>
                            </div>
                            <div className="distribution-elements">
                                {defaultDistributions.map(distribution =>
                                    <DistributionElement {...distribution} key={distribution.id}/>
                                )}
                            </div>
                        </div>
                        <div className="columns form-row">
                            <div className="col-3">
                                <h3>Aditional Distribution</h3>
                            </div>
                            <div className="distribution-elements">
                                {additionalServicesList.map(distribution =>
                                    <DistributionElement {...distribution} key={distribution.id}/>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const customer = state.authReducer.currentUser && state.authReducer.currentUser.customer;
    const additionalServicesList = state.additionalServicesReducer.additionalServicesList.map(service => ({
        ...service,
        status: customer && customer[service.slug] ? 'enabled' : 'disabled'
    }));
    return {
        additionalServicesList,
        additionalServicesLoading: state.additionalServicesReducer.additionalServicesLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAdditionalServices: () => {
            dispatch(actions.getAdditionalServices());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DistributionDetails);