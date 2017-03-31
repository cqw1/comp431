import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { AlertType, closeAlert } from './alertActions.js'

// Displays an alert to the user; can be colored for success or error.
export const Alert= ({ 
    closeAlert,
    alert,
}) =>  {

    const _close = () => {
        closeAlert();
    }

    if (alert.alertType) {
        return(
            <div> 
                <div className={'alert alert-position ' + 
                    (alert.alertType == AlertType.SUCCESS ? 
                     'alert-success' : 'alert-danger')}> 
                    <span>{alert.message}</span>
                    <span 
                        className='close glyphicon glyphicon-remove' 
                        onClick={_close}>
                    </span>
                </div>
            </div>
        );

    } else { 
        return(
            <div /> 
        );
    }
}

export default connect(
    (state) => ({ 
        alert: state.alertReducer.alert,
    }),
    (dispatch) => ({ closeAlert: () => dispatch(closeAlert()) })
)(Alert)

