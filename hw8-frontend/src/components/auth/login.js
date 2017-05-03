import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { loginUser } from './authActions'
import {url} from '../../actions'

// Form for an existing user to login.
export const Login = ({ 
    loginUser,
    loginErrors,
}) => {
    let username;
    let password;

    const _onLoginClick = () => {
        loginUser(username.value, password.value);
    }

    return (
        <div className='vertical-center-flex display-table'> 
            <h1 className='text-align-center'> Login </h1>
            <table className='margin-auto'>
                <tbody> 
                    <tr>
                        <td className='input-label'>Username</td>
                        <td> 
                            <input 
                                className='form-control' 
                                id='username-input'
                                ref = {node => { username = node }} 
                                placeholder='Username' /> 
                            <div className='error-msg'>
                                {loginErrors.usernameError}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <table className='margin-auto'>
                <tbody> 
                    <tr>
                        <td className='input-label'>Password</td>
                        <td> 
                            <input 
                                className='form-control' 
                                id='password-input'
                                ref = {node => { password = node }} 
                                type='password'
                                placeholder='Password' /> 
                            <div className='error-msg'>
                                {loginErrors.passwordError}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className='margin-auto padding-bottom-5px'>
                <div className='error-msg'>
                    {loginErrors.unauthorizedError}
                </div>
            </div>

            <div className='text-align-center padding-bottom-5px'>
                <button 
                    className='btn btn-primary' 
                    id='login-btn' 
                    onClick={_onLoginClick}>
                    Login
                </button>
            </div>

            <div className='text-align-center'>
                <a
                    href={url + '/auth/google'}
                    className='btn btn-default'
                    id='google-login-btn'>
                    
                    <img 
                        className='google-img' 
                        width='20' 
                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg">
                    </img>

                    &nbsp;
                    Login with Google

                </a>
            </div>
        </div>
    )

}

export default connect(
    (state) => ({ 
        loginErrors: state.authReducer.loginErrors, 
    }),
    (dispatch) => ({ 
        loginUser: 
            (username, password) => dispatch(loginUser(username, password)),
    })
)(Login)
