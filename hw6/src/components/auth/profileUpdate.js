import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { updateProfile, updateAvatar } from './authActions'

/*
 * Form for a user to update their profile fields.
 * All fields on registration are updatable, except for
 * date of birth. There is also an additional option to
 * change their profile picture.
 */
export const ProfileUpdate = ({ 
    profile,
    errors,
    submitProfile,
    submitAvatar,
}) =>  {

    let emailInput;
    let zipcodeInput;
    let passwordInput;
    let passwordConfirmationInput;
    let avatarInput;
    let avatar;

    const _submit = () => {
        const updatedProfile = {};

        if (emailInput.value) {
            updatedProfile['email'] = emailInput.value;
        } else {
            updatedProfile['email'] = profile.email
        }

        if (zipcodeInput.value) {
            updatedProfile['zipcode'] = zipcodeInput.value;
        } else {
            updatedProfile['zipcode'] = profile.zipcode;
        }

        if (passwordInput.value || passwordConfirmationInput.value) {
            updatedProfile['password'] = passwordInput.value;
            updatedProfile['passwordConfirmation'] = passwordConfirmationInput.value;
        } else {
            updatedProfile['password'] = profile.password;
            updatedProfile['passwordConfirmation'] = profile.password;
        }

        submitProfile(updatedProfile);

        if (avatar) {
            submitAvatar(avatar);
        }
    }

    const _handleAvatarChange = (e) => {
        if (e.target.files.length > 0) {
            avatar = e.target.files[0];
        }
    } 

    return (
        <div> 
            <table className='margin-auto'>
                <tbody> 
                    <tr>
                        <td className='input-label'>Profile Picture</td>
                        <td>
                            <input 
                                className='display-table-cell' 
                                type='file' 
                                accept="image/*" 
                                ref= {node => {avatarInput = node}}
                                onChange={(e) => {_handleAvatarChange(e);}} />
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
                                placeholder={profile.username}
                                disabled = {true} /> 
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
                                id='profile-password-input'
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
                                id='profile-password-confirmation-input'
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
                                id='profile-email-input'
                                ref = {node => { emailInput = node }} 
                                placeholder='Email' />
                            <div className='error-msg'>
                                {errors.emailError}
                            </div>
                        </td> 
                        <td id='profile-email-value'>
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
                                id='profile-zipcode-input'
                                ref = {node => { zipcodeInput = node }} 
                                placeholder='Zipcode' />
                            <div className='error-msg'>
                                {errors.zipcodeError}
                            </div>
                        </td> 
                        <td id='profile-zipcode-value'>
                            {profile.zipcode}
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className='text-align-center'>
                <button 
                    id='update-profile-btn' 
                    className='btn btn-primary' 
                    onClick={_submit}>
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
        submitProfile: (profile) => dispatch(updateProfile(profile)),
        submitAvatar: (avatar) => dispatch(updateAvatar(avatar))
    })
)(ProfileUpdate)

