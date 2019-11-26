import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

import { validatePromoCode } from './actions.es6';

import './PromoCodeForm.scss';

class PromoCodeForm extends React.Component {
    render() {
        const { savedWithPromo } = this.props;
        return (
            <div className="section">
                <div className="columns form-row promo-wrapper success">
                    <div className="col-3">
                        <h3>Promo code</h3>
                    </div>
                    <div className="input-wrapper">
                        <Field component="input" name="code" type="text" className="input" />
                    </div>
                    <button className="btn btn-pink" type="submit" onClick={this.props.handleSubmit}>Apply</button>
                    {savedWithPromo &&
                    <div className="promo-result">
                        You saved ${savedWithPromo}
                    </div>
                    }
                </div>
            </div>
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