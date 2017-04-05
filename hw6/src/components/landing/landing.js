import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Login from '../auth/login'
import Registration from '../auth/registration'

/*
 * Landing page the user sees upon first arriving on the site.
 * Includes a login form for existing users and a registration
 * form for new users.
 */
export const Landing = ({ }) => (
    <div id='landing-page'>
        <div className='row'> 
            <div className='col-md-6'>
                <Login />
            </div>
            <div className='col-md-6'>
                <Registration />
            </div>
        </div>
    </div>
);

export default connect(
    (state) => ({ }),
    (dispatch) => ({ })
)(Landing)

