
/*
 * Actions associated with authenticating a user or managing profile fields.
 */

export const AuthAction = {
    LOGIN: 'LOGIN', 
    LOGOUT: 'LOGOUT', 
    UPDATE_PROFILE: 'UPDATE_PROFILE', 
    REGISTER: 'REGISTER', 
}

export const loginUser = (username, password) => {
    var valid = true;
    var usernameError = '';
    var passwordError = '';

    if (username.length <= 0) {
        usernameError = 'Username is required.';
        valid = false;
    }

    if (password.length <= 0) {
        passwordError = 'Password is required.';
        valid = false;
    }

    return {
        type: AuthAction.LOGIN,
        username,
        password,
        loginErrors: Object.assign({}, {
            usernameError,
            passwordError, 
        }),
        valid
    }
}

export const logoutUser = () => {
    return { type: AuthAction.LOGOUT }
}

function validate(profile, registering) {
    var valid = true;

    var usernameError = '';
    var emailError = '';
    var phoneError = '';
    var dateOfBirthError = '';
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

    var phoneValid = /^(\d{3}-\d{3}-\d{4})$/.test(profile.phone);
    if (!profile.phone && registering) {
        phoneError = 'Phone number is a required field.';
        valid = false;
    } else if (profile.phone && !phoneValid) {
        phoneError = 'Invalid phone number format.';
        valid = false;
    }

    if (registering) {
        if (!profile.dateOfBirth) {
            dateOfBirthError = 'Date of birth is a required field.';
            valid = false;
        } else {
            var dateOfBirthValid = true;
            var age = new Date(profile.dateOfBirth);
            var now = new Date();

            if ((now.getUTCFullYear() - age.getUTCFullYear()) < 18) {
                dateOfBirthValid = false;
            } else if (now.getUTCFullYear() - age.getUTCFullYear() == 18) {
                if (now.getUTCMonth() < age.getUTCMonth()) {
                    dateOfBirthValid = false;
                } else if (now.getUTCMonth() == age.getUTCMonth()) {
                    if (now.getUTCDate() < age.getUTCDate()) {
                        dateOfBirthValid = false;
                    }
                }
            }

            if (profile.dateOfBirth && !dateOfBirthValid) {
                dateOfBirthError = 
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
            dateOfBirthError,
            emailError,
            phoneError,
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

export const register = (profile) => {

    var validation = validate(profile, true);

    if (validation.valid && !profile.displayName) {
        profile.displayName = profile.username;
    }

    return {
        type: AuthAction.REGISTER,
        profile: profile,
        registrationErrors: validation.errors,
        valid: validation.valid
    }
}
