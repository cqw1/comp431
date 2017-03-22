import { resource } from '../../actions.js'

// Actions for managing success and error alerts.
export const AlertAction = {
    CLOSE_SUCCESS_ALERT: 'CLOSE_SUCCESS_ALERT',
    SHOW_SUCCESS_ALERT: 'SHOW_SUCCESS_ALERT',
    CLOSE_ERROR_ALERT: 'CLOSE_ERROR_ALERT',
    SHOW_ERROR_ALERT: 'SHOW_ERROR_ALERT',
}

export const closeSuccessAlert = () => (dispatch) => {
    console.log('closeSuccessAlert');
    dispatch({
        type: AlertAction.CLOSE_SUCCESS_ALERT,
    })
}

export const showSuccessAlert = (message) => (dispatch) => {
    dispatch({
        type: AlertAction.SHOW_SUCCESS_ALERT,
        message
    })
}

export const closeErrorAlert = () => (dispatch) => {
    dispatch({
        type: AlertAction.CLOSE_ERROR_ALERT,
    })
}

export const showErrorAlert = (message) => (dispatch) => {
    dispatch({
        type: AlertAction.SHOW_ERROR_ALERT,
        message
    })
}
