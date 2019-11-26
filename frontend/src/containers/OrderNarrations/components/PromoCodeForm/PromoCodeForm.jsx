import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

import { validatePromoCode } from './actions.es6';

import './PromoCodeForm.scss';

class PromoCodeForm extends React.Component {
    render() {
        const { savedWithPromo } = this.props;
        return (
            <section className="PromoCodeForm">
                <div className="OrderForm-row">
                    <div className="OrderForm-colName">
                        <h4 className="OrderForm-name">Promo code</h4>
                    </div>
                    <div className="OrderForm-colElements">
                        <div className="OrderForm-inputGroup">
                            <Field component="input" name="code" type="text" />
                        </div>
                        <div className="OrderForm-inputGroup">
                            <button className="PromoCodeForm-applyBtn" type="submit" onClick={this.props.handleSubmit}>Apply</button>
                        </div>
                    </div>
                </div>
                {savedWithPromo &&
                <div className="PromoCodeForm-result">
                    You saved ${savedWithPromo}
                </div>
                }
            </section>
        );
    }
}

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: data => {
            dispatch(validatePromoCode(data));
        }
    };
};

PromoCodeForm = reduxForm({
    form: 'promoCodeForm'
})(PromoCodeForm);


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PromoCodeForm);
