import React from 'react';
import qs from 'qs';

import './OrderNarrations.scss';

//components
import OrderForm from './components/OrderForm/OrderForm.jsx';

class OrderNarrations extends React.Component {
    render() {
        const { location } = this.props;
        const searchParams = qs.parse(location.search.replace('?', ''));
        return (
            <section className="OrderNarrations">
                <OrderForm
                    initialValues={{
                        'pack_type': searchParams.type ? searchParams.type : 'monthly',
                        'package': searchParams.package ? searchParams.package : 'starter',
                        'narrations_count': searchParams.narr ? searchParams.narr : 0,
                        'narrations': [{}],
                        'list_all_posts': true
                    }}
                />
            </section>
        );
    }
}

// @kanarelo
// we need to add a cookie session lookup, if we have data from the server then pre-populate all the fields
// if not, then get a new session and when data is entered update the server

export default OrderNarrations;
