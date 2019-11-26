import React from 'react';

import './OrderComplete.scss';

class OrderComplete extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="order-complete text-center">
                    <h1>Thank you for your order!</h1><br/><br/>
                    <p>Your receipt has been send to the email you provided.</p><br/><br/>
                    <p>Your narration is being created and we will send you an email with<br/><br/> the embeddable code as soon as it is complete</p><br/><br/>
                    <a href="/">
                        <button className="btn btn-green big">OK</button>
                    </a>
                </div>
            </div>
        );
    }
}

export default OrderComplete;
