import React from 'react';
import Select from 'react-select';
import Async from 'react-select/lib/Async';

import './ReduxFormSelect.scss';

class ReduxFormSelect extends React.Component {
    render() {
        const { input, loadOptions, autosize=false } = this.props;
        const Component = loadOptions
            ? Async
            : Select;

        return (
            <Component
                value={input.value}
                onChange={input.onChange}
                onBlur={() => input.onBlur(input.value)}
                autosize={autosize}
                {...this.props}
            />
        );
    }
}

export default ReduxFormSelect;