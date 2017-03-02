
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import AccountInfo from './accountInfo'
import InputAction from './inputAction'
import FollowingUser from './followingUser'

import { followUser } from './mainActions'

/*
 * List of users that the logged in user is following.
 * Can add and remove users from this list.
 */
export const FollowingList= ({ 
    following
}) =>  {
    let id = 0;

    return (
        <div className='panel panel-default'> 
            <div className='panel-heading'>
                <h3 className='panel-title'>Following</h3>
            </div>

            <div className='panel-body'>
                <InputAction 
                    buttonText='Follow User' 
                    onClickAction={followUser} 
                    placeholder='Username to follow' />
            </div>

            <ul className='list-group'>
                {following.map(f => 
                    <li key={f.id} className='list-group-item'>
                        <FollowingUser key={f.id} profile={f} />
                    </li>
                )}
            </ul>
        </div>
    )
}

export default connect(
    (state) => ({ 
        following: state.following
    }),
    (dispatch) => ({ })
)(FollowingList)

