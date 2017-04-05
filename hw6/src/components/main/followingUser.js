import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { unfollowUser } from './mainActions'

import AccountInfo from './accountInfo'

/*
 * Displays information about a user that the logged in user
 * is following. Includes the account information (see accountInfo.js)
 * as well as an unfollow button to remove the user from the following list.
 */
export const FollowingUser = ({ 
    profile,
    unfollow
}) =>  {
    return (
        <div className='following-user'> 
            <span
                className='float-right glyphicon glyphicon-remove' 
                onClick={() => { unfollow(profile.username) }}> 
            </span>
            <AccountInfo 
                username={profile.username} 
                headline={profile.headline} 
                avatar={profile.avatar} />
        </div>
    )
}

export default connect(
    (state) => ({ }),
    (dispatch) => ({ 
        unfollow: (username) => dispatch(unfollowUser(username))
    })
)(FollowingUser)

