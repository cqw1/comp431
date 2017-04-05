import { getHeadline, getAvatar, getFollowing } from './components/main/mainActions.js'
import { getArticles } from './components/article/articleActions.js'
import { getProfile } from './components/auth/authActions'

// Fetch wrapper
export const url = 'https://webdev-dummy.herokuapp.com'

const resource = (method, endpoint, payload) => {
    const options =  {
        method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json' 
        } 
    }

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

const nonJSONResource = (method, endpoint, payload) => {
    const options =  {
        method,
        credentials: 'include',
        body: payload,
    }


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

export function sendGetHeadlines() {
    console.log('sendGetHeadlines');

    const options =  {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json' 
        } 
    }

    return fetch('http://localhost:3000/headlines', options)
        .then(r => {
            if (r.status === 200) {
                return (r.headers.get('Content-Type').indexOf('json') > 0) ? r.json() : r.text()
            } else {
                // useful for debugging, but remove in production
                //console.error(`${method} ${endpoint} ${r.statusText}`)
                console.error(`${r.statusText}`)
                throw new Error(r.statusText)
            }
        }).then(body => {
            console.log(body);
        })
}

export function getPrettyDate(date) {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
}

export function getPrettyTime(date) {
    const dateObj = new Date(date);
    return dateObj.toLocaleTimeString().split(' ')[0];
}

// Generic navigation actions.
export const ActionTypes = {
    NAVIGATE_PROFILE: 'NAVIGATE_PROFILE', 
    NAVIGATE_MAIN: 'NAVIGATE_MAIN', 
    NAVIGATE_LANDING: 'NAVIGATE_LANDING', 
}

export const navigateProfile = () => (dispatch) => {
    dispatch(getProfile());
    dispatch({ type: ActionTypes.NAVIGATE_PROFILE })
}

export const navigateMain = () => (dispatch) => {
    dispatch(getHeadline());
    dispatch(getAvatar());
    dispatch(getArticles());
    dispatch(getFollowing());
    dispatch({ type: ActionTypes.NAVIGATE_MAIN })
}

export const navigateLanding = () => (dispatch) => {
    dispatch({ type: ActionTypes.NAVIGATE_LANDING })
}

export { resource, nonJSONResource }
