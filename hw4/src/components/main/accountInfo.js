import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

/*
 * Displays a box of user's account information.
 * Includes profile picture, display name, and status headline.
 */
export const AccountInfo = ({ 
    displayName,
    status,
    image
}) =>  {

    return (
        <div className='media'>
            <div className='media-left'>
                <img className='media-object' src={image} />
            </div>
            <div className='media-body'>
                <h3> 
                    {displayName} 
                    <br />
                    <small>{status}</small>
                </h3>
            </div>
        </div>
    )
}

export default connect(
    (state) => ({ }),
    (dispatch) => ({ })
)(AccountInfo)

