import { resource } from '../../actions.js'

// Actions for managing success and error alerts.
export const AlertType = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
}

export const AlertAction = {
    CLOSE_ALERT: 'CLOSE_ALERT',
    SHOW_ALERT: 'SHOW_ALERT',
}

export const closeAlert = () => (dispatch) => {
    dispatch({
        type: AlertAction.CLOSE_ALERT,
    })
}

export const showAlert = (message, alertType) => (dispatch) => {
    dispatch({
        type: AlertAction.SHOW_ALERT,
        message,
        alertType,
    })
}

