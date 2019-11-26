import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import Sound from 'react-sound';
import StripeCheckout from 'react-stripe-checkout';
import { Field, FieldArray, reduxForm } from 'redux-form';
import ReduxFormSelect from '../../../../components/ReduxFormSelect/ReduxFormSelect.jsx';
import { bloggingPlatforms, packages, wordsInPackage } from '../../../../constants/orderConstants.es6';
import * as globalActions from '../../../../globalActions.es6';
import AdditionalServicesBoxes from '../AdditionalServicesBoxes/AdditionalServicesBoxes.jsx';
import NarrationsForm from '../NarrationsForm/NarrationsForm.jsx';
import PromoCodeForm from '../PromoCodeForm/PromoCodeForm.jsx';
import { postOrder } from './actions.es6';
import './OrderForm.scss';

class OrderForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showPromocodeBlock: false
        };

        this.stripeButtonRef = null;
    }

    componentDidMount() {
        // console.log('DEBUG: mounted');
        // console.log(this.props.getUserDetails());
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
        const { formValues, isPlayingNarrator, narratorSampleUrl, promoCode, handleSubmit } = this.props;
        const { showPromocodeBlock } = this.state;

        const selectedPackType = formValues.package ? _.find(packages, {value: formValues.package}) : _.find(packages, {value: 'starter'});
        const planType = formValues.pack_type === 'annual' ? 'Annual' : 'Monthly';

        // const prices = formValues.narrations_count ? _.find(selectedPackType.prices, (price, index) => {
        //     const narrationsCount = parseInt(formValues.narrations_count, 10);
        //     return selectedPackType.prices[index + 1] ? narrationsCount >= price.narrationsCount && narrationsCount < selectedPackType.prices[index + 1].narrationsCount : true;
        // }) : {};


        //const prices = formValues.pack_type ? _.find(selectedPackType.prices, {value: formValues.pack_type}) : {};

        // for some reason I can't just do selectedPackType.prices[formValues.pack_type] because it is null at times
        const prices = selectedPackType.prices ? _.find(selectedPackType.prices, {label: planType}) : _.find(selectedPackType.prices, {label: 'Monthly'});

        const overPackageWords = _.sumBy(formValues.narrations, narration => {
            return narration.words && narration.words > wordsInPackage ? narration.words - wordsInPackage : 0;
        });

        // let additionalServicesPrice = 0;

        // if (formValues.customer && formValues.customer.additional_services) {
        //     additionalServicesPrice = _.sumBy(formValues.customer.additional_services, service => {
        //         if (!service) {
        //             return 0;
        //         }
        //         const serviceKey = Object.keys(service)[0];

        //         const serviceObj = _.find(additionalServices, {value: serviceKey});

        //         return service[serviceKey] ? serviceObj.price : 0;
        //     });
        // }

        //const packOrNarrationsCount = formValues.narrations_count > formValues.narrations.length ? formValues.narrations_count : formValues.narrations.length;
        //const narrationsNeeded = formValues.narrations_count + formValues.narrations.length;
        //const narrationsNeeded = prices.narrationsCount + parseInt(formValues.narrations_count, 10);

        //bad idea
        // while(formValues.narrations.length < narrationsNeeded) {
        //     formValues.narrations.push({});
        // }

        //const totalWithoutDiscount = prices.packagePrice * packOrNarrationsCount + overPackageWords * prices.additionalPrice + additionalServicesPrice;
        const baseTotal = prices.packagePrice + overPackageWords * prices.additionalPrice;
        const totalWithoutDiscount = formValues.pack_type === 'annual' ? (baseTotal * 12) : baseTotal;

        //console.log(totalWithoutDiscount);

        let totalCount;
        let savedWithPromo;

        if (!_.isEmpty(promoCode)) {
            totalCount = promoCode['discount_fixed'] ? totalWithoutDiscount - promoCode['discount_fixed'] : totalWithoutDiscount * (100 - promoCode['discount_percent']) / 100;
            savedWithPromo = (totalWithoutDiscount - totalCount).toFixed(2);
        } else {
            totalCount = totalWithoutDiscount;
        }

        return (
            <form className="OrderForm" onSubmit={handleSubmit(::this.handleSubmit)}>
                <section className="OrderForm-heading">
                    <h3 className="OrderForm-title">Order Voice Marketing Package</h3>
                </section>
                <section className="OrderForm-section OrderForm-section--dashedBottom">
                    <div className="OrderForm-row">
                        <div className="OrderForm-colName">
                            <h4 className="OrderForm-name">Selected Package</h4>
                        </div>
                        <div className="OrderForm-colElements">
                            <div className="OrderForm-package">
                                <div className="OrderForm-packageInfo">
                                    {packages.map(packageObj => {
                                        if (packageObj.value === selectedPackType.value) {
                                            return (
                                                <b key={packageObj.value}>{packageObj.label}</b>
                                            );
                                        }
                                    })}
                                </div>
                                <div className="OrderForm-packageInfo">
                                    <b>{planType}</b>
                                </div>
                                <div className="OrderForm-packageChange">
                                    <a href="/pricing/packages/" className="OrderForm-packageChangeBtn">Change</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="OrderForm-section OrderForm-section--dashedBottom">
                    <div className="OrderForm-row">
                        <div className="OrderForm-colName">
                            <h4 className="OrderForm-name">Company</h4>
                        </div>
                        <div className="OrderForm-colElements">
                            <div className="OrderForm-inputGroup">
                                <label>Name</label>
                                <Field
                                    name="customer.company_name"
                                    component="input"
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="OrderForm-inputGroup">
                                <label>Phone number</label>
                                <Field
                                    name="customer.phone_number"
                                    component="input"
                                    type="text"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </section>,
                <section className="OrderForm-section OrderForm-section--dashedBottom">
                    <div className="OrderForm-row">
                        <div className="OrderForm-colName">
                            <h4 className="OrderForm-name">You</h4>
                        </div>
                        <div className="OrderForm-colElements">
                            <div className="OrderForm-inputGroup">
                                <label>Name</label>
                                <Field
                                    name="your_name"
                                    component="input"
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="OrderForm-inputGroup">
                                <label>Email</label>
                                <Field
                                    name="email"
                                    component="input"
                                    type="email"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <FieldArray name="narrations" component={NarrationsForm} prices={prices} />

                <section className="OrderForm-section">
                    <div className="OrderForm-row">
                        <div className="OrderForm-colName">
                            <h4 className="OrderForm-name">Global Notes</h4>
                        </div>
                        <div className="OrderForm-colElements">
                            <div className="OrderForm-inputTextarea">
                                <Field
                                    name="notes"
                                    component="textarea"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="OrderForm-row">
                        <div className="OrderForm-colName">
                            <h4 className="OrderForm-name">Blogging Platform</h4>
                        </div>
                        <div className="OrderForm-colElements">
                            <div className="OrderForm-inputGroup">
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
                </section>

                <section className="OrderForm-section OrderForm-section--services">
                    <div className="OrderForm-row">
                        <div className="OrderForm-colName">
                            <h4 className="OrderForm-name">Included Services</h4>
                        </div>
                        <AdditionalServicesBoxes prices={prices} />
                    </div>
                </section>

                <section className="OrderForm-complete">
                    <div className="OrderForm-promo">
                        {!showPromocodeBlock &&
                        <button className="OrderForm-promoBtn" onClick={::this.showPromocode}>I have a Promo Code</button>
                        }
                        {showPromocodeBlock &&
                        <PromoCodeForm
                            savedWithPromo={savedWithPromo}
                        />
                        }
                    </div>
                    <div className="OrderForm-submit">
                        <StripeCheckout
                            token={token => ::this.onSubmitButtonClick(token)}
                            stripeKey={window.STRIPE_API_KEY}
                            email={formValues.email}
                            name="VoxSnap"
                            description={this.getPaymentDescription()}
                            image="https://cdn.voxsnap.com/v2/assets/img/logo_square.png"
                            amount={totalCount * 100}
                            ref={ref => this.stripeButtonRef = ref}
                        >
                            <span/>
                        </StripeCheckout>
                        <button className="OrderForm-submitBtn" type="submit">Complete Payment {totalCount &&
                            <span>&nbsp; - ${totalCount.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</span>
                        }
                        </button>
                    </div>
                    <div className="OrderForm-paymentInfo">
                        By Paying I agree to the <a href="https://voxsnap.com/terms/" target="_blank">terms of use</a> and <a href="https://voxsnap.com/privacy/" target="_blank">privacy policy</a>
                    </div>
                </section>
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
        //formValues: state.form.orderNarrationsForm.values,
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

            // shitty hack for now
            if (formData.pack_type === 'annual') {
                formData.pack_type = 'a'; // eslint-disable-line camelcase
            } else if (formData.pack_type === 'monthly') {
                formData.pack_type = 'm'; // eslint-disable-line camelcase
            }

            // another shitty hack to fix the blog selection, it tries to pass the label and value in a dict
            formData.customer.blogging_platforms = formData.customer.blogging_platforms['value']; // eslint-disable-line camelcase

            // if (formData.customer && formData.customer.additional_services) {
            //     formData.customer['additional_services'] = data.customer.additional_services.map(service => {
            //         if (service) {
            //             const key = Object.keys(service)[0];
            //             if (service[key]) {
            //                 return key;
            //             }
            //         }
            //     });
            // }

            //why are we removing pack_narrations?
            delete formData.pack_narrations;
            dispatch(postOrder(formData));
        }
    };
};

OrderForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderForm);

export default reduxForm({
    form: 'orderNarrationsForm'
})(OrderForm);
