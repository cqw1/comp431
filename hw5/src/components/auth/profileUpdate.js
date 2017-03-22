import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { updateProfile } from './authActions'

/*
 * Form for a user to update their profile fields.
 * All fields on registration are updatable, except for
 * date of birth. There is also an additional option to
 * change their profile picture.
 */
export const ProfileUpdate = ({ 
    profile,
    errors,
    submit,
}) =>  {

    let usernameInput;
    let emailInput;
    let dobInput;
    let zipcodeInput;
    let passwordInput;
    let passwordConfirmationInput;

    const _submit = () => {
        var profile = {};

        if (usernameInput.value) {
            profile['username'] = usernameInput.value;
        }
        if (emailInput.value) {
            profile['email'] = emailInput.value;
        }
        if (zipcodeInput.value) {
            profile['zipcode'] = zipcodeInput.value;
        }
        if (passwordInput.value) {
            profile['password'] = passwordInput.value;
        }
        if (passwordConfirmationInput.value) {
            profile['passwordConfirmation'] = passwordConfirmationInput.value;
        }

        submit(profile);
    }

    return (
        <div> 
            <table className='margin-auto'>
                <tbody> 
                    <tr>
                        <td className='input-label'>Profile Picture</td>
                        <td>
                            <input className='display-table-cell' type='file' />
                        </td>
                        <td>
                            <img src={profile.avatar} />
                        </td>
                    </tr>
                    <tr>
                        <td className='input-label'>Username</td>
                        <td>
                            <input 
                                className='form-control' 
                                ref = {node => { usernameInput = node }} 
                                placeholder='Username' /> 
                            <div className='error-msg'>
                                {errors.usernameError}
                            </div>
                        </td>
                        <td>
                            {profile.username}
                        </td>
                    </tr>

                    <tr>
                        <td className='input-label'>Password</td>
                        <td> 
                            <input 
                                type='password' 
                                className='form-control' 
                                ref = {node => { passwordInput = node }} 
                                placeholder='Password' />
                        </td>
                        <td></td>

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
                                {errors.passwordError}
                            </div>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className='input-label'>
                            Email (example@gmail.com) 
                        </td>
                        <td> 
                            <input 
                                className='form-control' 
                                ref = {node => { emailInput = node }} 
                                placeholder='Email' />
                            <div className='error-msg'>
                                {errors.emailError}
                            </div>
                        </td> 
                        <td>
                            {profile.email}
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
                                placeholder={profile.dob} 
                                disabled={true} />
                            <div className='error-msg'>
                                {errors.dobError}
                            </div>
                        </td> 
                        <td>
                            {profile.dob}
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
                                placeholder='Zipcode' />
                            <div className='error-msg'>
                                {errors.zipcodeError}
                            </div>
                        </td> 
                        <td>
                            {profile.zipcode}
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className='text-align-center'>
                <button className='btn btn-primary' onClick={_submit}>
                    Update
                </button>
            </div>
        </div>
    )
}

export default connect(
    (state) => ({ 
        profile: state.authReducer.profile,
        errors: state.authReducer.errors
    }),
    (dispatch, ownProps) => ({ 
        submit: (profile) => dispatch(updateProfile(profile))
    })
)(ProfileUpdate)

