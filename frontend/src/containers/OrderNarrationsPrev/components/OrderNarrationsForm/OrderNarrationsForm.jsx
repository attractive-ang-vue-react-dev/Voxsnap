import React from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm, FieldArray } from 'redux-form';
import Sound from 'react-sound';
import _ from 'lodash';
import classNames from 'classnames';
import StripeCheckout from 'react-stripe-checkout';

import { packages, additionalServices, bloggingPlatforms, wordsInPackage } from '../../../../constants/orderConstants.es6';
import * as globalActions from '../../../../globalActions.es6';

import './OrderNarrationsForm.scss';

import { postOrder } from './actions.es6';

//components
import ReduxFormSelect from '../../../../components/ReduxFormSelect/ReduxFormSelect.jsx';
import NarrationsForm from '../NarrationsForm/NarrationsForm.jsx';
import PromoCodeForm from '../PromoCodeForm/PromoCodeForm.jsx';

const UserDetailsForm = () => [
    <div className="columns form-row">
        <div className="col-3">
            <h3>Company</h3>
        </div>
        <div className="col-3">
            <div className="input-container">
                <label>Name</label>
                <Field
                    name="customer.company_name"
                    component="input"
                    type="text"
                    className="input"
                    required
                />
            </div>
        </div>
        <div className="col-3">
            <div className="input-container">
                <label>Phone number</label>
                <Field
                    name="customer.phone_number"
                    component="input"
                    type="text"
                    className="input"
                    required
                />
            </div>
        </div>
    </div>,
    <div className="columns form-row">
        <div className="col-3">
            <h3>You</h3>
        </div>
        <div className="col-3">
            <div className="input-container">
                <label>Name</label>
                <Field
                    name="your_name"
                    component="input"
                    type="text"
                    className="input"
                    required
                />
            </div>
        </div>
        <div className="col-3">
            <div className="input-container">
                <label>Email</label>
                <Field
                    name="email"
                    component="input"
                    type="email"
                    className="input"
                    required
                />
            </div>
        </div>
    </div>
];

class OrderNarrationsForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showPromocodeBlock: false
        };

        this.stripeButtonRef = null;
    }

    componentDidMount() {
        console.log('mounted');
        console.log(this.props.getUserDetails());
    }

    showPromocode() {
        this.setState({
            showPromocodeBlock: true
        });
    }

    onSubmitButtonClick(token) {
        const { onSubmit, formValues } = this.props;
        onSubmit(_.extend({
            'stripe_token': token.id
        }, formValues));
    }

    getPaymentDescription() {
        return this.props.formValues.narrations_count + ' Narrations';
    }

    handleSubmit() {
        this.stripeButtonRef.onClick();
    }

    render() {
        const { formValues, isPlayingNarrator, narratorSampleUrl, promoCode, handleSubmit, currentUser } = this.props;

        const { showPromocodeBlock } = this.state;

        const selectedPackType = formValues.pack_type ? _.find(packages, {value: formValues.pack_type}) : {};

        const prices = formValues.narrations_count ? _.find(selectedPackType.prices, (price, index) => {
            const narrationsCount = parseInt(formValues.narrations_count, 10);
            return selectedPackType.prices[index + 1] ? narrationsCount >= price.narrationsCount && narrationsCount < selectedPackType.prices[index + 1].narrationsCount : true;
        }) : {};

        const overPackageWords = _.sumBy(formValues.narrations, narration => {
            return narration.words && narration.words > wordsInPackage ? narration.words - wordsInPackage : 0;
        });

        let additionalServicesPrice = 0;

        if (formValues.customer && formValues.customer.additional_services) {
            additionalServicesPrice = _.sumBy(formValues.customer.additional_services, service => {
                if (!service) {
                    return 0;
                }
                const serviceKey = Object.keys(service)[0];

                const serviceObj = _.find(additionalServices, {value: serviceKey});

                return service[serviceKey] ? serviceObj.price : 0;
            });
        }

        const packOrNarrationsCount = formValues.narrations_count > formValues.narrations.length ? formValues.narrations_count : formValues.narrations.length;
        //const packOrNarrationsCount = 1;

        const totalWithoutDiscount = prices.packagePrice * packOrNarrationsCount + overPackageWords * prices.additionalPrice + additionalServicesPrice;

        let totalCount;
        let savedWithPromo;

        if (!_.isEmpty(promoCode)) {
            totalCount = promoCode['discount_fixed'] ? totalWithoutDiscount - promoCode['discount_fixed'] : totalWithoutDiscount * (100 - promoCode['discount_percent']) / 100;
            savedWithPromo = (totalWithoutDiscount - totalCount).toFixed(2);
        } else {
            totalCount = totalWithoutDiscount;
        }

        return (
            <form className="order-narrations-form" onSubmit={handleSubmit(::this.handleSubmit)}>
                <div className="section">
                    <div className="title">
                        <h3>Order Narrations</h3>
                    </div>
                    <div className="columns form-row package-row">
                        <div>
                            <h3>Package</h3>
                        </div>
                        <div className="package radio-button-wrapper">
                            {packages.map(packageObj => {
                                const checked = packageObj.value === selectedPackType.value;
                                const packagesClasses = classNames({
                                    'active': checked
                                });
                                return (
                                    <label key={packageObj.label} className={packagesClasses}>
                                        <div>{packageObj.label}</div>
                                        <Field
                                            component="input"
                                            type="radio"
                                            name="pack_type"
                                            value={packageObj.value}
                                            checked={checked}
                                        />
                                    </label>
                                );
                            })}
                        </div>
                        <div className="narrators-count">
                            <Field
                                name="narrations_count"
                                component="input"
                                type="text"
                                className="input"
                            />
                            <label>Narrations</label>
                        </div>
                        {prices &&
                        <div className="pricing">
                            <div className="price">
                                <span>${prices.packagePrice}</span> ({wordsInPackage} word post)
                            </div>
                            <div className="caption">
                                ${prices.additionalPrice} each aditional word
                            </div>
                        </div>
                        }
                    </div>
                    { currentUser === null && <UserDetailsForm /> }
                    <FieldArray name="narrations" component={NarrationsForm} prices={prices} />
                    <div className="global-notes">
                        <h3>Global Notes</h3>
                        <Field
                            name="notes"
                            component="textarea"
                            className="input"
                        />
                    </div>
                    <div className="columns form-row blogging-platform">
                        <div className="col-3">
                            <h3>Blogging Platform</h3>
                        </div>
                        <div className="col-3">
                            <Field
                                name="customer.blogging_platforms"
                                component={ReduxFormSelect}
                                options={bloggingPlatforms}
                                simpleValue
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="section ">
                    <div className="columns form-row additional-services-row">
                        <div className="col-3">
                            <h3>Additional Monthly Services</h3>
                        </div>
                        <div className="additional-services">
                            {additionalServices.map((service, index) => {
                                const labelClasses = classNames({
                                    checked: formValues.customer && formValues.customer.additional_services && formValues.customer.additional_services[index] ? formValues.customer.additional_services[index][service.value] : false
                                });
                                return (
                                    <label key={service.name} className={labelClasses}>
                                        <div className="name">
                                            {service.name}
                                        </div>
                                        <div className="description">
                                            {service.description}
                                        </div>
                                        <div className="price">
                                            ${service.price}
                                        </div>
                                        <Field
                                            name={`customer.additional_services[${index}].${service.value}`}
                                            component="input"
                                            type="checkbox"
                                            value={service.value}
                                        />
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                </div>
                {showPromocodeBlock &&
                <PromoCodeForm
                    savedWithPromo={savedWithPromo}
                />
                }
                <div className="complete-order-block">
                    {!showPromocodeBlock &&
                    <div className="promo-button-wrapper">
                        <button className="promo-button" onClick={::this.showPromocode}>I have a Promo Code</button>
                    </div>
                    }
                    <label>
                        <Field
                            name="list_all_posts"
                            component="input"
                            type="checkbox"
                        />
                        <span>List all in our <b>VoxSnap</b> Library (Extra SEO/marketing benefit)</span>
                    </label>
                    <div className="submit-button-container">
                        <StripeCheckout
                            token={token => ::this.onSubmitButtonClick(token)}
                            stripeKey={window.STRIPE_API_KEY}
                            email={formValues.email}
                            name='VoxSnap'
                            description={this.getPaymentDescription()}
                            image='https://voxsnap.com/img/logo_square.png'
                            amount={totalCount * 100}
                            ref={ref => this.stripeButtonRef = ref}
                        >
                            <span/>
                        </StripeCheckout>
                        <button className="btn btn-green big" type="submit">
                            Complete Payment
                            {totalCount &&
                            <span> – ${totalCount.toFixed(2)}</span>
                            }
                        </button>
                        <p className="text-center paym-agreement">
                            By Paying I agree to the <a href="https://voxsnap.com/terms/" target="_blank">terms of use</a> and <a href="https://voxsnap.com/privacy/" target="_blank">privacy policy</a>
                        </p>
                    </div>
                    {parseInt(formValues.narrations_count, 10) > formValues.narrations.length &&
                    <div>
                        {formValues.narrations.length} narration(s) used, you'll have {parseInt(formValues.narrations_count, 10) - formValues.narrations.length} narration(s) to use later
                    </div>
                    }
                </div>
                {narratorSampleUrl &&
                <Sound
                    url={narratorSampleUrl}
                    playStatus={isPlayingNarrator ? Sound.status.PLAYING : Sound.status.PAUSED}
                />
                }
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        formValues: state.form ? (state.form.orderNarrationsForm && state.form.orderNarrationsForm.values) ? state.form.orderNarrationsForm.values : {narrations: []} : {},
        narrators: state.orderNarrationReducer.narrators,
        isPlayingNarrator: state.orderNarrationReducer.isPlayingNarrator,
        narratorSampleUrl: state.orderNarrationReducer.narratorSampleUrl,
        promoCode: state.orderNarrationReducer.promoCode,
        userDetails: state.authReducer.userDetails,
        currentUser: state.authReducer.currentUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUserDetails: () => {
            dispatch(globalActions.getUserDetails());
        },
        onSubmit: data => {
            const formData = _.extend({}, data);
            if (data.narrations) {
                formData.narrations = [];
                data.narrations.forEach(narratorObj => {
                    if (!_.isEmpty(narratorObj)) {
                        formData.narrations.push(_.extend(narratorObj, {narrator: narratorObj.narrator.id}));
                    }
                });
            }

            if (formData.customer && formData.customer.additional_services) {
                formData.customer['additional_services'] = data.customer.additional_services.map(service => {
                    if (service) {
                        const key = Object.keys(service)[0];
                        if (service[key]) {
                            return key;
                        }
                    }
                });
            }
            delete formData.pack_narrations;
            dispatch(postOrder(formData));
        }
    };
};

OrderNarrationsForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderNarrationsForm);

export default reduxForm({
    form: 'orderNarrationsForm'
})(OrderNarrationsForm);
