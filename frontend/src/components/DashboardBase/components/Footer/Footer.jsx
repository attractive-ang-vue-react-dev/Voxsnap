import React from 'react';
import { connect } from 'react-redux';

import urls from '../../../../urls.es6';

import './Footer.scss';

class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                <div className="nav-menu">
                    <ul>
                        <li>
                            <a href={urls.home}>
                                Home
                            </a>
                        </li>
                        <li>
                            <a href={urls.privacy}>
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href={urls.terms}>
                                Terms of Use
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="copyright text-right">
                    <small>Copyright © {(new Date().getFullYear())} VoxSnap Inc. All rights reserved.</small>
                </div>
            </div>
        );
    }
}

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer);
