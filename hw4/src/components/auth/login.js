import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { loginUser } from './authActions'

/*
 * Form for an existing user to login.
 */
export const Login = ({ 
    login,
    loginErrors
}) => {
    let username;
    let password;

    const _onLoginClick = () => {
        login(username.value, password.value);
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
                    <tr>
                        <td className='input-label'>Password</td>
                        <td> 
                            <input 
                                className='form-control' 
                                ref = {node => { password = node }} 
                                placeholder='Password' /> 
                            <div className='error-msg'>
                                {loginErrors.passwordError}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

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
        login: (username, password) => dispatch(loginUser(username, password)) 
    })
)(Login)
