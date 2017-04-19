import { 
    resource, 
    nonJSONResource,
    getPrettyDate, 
    navigateMain, 
} from '../../actions.js'
import { getHeadline, getAvatar, getFollowing } from '../main/mainActions.js'
import { getArticles } from '../article/articleActions.js'

import {AlertType, showAlert} from '../alert/alertActions.js'

// Actions associated with authenticating a user or managing profile fields.

export const AuthAction = {
    LOGIN: 'LOGIN', 
    LOGOUT: 'LOGOUT', 
    UPDATE_PROFILE: 'UPDATE_PROFILE', 
    REGISTER: 'REGISTER', 
    GET_PROFILE: 'GET_PROFILE', 
    CHECK_LOGGED_IN: 'CHECK_LOGGED_IN',
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
            dispatch(showAlert(err.toString()), AlertType.ERROR);
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
        dispatch(showAlert('Logged out.', AlertType.SUCCESS));
    })
    .catch(err => {
        console.log(err);
    })
}

function validateUsername(profile, registering) {
    const usernameValid = /^([a-zA-Z]+[a-zA-Z0-9]*)$/.test(profile.username);
    if (!profile.username && registering) {
        return 'Username is a required field.';
    } else if (profile.username && !usernameValid) {
        return `Invalid username format. Can only contain alphanumeric 
            characters, but cannot start with a number.`;
    } 
    return '';
}

function validateEmail(profile, registering) {
    const emailValid = 
        /^([a-zA-Z0-9]+[a-zA-Z0-9\.\_]*\@[a-zA-Z]+\.[a-zA-Z]+)$/.test(
                profile.email);
    if (!profile.email && registering) {
        return 'Email is a required field.';
    } else if (profile.email && !emailValid) {
        return 'Invalid email format.';
    }
    return '';
}

function validateDob(profile, registering) {
    if (registering) {
        if (!profile.dob) {
            return 'Date of birth is a required field.';
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
                return `Invalid date of birth, must be over 
                    18 years old to register.`;
            }
        }
    }

    return '';
}

function validateZipcode(profile, registering) {
    const zipcodeValid = /^(\d{5}(-\d{4})?)$/.test(profile.zipcode);
    if (!profile.zipcode && registering) {
        return 'Zipcode is a required field.';
    } else if (profile.zipcode && !zipcodeValid) {
        return 'Invalid zipcode format.';
    }

    return '';
}

function validatePassword(profile, registering) {
    const passwordValid = profile.password == profile.passwordConfirmation;
    if (!(profile.password || profile.passwordConfirmation) && registering) {
        return 'Password is a required field.';
    } else if ((profile.password || profile.passwordConfirmation) 
            && !passwordValid) {
        return 'Password values must match.';
    }

    return '';
}

function validate(profile, registering) {
    const usernameError = validateUsername(profile, registering);
    const emailError = validateEmail(profile, registering);
    const dobError = validateDob(profile, registering);
    const zipcodeError = validateZipcode(profile, registering);
    const passwordError = validatePassword(profile, registering);

    const valid = 
        !usernameError && 
        !emailError && 
        !dobError && 
        !zipcodeError && 
        !passwordError;

    return {
        valid,
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

    return (dispatch) => {
        if (validation.valid) {
            resource('PUT', 'email/', {email: profile.email})
            .then(r => {
                profile.email = r.email;
                return resource('PUT', 'zipcode/', {zipcode: profile.zipcode})
            }).then(r => {
                profile.zipcode = r.zipcode;
                return resource(
                        'PUT', 'password/', {password: profile.password})
            }).then(r => {

                dispatch({
                    type: AuthAction.UPDATE_PROFILE,
                    profile,
                    errors: validation.errors,
                    valid: validation.valid
                })

                if (validation.valid) {
                    dispatch(showAlert('Updated profile.', AlertType.SUCCESS));
                }

            }).catch(err => {
                console.log(err);
                dispatch(showAlert(err.toString()), AlertType.ERROR);
            })
        } else {
            dispatch({
                type: AuthAction.UPDATE_PROFILE,
                profile,
                errors: validation.errors,
                valid: validation.valid
            })
        }

    }
}

export function updateAvatar(avatar) {
    return (dispatch) => {
        const fd = new FormData();
        fd.append('image', avatar);

        nonJSONResource('PUT', 'avatar/', fd)
        .then(r => {
            dispatch({
                type: AuthAction.UPDATE_PROFILE,
                profile: {avatar: r.avatar},
                valid: true,
            })

            dispatch(showAlert('Updated profile.', AlertType.SUCCESS));
        })
        .catch((err) => {
            console.log(err);
            dispatch(showAlert(err.toString()), AlertType.ERROR);
        })
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

                dispatch(showAlert('Successfully registered.', 
                            AlertType.SUCCESS));
            }
        }).catch((err) => {
            console.log(err);
            dispatch(showAlert(err.toString()), AlertType.ERROR);
        })
    }
}

export const checkLoggedIn = () => (dispatch) => {
    resource('GET', 'checkLoggedIn').then(r => {
        console.log('checkLoggedIn');
        console.log(r);

        dispatch({
            type: AuthAction.CHECK_LOGGED_IN,
            loggedIn: r.loggedIn
        });
    }).catch((err) => {
        console.log(err);
        //dispatch(showAlert(err.toString()), AlertType.ERROR);
    })
}

