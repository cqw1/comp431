import { resource } from '../../actions.js'

/*
 * Actions triggered by events from the main page.
 */
export const MainAction = {
    UPDATE_HEADLINE: 'UPDATE_HEADLINE',
    FOLLOW_USER: 'FOLLOW_USER',
    UNFOLLOW_USER: 'UNFOLLOW_USER',
}

export const unfollowUser = (id) => {
    return {
        type: MainAction.UNFOLLOW_USER,
        id: id 
    }
}

export const followUser = (text) => {
    if (text.length > 0) {
        return {
            type: MainAction.FOLLOW_USER,
            username: text
        }
    }

    return { type: 'ERROR' }
}

export function updateHeadline(text) {
    if (text.length > 0) {
        return (dispatch) => {
            resource('PUT', 'headline', {headline: text})
            .then(r => {
                dispatch({
                    type: MainAction.UPDATE_HEADLINE,
                    headline: text,
                })
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    return { type: 'ERROR' }
}
