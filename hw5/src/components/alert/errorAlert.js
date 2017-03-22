import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {closeErrorAlert} from './alertActions.js'

// Displays a error message to the user.
export const ErrorAlert= ({ 
    errorMessage,
    showErrorAlert,
    closeErrorAlert,
}) =>  {

    const _close = () => {
        console.log('_close');
        closeErrorAlert();
    }
    
    if (showErrorAlert) {
        return (
            <div className='alert alert-danger alert-position'> 
                <span>{errorMessage}</span>
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
        errorMessage: state.alertReducer.errorMessage,
        showErrorAlert: state.alertReducer.showErrorAlert
    }),
    (dispatch) => ({ closeErrorAlert: () => dispatch(closeErrorAlert()) })
)(ErrorAlert)

