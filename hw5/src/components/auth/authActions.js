import { resource, getPrettyDate, navigateMain } from '../../actions.js'
import { getHeadline, getAvatar, getFollowing } from '../main/mainActions.js'
import { getArticles } from '../article/articleActions.js'

import {showSuccessAlert, showErrorAlert} from '../alert/alertActions.js'

/**
 * Actions associated with authenticating a user or managing profile fields.
 */

export const AuthAction = {
    LOGIN: 'LOGIN', 
    LOGOUT: 'LOGOUT', 
    UPDATE_PROFILE: 'UPDATE_PROFILE', 
    REGISTER: 'REGISTER', 
    GET_PROFILE: 'GET_PROFILE', 
}

export function getProfile() {
    let email = '';
    let zipcode = '';
    let dob = '';
    let avatar = '';

    return (dispatch) => {
        resource('GET', 'email/')
        .then(r => {
            email = r.email;
            return resource('GET', 'zipcode/');
        }).then(r => {
            zipcode = r.zipcode;
            return resource('GET', 'dob/');
        }).then(r => {
            dob = getPrettyDate(r.dob)

            return resource('GET', 'avatars/');
        }).then(r => {
            avatar = r.avatars[0].avatar; 

            dispatch({
                type: AuthAction.GET_PROFILE,
                profile: {
                    email,
                    zipcode,
                    dob,
                    avatar,
                },
            })
        }).catch((err) => {
            console.log(err);
            dispatch(showErrorAlert(err.toString()));
        })
    }

}

export function loginUser(username, password) {
    let valid = true;
    let usernameError = '';
    let passwordError = '';
    let unauthorizedError = '';

    let filteredArticles = [];
    let following = [];

    if (username.length <= 0) {
        usernameError = 'Username is required.';
        valid = false;
    }

    if (password.length <= 0) {
        passwordError = 'Password is required.';
        valid = false;
    }

    if (!valid) {
        return {
            type: AuthAction.LOGIN,
            loginErrors: Object.assign({}, {
                usernameError,
                passwordError,
            }),
            valid
        }
    }


    return (dispatch) => {
        resource('POST', 'login', { username, password })
        .then(r => {
            dispatch({
                type: AuthAction.LOGIN,
                profile: {
                    username,
                    password,
                },
                filteredArticles,
                following,
                valid
            })

            dispatch(navigateMain())
        }).catch((err) => {
            valid = false;
            console.log(err);
            unauthorizedError = 'Username or password is invalid.';
            dispatch({
                type: AuthAction.LOGIN, 
                loginErrors: Object.assign({}, {
                    usernameError,
                    passwordError,
                    unauthorizedError,
                }),
                valid
            })
        })
    }
}

export const logoutUser = () => (dispatch) => {
    resource('PUT', 'logout/')
    .then(r => {
        dispatch({ type: AuthAction.LOGOUT });
    })
    .catch(err => {
        console.log(err);
    })
}

function validate(profile, registering) {
    let valid = true;

    let usernameError = '';
    let emailError = '';
    let dobError = '';
    let zipcodeError = '';
    let passwordError = '';

    const usernameValid = /^([a-zA-Z]+[a-zA-Z0-9]*)$/.test(profile.username);
    if (!profile.username && registering) {
        usernameError = 'Username is a required field.';
        valid = false;
    } else if (profile.username && !usernameValid) {
        usernameError = 
            `Invalid username format. Can only contain alphanumeric 
            characters, but cannot start with a number.`;
        valid = false;
    } 

    const emailValid = 
        /^([a-zA-Z0-9]+[a-zA-Z0-9\.\_]*\@[a-zA-Z]+\.[a-zA-Z]+)$/.test(
                profile.email);
    if (!profile.email && registering) {
        emailError = 'Email is a required field.';
        valid = false;
    } else if (profile.email && !emailValid) {
        emailError = 'Invalid email format.';
        valid = false;
    }


    if (registering) {
        if (!profile.dob) {
            dobError = 'Date of birth is a required field.';
            valid = false;
        } else {
            let dobValid = true;
            const age = new Date(profile.dob);
            const now = new Date();

            if ((now.getUTCFullYear() - age.getUTCFullYear()) < 18) {
                dobValid = false;
            } else if (now.getUTCFullYear() - age.getUTCFullYear() == 18) {
                if (now.getUTCMonth() < age.getUTCMonth()) {
                    dobValid = false;
                } else if (now.getUTCMonth() == age.getUTCMonth()) {
                    if (now.getUTCDate() < age.getUTCDate()) {
                        dobValid = false;
                    }
                }
            }

            if (profile.dob && !dobValid) {
                dobError = 
                    `Invalid date of birth, must be over 
                    18 years old to register.`;
                valid = false;
            }
        }
    }

    const zipcodeValid = /^(\d{5}(-\d{4})?)$/.test(profile.zipcode);
    if (!profile.zipcode && registering) {
        zipcodeError = 'Zipcode is a required field.';
        valid = false;
    } else if (profile.zipcode && !zipcodeValid) {
        zipcodeError = 'Invalid zipcode format.';
        valid = false;
    }


    const passwordValid = profile.password == profile.passwordConfirmation;
    if (!(profile.password || profile.passwordConfirmation) && registering) {
        passwordError = 'Password is a required field.';
        valid = false;
    } else if ((profile.password || profile.passwordConfirmation) && !passwordValid) {
        passwordError = 'Password values must match.';
        valid = false;
    }

    return {
        valid: valid,
        errors: Object.assign({}, {
            usernameError,
            passwordError,
            dobError,
            emailError,
            zipcodeError
        })
    }
}

export const updateProfile = (profile) => {

    const validation = validate(profile, false);

    if (validation.valid) {
        if (profile.email) {
            resource('PUT', 'email/', {email: profile.email})
            .catch((err) => {
                console.log(err);
                dispatch(showErrorAlert(err.toString()));
            })
        }

        if (profile.zipcode) {
            resource('PUT', 'zipcode/', {zipcode: profile.zipcode})
            .catch((err) => {
                console.log(err);
                dispatch(showErrorAlert(err.toString()));
            })
        }

        if (profile.password) {
            resource('PUT', 'password/', {password: profile.password})
            .catch((err) => {
                console.log(err);
                dispatch(showErrorAlert(err.toString()));
            })
        }
    }

    return (dispatch) => {
        dispatch({
            type: AuthAction.UPDATE_PROFILE,
            profile: profile,
            errors: validation.errors,
            valid: validation.valid
        })

        if (validation.valid) {
            dispatch(showSuccessAlert('Updated profile.'))
        }
    }
}

export function register(profile) {

    const validation = validate(profile, true);

    if (!validation.valid) {
        return {
            type: AuthAction.REGISTER,
            registrationErrors: validation.errors,
            valid: validation.valid
        }
    }

    return (dispatch) => {
        resource('POST', 'register', profile)
        .then(r => {
            if (r.result == 'success') {
                dispatch({
                    type: AuthAction.REGISTER,
                    profile,
                    valid: validation.valid
                })

                dispatch(showSuccessAlert('Successfully registered.'))
            }
        }).catch((err) => {
            console.log(err);
            dispatch(showErrorAlert(err.toString()));
        })
    }
}
