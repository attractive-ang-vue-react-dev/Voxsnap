import React from 'react';
import { connect } from 'react-redux';

import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import _ from 'lodash';

import './SearchForm.scss';

import urls from '../../../../../../urls.es6';
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
            <div className="search-playlists-form">
                <div className="container">
                    <div>
                        <Link to={urls.playlistForm} className="btn btn-pink big">Add playlist</Link>
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
        formValues: state.form.searchPlaylistsForm && state.form.searchPlaylistsForm.values ? state.form.searchPlaylistsForm.values : {}
    };
};

const mapDispatchToProps = () => {
    return {};
};

SearchForm = reduxForm({
    form: 'searchPlaylistsForm'
})(SearchForm);

export default connect(mapStateTuProps, mapDispatchToProps)(SearchForm);