import React from 'react';
//import {connect} from 'react-redux';
//import { Field, reduxForm, FieldArray } from 'redux-form';
//import _ from 'lodash';
//import classNames from 'classnames';

import './AdditionalServicesBoxes.scss';

//import { additionalServices } from '../../../../constants/orderConstants.es6';

class AdditionalServicesBoxes extends React.Component {
    render() {
        const { prices } = this.props;
        //const { formValues, onGetPostData, narrators, onPlayPauseNarrator, fields, prices } = this.props;

        return (
            <div className="AdditionalServices-colElements">
                <section className="AdditionalServices-services">
                    {prices.additionalServices.map((svcBox, index) => {
                        return [
                            <section className="AdditionalServices-servicesItem" key={index}>
                                <div className="AdditionalServices-servicesItemName">{svcBox.title}</div>
                                <div className="AdditionalServices-servicesItemDesc">{svcBox.body}</div>
                                <div className="AdditionalServices-servicesItemInfo">INCLUDED</div>
                            </section>
                        ];
                    })}
                </section>
                <div className="AdditionalServices-servicesInfo">Once your first narration is published you can distribute it on the above platforms for no additional charge</div>
            </div>
        );
    }
}

export default AdditionalServicesBoxes;
