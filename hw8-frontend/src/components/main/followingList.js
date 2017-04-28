
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import AccountInfo from './accountInfo'
import FollowingUser from './followingUser'

import { followUser } from './mainActions'

/*
 * List of users that the logged in user is following.
 * Can add and remove users from this list.
 */
export const FollowingList= ({ 
    following,
    followUser
}) =>  {
    let input;

    const _followUser = () => {
        followUser(input.value);
        input.value = '';
    }
    return (
        <div className='panel panel-default' id='following-list'> 
            <div className='panel-heading'>
                <h3 className='panel-title'>Following</h3>
            </div>

            <div className='panel-body'>
                <div className='display-table'> 
                    <input 
                        className='form-control display-table-cell' 
                        id='following-input'
                        ref = {node => { input = node }} 
                        placeholder='Username' />
                    <span 
                        className='display-table-cell padding-left-5px'>
                        <button 
                            className='btn btn-default' 
                            id='following-btn'
                            onClick={_followUser}>
                            Follow User
                        </button>
                    </span>
                </div>
            </div>

            <ul className='list-group'>
                {following.map(f => 
                    <li key={f.username} className='list-group-item'>
                        <FollowingUser key={f.username} profile={f} />
                    </li>
                )}
            </ul>
        </div>
    )
}

export default connect(
    (state) => ({ 
        following: state.mainReducer.following
    }),
    (dispatch) => ({ 
        followUser: (username) => dispatch(followUser(username))
    })
)(FollowingList)

