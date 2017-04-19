import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { 
    navigateProfile, 
    navigateMain, 
    navigateLanding, 
} from '../actions'
import { logoutUser, checkLoggedIn } from './auth/authActions'

import Main from './main/main'
import Profile from './profile/profile'
import Landing from './landing/landing'
import Alert from './alert/alert'

// Constants for navigation through pages.
export const Pages = {
    LANDING: 'LANDING',
    MAIN: 'MAIN',
    PROFILE: 'PROFILE'
}

// Root of application. Logic for single page application is here.
export const Application = ({ 
    page,
    isLoggedIn,
    logoutUser,
    navigateProfile,
    navigateMain,
    navigateLanding,
    checkLoggedIn,
}) => {

    checkLoggedIn();
    if (isLoggedIn && page == Pages.LANDING) {
        page = Pages.MAIN;
    }


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
                                <a className='navbar-text active-page main-btn'> 
                                    Main
                                </a>
                                <a 
                                    className='navbar-text' 
                                    id='profile-btn'
                                    onClick={_onProfileClick}> 
                                    Update Profile 
                                </a>
                            </div>
                        }
                        {page == Pages.PROFILE &&
                            <div className='nav navbar-nav'>
                                <a 
                                    className='navbar-text main-btn' 
                                    onClick={_onMainClick}>
                                    Main 
                                </a>
                                <a 
                                    className='navbar-text active-page' 
                                    id='profile-btn'> 
                                    Update Profile 
                                </a>
                            </div>
                        }
                        <div className='nav navbar-nav navbar-right'>
                            <a 
                                className='navbar-text' 
                                id='logout-btn'
                                onClick={_onLogoutClick}> 
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

                <Alert />
            </div>
        );

    } else { 
        return(
            <div> 
                <Landing />
                <Alert />
            </div>
        );
    }
}

export default connect(
    (state) => ({ 
        page: state.navigationReducer.page,
        isLoggedIn: state.authReducer.isLoggedIn,
    }),
    (dispatch) => ({ 
        checkLoggedIn: () => dispatch(checkLoggedIn()),
        logoutUser: () => dispatch(logoutUser()),
        navigateProfile: () => dispatch(navigateProfile()),
        navigateMain: () => dispatch(navigateMain()),
        navigateLanding: () => dispatch(navigateLanding()),
    })
)(Application)

