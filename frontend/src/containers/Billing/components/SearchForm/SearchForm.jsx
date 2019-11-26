import React from 'react';
import { connect } from 'react-redux';

import {Field, reduxForm} from 'redux-form';
import _ from 'lodash';

import './SearchForm.scss';

//components

class SearchForm extends React.Component {
    constructor(props) {
        super(props);

        this.debouncedChange = null;
    }

    componentDidMount() {
        this.debouncedChange = _.debounce(e => {
            const { formValues, onSearchValueChange } = this.props;

            let searchParams = null;
            if (e.target) {
                searchParams = _.extend({[e.target.name]: e.target.value}, formValues);
            } else {
                searchParams = _.extend({status: e}, formValues);
            }

            onSearchValueChange(searchParams);
        }, 400);
    }

    render() {
        return (
            <div className="search-billing-form">
                <div className="container">
                    <div>
                        <h3 className="title">Billing</h3>
                    </div>
                    <div>
                        <div className="search-input">
                            <Field component="input" type="text" placeholder="Search…" name="q" onChange={this.debouncedChange} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateTuProps = state => {
    return {
        formValues: state.form.searchBillingForm && state.form.searchBillingForm.values ? state.form.searchBillingForm.values : {}
    };
};

const mapDispatchToProps = () => {
    return {};
};

SearchForm = reduxForm({
    form: 'searchBillingForm'
})(SearchForm);

export default connect(mapStateTuProps, mapDispatchToProps)(SearchForm);