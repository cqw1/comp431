
/*
 * Generic navigation actions.
 */
export const ActionTypes = {
    NAVIGATE_PROFILE: 'NAVIGATE_PROFILE', 
    NAVIGATE_MAIN: 'NAVIGATE_MAIN', 
}

export const navigateProfile = () => {
    return { type: ActionTypes.NAVIGATE_PROFILE }
}

export const navigateMain = () => {
    return { type: ActionTypes.NAVIGATE_MAIN}
}
