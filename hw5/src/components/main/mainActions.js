import { resource } from '../../actions.js'

/*
 * Actions triggered by events from the main page.
 */
export const MainAction = {
    GET_HEADLINE: 'GET_HEADLINE', 
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

export function getHeadline() {
    var headline = '';

    return (dispatch) => {
        resource('GET', 'headlines/')
        .then(r => {
            headline = r.headlines[0].headline;
            console.log(headline);

            dispatch({
                type: MainAction.GET_HEADLINE,
                headline,
                success: true
            })
        }).catch((err) => {
            console.log(err);
            /*
            valid = false;
            unauthorizedError = 'Username or password is invalid.';
            dispatch({
                type: AuthAction.LOGIN, 
                loginErrors: Object.assign({}, {
                    usernameError,
                    passwordError,
                    unauthorizedError,
                }),
                valid
            })
            */
        })
    }
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
