import { resource } from '../../actions.js'
import { getArticles } from '../article/articleActions.js'

import {AlertType, showAlert} from '../alert/alertActions.js'

// Actions triggered by events from the main page.
export const MainAction = {
    UPDATE_FOLLOWING: 'UPDATE_FOLLOWING',
    GET_HEADLINE: 'GET_HEADLINE', 
    GET_AVATAR: 'GET_AVATAR', 
    UPDATE_HEADLINE: 'UPDATE_HEADLINE',
}

export const unfollowUser = (username) => {
    if (username.length > 0) {

        return (dispatch) => {
            resource('DELETE', 'following/' + username)
            .then(r => {
                dispatch(createFollowProfiles(r.following.join(',')));
                dispatch(getArticles());
            }).catch((err) => {
                console.log(err);
                dispatch(showAlert(err.toString(), AlertType.ERROR));
            })
        }
    }
}

export const followUser = (username) => {
    if (username.length > 0) {

        return (dispatch) => {
            resource('PUT', 'following/' + username)
            .then(r => {
                dispatch(createFollowProfiles(r.following.join(',')));
                dispatch(getArticles());
            }).catch((err) => {
                console.log(err);
                dispatch(showAlert(err.toString(), AlertType.ERROR));
            })
        }
    }
}

export function getFollowing() {
    return (dispatch) => {
        let following = [];
        resource('GET', 'following/')
        .then(r => {
            dispatch(createFollowProfiles(r.following.join(',')))
        }).catch((err) => {
            console.log(err);
            dispatch(showAlert(err.toString(), AlertType.ERROR));
        })
    }
}

function createFollowProfiles(usernames) {
    return (dispatch) => {
        let following = [];
        resource('GET', 'headlines/' + usernames)
        .then(r => {
            following = r.headlines;

            return resource('GET', 'avatars/' + usernames)
        }).then(r => {
            following.forEach(function(element, index) {
                Object.assign(element, r.avatars[index])
            })

            dispatch({
                type: MainAction.UPDATE_FOLLOWING,
                following,
            })
        }).catch((err) => {
            console.log(err);
            dispatch(showAlert(err.toString(), AlertType.ERROR));
        })
    }
}

export function getAvatar() {
    return (dispatch) => {
        resource('GET', 'avatars/')
        .then(r => {
            dispatch({
                type: MainAction.GET_AVATAR,
                avatar: r.avatars[0].avatar,
            })
        }).catch((err) => {
            console.log(err);
            dispatch(showAlert(err.toString(), AlertType.ERROR));
        })
    }
}

export function getHeadline() {
    return (dispatch) => {
        resource('GET', 'headlines/')
        .then(r => {
            dispatch({
                type: MainAction.GET_HEADLINE,
                headline: r.headlines[0].headline,
            })
        }).catch((err) => {
            console.log(err);
            dispatch(showAlert(err.toString(), AlertType.ERROR));
        })
    }
}


export function updateHeadline(text) {
    if (text.length > 0) {
        return (dispatch) => {
            resource('PUT', 'headline/', {headline: text})
            .then(r => {
                dispatch({
                    type: MainAction.UPDATE_HEADLINE,
                    headline: text,
                })

                dispatch(showAlert('Updated headline.', AlertType.SUCCESS));

            }).catch((err) => {
                console.log(err);
                dispatch(showAlert(err.toString(), AlertType.ERROR));
            })
        }
    }
}
