import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ProfileUpdate from '../auth/profileUpdate'

/*
 * Page displays profile information and allows user to update information.
 */
export const Profile = ({
    profile
}) => (
    <div> 
        <ProfileUpdate />
    </div>
);

export default connect(
    (state) => ({ 
        profile: state.currentProfile
    }),
    (dispatch) => ({ })
)(Profile)

