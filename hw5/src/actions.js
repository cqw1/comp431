//import fetch from 'isomorphic-fetch'

/**
 * Fetch wrapper
 */
export const url = 'https://webdev-dummy.herokuapp.com'

const resource = (method, endpoint, payload) => {
    const options =  {
        method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json' } }

    if (payload) options.body = JSON.stringify(payload)

    return fetch(`${url}/${endpoint}`, options)
        .then(r => {
            if (r.status === 200) {
                return (r.headers.get('Content-Type').indexOf('json') > 0) ? r.json() : r.text()
            } else {
                // useful for debugging, but remove in production
                console.error(`${method} ${endpoint} ${r.statusText}`)
                throw new Error(r.statusText)
            }
        })
}

/**
 * Generic navigation actions.
 */
export const ActionTypes = {
    NAVIGATE_PROFILE: 'NAVIGATE_PROFILE', 
    NAVIGATE_MAIN: 'NAVIGATE_MAIN', 
    NAVIGATE_LANDING: 'NAVIGATE_LANDING', 
}

export const navigateProfile = () => (dispatch) => {
    dispatch({ type: ActionTypes.NAVIGATE_PROFILE })
}

export const navigateMain = () => (dispatch) => {
    dispatch({ type: ActionTypes.NAVIGATE_MAIN })
}

export const navigateLanding = () => (dispatch) => {
    dispatch({ type: ActionTypes.NAVIGATE_LANDING })
}

export { resource }
