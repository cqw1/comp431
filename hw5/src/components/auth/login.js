import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { loginUser } from './authActions'

/**
 * Form for an existing user to login.
 */
export const Login = ({ 
    loginUser,
    loginErrors
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

            <div className='text-align-center'>
                <button className='btn btn-primary' onClick={_onLoginClick}>
                    Login
                </button>
            </div>
        </div>
    )

}

export default connect(
    (state) => ({ loginErrors: state.loginErrors }),
    (dispatch) => ({ 
        loginUser: (username, password) => dispatch(loginUser(username, password))
    })
)(Login)
