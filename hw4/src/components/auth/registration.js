import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { register } from './authActions'

/*
 * A registration form that includes:
 *  username
 *  display name
 *  password
 *  password confirmation
 *  phone
 *  email
 *  zipcode
 *  date of birth
 * Also checks input validation for each field.
 */
export const Registration = ({ 
    profile,
    registrationErrors,
    submit,
}) =>  {

    let usernameInput;
    let displayNameInput;
    let phoneInput;
    let emailInput;
    let dateOfBirthInput;
    let zipcodeInput;
    let passwordInput;
    let passwordConfirmationInput;

    const _submit = () => {
        var profile = {
            username: usernameInput.value,
            displayName: displayNameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            dateOfBirth: dateOfBirthInput.value,
            zipcode: zipcodeInput.value,
            password: passwordInput.value,
            passwordConfirmation: passwordConfirmationInput.value,
        }

        submit(profile);
    }

    return (
        <div> 
            <h1 className='text-align-center'> Register </h1>
            <table className='margin-auto'>
                <tbody> 
                    <tr>
                        <td className='input-label'>Username</td>
                        <td>
                            <input 
                                className='form-control' 
                                ref = {node => { usernameInput = node }} 
                                defaultValue={profile.username} 
                                placeholder='Username' /> 
                            <div className='error-msg'>
                                {registrationErrors.usernameError}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='input-label'>
                            Display Name (optional)
                        </td>
                        <td> 
                            <input 
                                className='form-control' 
                                ref = {node => { displayNameInput = node }} 
                                defaultValue={profile.displayName} 
                                placeholder='Display Name' />
                            <div className='error-msg'>
                                {registrationErrors.displayNameError}
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td className='input-label'>Password</td>
                        <td> 
                            <input 
                                className='form-control' 
                                ref = {node => { passwordInput = node }} 
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
                            Phone Number (###-###-####)
                        </td>
                        <td> 
                            <input 
                                className='form-control' 
                                ref = {node => { phoneInput = node }} 
                                defaultValue={profile.phone} 
                                placeholder='Phone Number' />
                            <div className='error-msg'>
                                {registrationErrors.phoneError}
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
                                ref = {node => { dateOfBirthInput = node }} 
                                defaultValue={profile.dateOfBirth} />
                            <div className='error-msg'>
                                {registrationErrors.dateOfBirthError}
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
        profile: state.currentProfile,
        registrationErrors: state.registrationErrors
    }),
    (dispatch, ownProps) => ({ 
        submit: (profile) => dispatch(register(profile))
    })
)(Registration)
