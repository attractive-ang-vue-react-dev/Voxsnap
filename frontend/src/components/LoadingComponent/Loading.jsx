import React from 'react';

import './Loading.scss';

class LoadingComponent extends React.Component {
    render() {
        const { className, whiteCircle } = this.props;
        const circleClass = (!whiteCircle ? 'loading-component_circle' : 'loading-component_circle-white');
        return (
            <div className={`loading-component ${className}`}>
                <div className="loading-component_loading">
                    <div id="loading-circle-first" className={circleClass} />
                    <div id="loading-circle-second" className={circleClass} />
                    <div id="loading-circle-last" className={circleClass} />
                </div>
            </div>
        );
    }
}

export default LoadingComponent;