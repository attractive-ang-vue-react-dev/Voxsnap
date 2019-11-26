import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import { toast, style } from 'react-toastify';

import './Notification.scss';

// style({
//     width: '500px',
//     TOP_CENTER: {
//         top: '1em',
//         marginLeft: '-250px',
//         left: '50%'
//     }
// });

class Notification {
    static success(text) {
        this.show(text, 'success');
    }

    static error(data) {
        this.show(data, 'error');
    }

    static show(data, type) {
        toast(this.render(data, type), {
            hideProgressBar: true,
            position: toast.POSITION.TOP_CENTER,
            className: `notification ${type}`,
            closeOnClick: false
        });
    }

    static render(data, type) {
        return (
            <div className="notification-body">
                {type === 'error' && JSON.stringify(data)|| data}
                <ToastContainer />
            </div>
        );
    }
}

export default Notification;