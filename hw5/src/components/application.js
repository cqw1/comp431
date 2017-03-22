import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { navigateProfile, navigateMain, navigateLanding } from '../actions'
import { logoutUser } from './auth/authActions'

import Main from './main/main'
import Profile from './profile/profile'
import Landing from './landing/landing'

/* Constants for navigation through pages. */
export const Pages = {
    LANDING: 'LANDING',
    MAIN: 'MAIN',
    PROFILE: 'PROFILE'
}

/*
 * Root of application. Logic for single page application is here.
 */
export const Application = ({ 
    page,
    logoutUser,
    navigateProfile,
    navigateMain,
    navigateLanding,
}) => {

    const _onLogoutClick = () => {
        logoutUser();
        navigateLanding();
    }

    const _onProfileClick = () => {
        navigateProfile();
    }

    const _onMainClick = () => {
        navigateMain();
    }

    if (page == Pages.MAIN || page == Pages.PROFILE) {
        return(
            <div> 
                <nav className='navbar navbar-default'>
                    <div className='container-fluid'>
                        {page == Pages.MAIN &&
                            <div className='nav navbar-nav'>
                                <a className='navbar-text active-page'> Main </a>
                                <a className='navbar-text' 
                                    onClick={_onProfileClick}> 
                                    Update Profile 
                                </a>
                            </div>
                        }
                        {page == Pages.PROFILE &&
                            <div className='nav navbar-nav'>
                                <a className='navbar-text' onClick={_onMainClick}>
                                    Main 
                                </a>
                                <a className='navbar-text active-page'> 
                                    Update Profile 
                                </a>
                            </div>
                        }
                        <div className='nav navbar-nav navbar-right'>
                            <a className='navbar-text' onClick={_onLogoutClick}> 
                                Logout
                            </a>
                        </div>
                    </div>
                </nav>
                {page == Pages.MAIN &&
                    <Main />
                }
                {page == Pages.PROFILE &&
                    <Profile />
                }
            </div>
        );

    } else { 
        return(
            <div> 
                <Landing />
            </div>
        );
    }
}

export default connect(
    (state) => ({ page: state.navigationReducer.page}),
    (dispatch) => ({ 
        logoutUser: () => dispatch(logoutUser()),
        navigateProfile: () => dispatch(navigateProfile()),
        navigateMain: () => dispatch(navigateMain()),
        navigateLanding: () => dispatch(navigateLanding()),
    })
)(Application)

