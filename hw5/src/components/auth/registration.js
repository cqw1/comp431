import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { register } from './authActions'

/*
 * A registration form that includes:
 *  username
 *  password
 *  password confirmation
 *  email
 *  zipcode
 *  date of birth
 * Also checks input validation for each field.
 */
export const Registration = ({ 
    profile,
    registrationErrors,
    registrationSuccess,
    submit,
}) =>  {

    let usernameInput;
    let emailInput;
    let dobInput;
    let zipcodeInput;
    let passwordInput;
    let passwordConfirmationInput;

    const _submit = () => {
        var profile = {
            username: usernameInput.value,
            email: emailInput.value,
            dob: dobInput.value,
            zipcode: zipcodeInput.value,
            password: passwordInput.value,
            passwordConfirmation: passwordConfirmationInput.value,
        }

        submit(profile);
    }

    return (
        <div className='vertical-center-flex display-table'> 
            <h1 className='text-align-center'> Register </h1>
            <table className='margin-auto'>
                <tbody> 
                    <tr>
                        <td className='input-label'>Username</td>
                        <td>
                            <input 
                                className='form-control' 
                                ref = {node => { usernameInput = node }} 
                                defaultValue={profile.username ? profile.username : ''} 
                                placeholder='Username' /> 
                            <div className='error-msg'>
                                {registrationErrors.usernameError}
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td className='input-label'>Password</td>
                        <td> 
                            <input 
                                className='form-control' 
                                ref = {node => { passwordInput = node }} 
                                type='password'
                                placeholder='Password' /> 
                        </td>
                    </tr>
                    <tr>
                        <td className='input-label'>Password Confirmation</td>
                        <td> 
                            <input 
                                className='form-control' 
                                type='password' 
                                ref = {node => { 
                                    passwordConfirmationInput = node 
                                }} 
                                placeholder='Password Confirmation' /> 
                            <div className='error-msg'>
                                {registrationErrors.passwordError}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='input-label'>
                            Email (example@gmail.com) 
                        </td>
                        <td> 
                            <input 
                                className='form-control' 
                                ref = {node => { emailInput = node }} 
                                defaultValue={profile.email} 
                                placeholder='Email' />
                            <div className='error-msg'>
                                {registrationErrors.emailError}
                            </div>
                        </td> 
                    </tr>
                    <tr>
                        <td className='input-label'>
                            Date of Birth (MM/DD/YYYY)
                        </td>
                        <td> 
                            <input 
                                className='form-control' 
                                type='date' 
                                ref = {node => { dobInput = node }} 
                                defaultValue={profile.dob} />
                            <div className='error-msg'>
                                {registrationErrors.dobError}
                            </div>
                        </td> 
                    </tr>
                    <tr>
                        <td className='input-label'>
                            Zipcode (##### or #####-####)
                        </td>
                        <td> 
                            <input 
                                className='form-control' 
                                ref = {node => { zipcodeInput = node }} 
                                defaultValue={profile.zipcode} 
                                placeholder='Zipcode' />
                            <div className='error-msg'>
                                {registrationErrors.zipcodeError}
                            </div>
                        </td> 
                    </tr>
                </tbody>
            </table>

            <div className='margin-auto padding-bottom-5px'>
                <div className='success-msg'>
                    {registrationSuccess}
                </div>
            </div>

            <div className='text-align-center'>
                <button className='btn btn-primary' onClick={_submit}>
                    Register
                </button>
            </div>
        </div>
    )
}

export default connect(
    (state) => ({ 
        profile: state.authReducer.profile,
        registrationErrors: state.authReducer.registrationErrors,
        registrationSuccess: state.authReducer.registrationSuccess
    }),
    (dispatch, ownProps) => ({ 
        submit: (profile) => dispatch(register(profile))
    })
)(Registration)
