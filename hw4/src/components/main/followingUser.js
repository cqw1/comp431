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
        <div> 
            <button 
                className='float-right btn btn-danger' 
                onClick={() => { unfollow(profile.id) }}> 
                Unfollow 
            </button>
            <AccountInfo 
                displayName={profile.displayName} 
                status={profile.status} 
                image={profile.image} />
        </div>
    )
}

export default connect(
    (state) => ({ }),
    (dispatch) => ({ 
        unfollow: (id) => dispatch(unfollowUser(id))
    })
)(FollowingUser)

