import React from 'react';
import { connect } from 'react-redux';

import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import _ from 'lodash';

import './SearchForm.scss';

import urls from '../../../../../../urls.es6';
//components
import ReduxFormSelect from '../../../../../../components/ReduxFormSelect/ReduxFormSelect.jsx';

const options = [
    {
        label: 'Assigned',
        value: 'S'
    },
    {
        label: 'Accepted',
        value: 'Y'
    },
    {
        label: 'Rejected',
        value: 'N'
    },
    {
        label: 'Review',
        value: 'R'
    },
    {
        label: 'Approved',
        value: 'P'
    }
];

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
        const { narrationsCount } = this.props;
        return (
            <div className="search-narrations-form">
                <div className="container">
                    <div>
                        <Link to={urls.orderNarrations} className="btn btn-pink big">Order narrations</Link>
                        <div className="narrations-count">Available Narrations <span>{narrationsCount}</span></div>
                    </div>
                    <div>
                        <div className="status">
                            <Field component={ReduxFormSelect} type="text" options={options} name="status" placeholder="Filter" onChange={this.debouncedChange} simpleValue />
                        </div>
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
        formValues: state.form.searchNarrationsForm && state.form.searchNarrationsForm.values ? state.form.searchNarrationsForm.values : {}
    };
};

const mapDispatchToProps = () => {
    return {};
};

SearchForm = reduxForm({
    form: 'searchNarrationsForm'
})(SearchForm);

export default connect(mapStateTuProps, mapDispatchToProps)(SearchForm);