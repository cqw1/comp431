import { resource } from '../../actions.js'

/**
 * Actions associated with authenticating a user or managing profile fields.
 */

export const AuthAction = {
    LOGIN: 'LOGIN', 
    LOGOUT: 'LOGOUT', 
    UPDATE_PROFILE: 'UPDATE_PROFILE', 
    REGISTER: 'REGISTER', 
    GET_HEADLINE: 'GET_HEADLINE', 
    GET_PROFILE: 'GET_PROFILE', 
}

export function getHeadline() {
    var headline = '';

    return (dispatch) => {
        resource('GET', 'headlines/')
        .then(r => {
            headline = r.headlines[0].headline;
            console.log(headline);

            dispatch({
                type: AuthAction.GET_HEADLINE,
                headline,
                success: true
            })
        }).catch((err) => {
            console.log(err);
            /*
            valid = false;
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
            */
        })
    }
}

export function getProfile() {
    var email = '';
    var zipcode = '';
    var dob = '';
    var img = '';

    return (dispatch) => {
        resource('GET', 'email/')
        .then(r => {
            email = r.emailAddress;
            return resource('GET', 'zipcode/');
        }).then(r => {
            zipcode = r.zipcode;
            return resource('GET', 'dob/');
        }).then(r => {
            dob = r.dob; // milliseconds
            return resource('GET', 'avatars/');
        }).then(r => {
            image = r.avatars[0].avatar; 
        }).then(r => {

            dispatch({
                type: AuthAction.GET_PROFILE,
                profile: {
                    username,
                    password,
                    email,
                    zipcode,
                    dob,
                    image,
                },
            })
        }).catch((err) => {
            console.log(err);
            /*
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
            */
        })
    }

}

export function loginUser(username, password) {
    var valid = true;
    var usernameError = '';
    var passwordError = '';
    var unauthorizedError = '';

    var headline = '';
    var email = '';
    var zipcode = '';
    var dob = '';
    var image = '';
    var filteredArticles = [];
    var following = [];

    console.log('loginUser');

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
            dispatch(getHeadline());
            dispatch(getProfile());
            return resource('GET', 'email/');
        }).then(r => {
            email = r.emailAddress;
            return resource('GET', 'zipcode/');
        }).then(r => {
            zipcode = r.zipcode;
            return resource('GET', 'dob/');
        }).then(r => {
            dob = r.dob; // milliseconds
            return resource('GET', 'avatars/');
        }).then(r => {
            image = r.avatars[0].avatar; 
            return resource('GET', 'articles/');
        }).then(r => {
            filteredArticles = r.articles;

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

export const logoutUser = () => {
    return { type: AuthAction.LOGOUT }
}

function validate(profile, registering) {
    var valid = true;

    var usernameError = '';
    var emailError = '';
    var dobError = '';
    var zipcodeError = '';
    var passwordError = '';

    var usernameValid = /^([a-zA-Z]+[a-zA-Z0-9]*)$/.test(profile.username);
    if (!profile.username && registering) {
        usernameError = 'Username is a required field.';
        valid = false;
    } else if (profile.username && !usernameValid) {
        usernameError = 
            `Invalid username format. Can only contain alphanumeric 
            characters, but cannot start with a number.`;
        valid = false;
    } 

    var emailValid = 
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
            var dobValid = true;
            var age = new Date(profile.dob);
            var now = new Date();

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

    var zipcodeValid = /^(\d{5}(-\d{4})?)$/.test(profile.zipcode);
    if (!profile.zipcode && registering) {
        zipcodeError = 'Zipcode is a required field.';
        valid = false;
    } else if (profile.zipcode && !zipcodeValid) {
        zipcodeError = 'Invalid zipcode format.';
        valid = false;
    }


    var passwordValid = profile.password == profile.passwordConfirmation;
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

    var validation = validate(profile, false);

    return {
        type: AuthAction.UPDATE_PROFILE,
        profile: profile,
        errors: validation.errors,
        valid: validation.valid
    }
}

export function register(profile) {

    var validation = validate(profile, true);

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
            }
        }).catch((err) => {
            console.log(err);
        })
    }
}
