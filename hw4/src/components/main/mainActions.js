
/*
 * Actions triggered by events from the main page.
 */
export const MainAction = {
    UPDATE_STATUS: 'UPDATE_STATUS',
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

export const updateStatus = (text) => {
    if (text.length > 0) {
        return {
            type: MainAction.UPDATE_STATUS,
            status: text
        }
    }

    return { type: 'ERROR' }
}
