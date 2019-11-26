import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './DistributionElement.scss';

import urls from '../../../../urls.es6';

//components

class Distribution extends React.Component {
    default() {
        return (
            <i className="fa fa-check" aria-hidden="true"/>
        );
    }

    enabled() {
        const { slug } = this.props;
        return (
            <Link to={urls.distributionEdit.replace(':distribution-slug', slug)} className="edit distribution-button">
                <div>Edit</div>
            </Link>
        );
    }

    disabled() {
        return (
            <button className="enable distribution-button">
                <div className="button-title">
                    Enable
                </div>
                <div className="price">
                    $35
                </div>
            </button>
        );
    }

    render() {
        const { title, description, status } = this.props;
        const statusClasses = classNames({
            'status': true,
            'has-border': status !== 'disabled'
        });
        return (
            <div className="distribution-element">
                <div className="info">
                    <h4 className="distribution-element-title">{title}</h4>
                    <div className="distribution-element-description">{description}</div>
                </div>
                <div className={statusClasses}>
                    {::this[status]()}
                </div>
            </div>
        );
    }
}

export default Distribution;