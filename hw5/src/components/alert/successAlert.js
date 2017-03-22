import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {closeSuccessAlert} from './alertActions.js'

// Displays a success message to the user.
export const SuccessAlert= ({ 
    successMessage,
    showSuccessAlert,
    closeSuccessAlert,
}) =>  {

    const _close = () => {
        console.log('_close');
        closeSuccessAlert();
    }
    
    if (showSuccessAlert) {
        return (
            <div className='alert alert-success alert-position'> 
                <span>{successMessage}</span>
                <span 
                    className='close glyphicon glyphicon-remove' 
                    onClick={_close}>
                </span>
            </div>
        )
    } else {
        return <div />
    }
}

export default connect(
    (state) => ({ 
        successMessage: state.alertReducer.successMessage,
        showSuccessAlert: state.alertReducer.showSuccessAlert
    }),
    (dispatch) => ({ closeSuccessAlert: () => dispatch(closeSuccessAlert()) })
)(SuccessAlert)

