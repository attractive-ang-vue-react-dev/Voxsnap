import React from 'react';
import qs from 'qs';

import './OrderNarrations.scss';

//components
import OrderNarrationsForm from './components/OrderNarrationsForm/OrderNarrationsForm.jsx';

class OrderNarrationsPrev extends React.Component {
    render() {
        const { location } = this.props;
        const searchParams = qs.parse(location.search.replace('?', ''));
        return (
            <div className="order-narration container">
                <OrderNarrationsForm
                    initialValues={{
                        'pack_type': searchParams.type ? searchParams.type : 'o',
                        'narrations_count': searchParams.narr ? searchParams.narr : 1,
                        'narrations': [{}],
                        'list_all_posts': true
                    }}
                />
            </div>
        );
    }
}

export default OrderNarrationsPrev;
