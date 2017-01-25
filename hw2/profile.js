
$(function() {

    var displayNameInput = $('#display-name-input');
    var emailInput = $('#email-input');
    var phoneInput = $('#phone-input');
    var zipcodeInput = $('#zipcode-input');
    var passwordInput = $('#password-input');
    var passwordConfirmationInput = $('#password-confirmation-input');

    var displayNameAlert = $('#display-name-alert');
    var emailAlert = $('#email-alert');
    var phoneAlert = $('#phone-alert');
    var zipcodeAlert = $('#zipcode-alert');
    var passwordAlert = $('#password-alert');

    var displayNameChanged = $('#display-name-changed');
    var emailChanged = $('#email-changed');
    var phoneChanged = $('#phone-changed');
    var zipcodeChanged = $('#zipcode-changed');
    var passwordChanged = $('#password-changed');

    function updateDisplayedValues() {
        displayNameField.text(displayNameVal);
        emailField.text(emailVal);
        phoneField.text(phoneVal);
        zipcodeField.text(zipcodeVal);
    }

    function hideAlerts() {
        // Invalid alerts.
        displayNameAlert.hide();
        emailAlert.hide();
        phoneAlert.hide();
        zipcodeAlert.hide();
        passwordAlert.hide();

        // Success alerts.
        displayNameChanged.hide();
        emailChanged.hide();
        phoneChanged.hide();
        zipcodeChanged.hide();
        passwordChanged.hide();
    }


    var displayNameField = $('#display-name-field');
    var emailField = $('#email-field');
    var phoneField = $('#phone-field');
    var zipcodeField = $('#zipcode-field');

    var submitButton = $('#submit-button');

    var displayNameVal = 'johnnydoe';
    var emailVal = 'john.doe@gmail.com';
    var phoneVal = '012-345-6789';
    var zipcodeVal = '77005';
    var passwordVal = 'pass1234';



    function validateInputs() {
        var valid = true;

        var displayNameValid = /^([a-zA-Z]+[a-zA-Z0-9]*)$/.test(displayNameInput.val());
        if (displayNameInput.val() && !displayNameValid) {
            displayNameAlert.show();
            valid = false;
        }

        var emailValid = /^([a-zA-Z0-9]+[a-zA-Z0-9\.\_]*\@[a-zA-Z]+\.[a-zA-Z]+)$/.test(emailInput.val());
        if (emailInput.val() && !emailValid) {
            emailAlert.show();
            valid = false;
        }

        var phoneValid = /^(\d{3}-\d{3}-\d{4})$/.test(phoneInput.val());
        if (phoneInput.val() && !phoneValid) {
            phoneAlert.show();
            valid = false;
        }

        var zipcodeValid = /^(\d{5}(-\d{4})?)$/.test(zipcodeInput.val());
        if (zipcodeInput.val() && !zipcodeValid) {
            zipcodeAlert.show();
            valid = false;
        }

        var passwordValid = passwordInput.val() == passwordConfirmationInput.val();
        if ((passwordInput.val() || passwordConfirmationInput.val()) && !passwordValid) {
            passwordAlert.show();
            valid = false;
        }

        return valid;
    }

    function updateValues() {
        hideAlerts();

        if (validateInputs()) {
            if (displayNameInput.val() && (displayNameInput.val() != displayNameVal)) {
                displayNameChanged.find(".text").text('Display name changed from ' + displayNameVal + ' to ' + displayNameInput.val() + '.');
                displayNameChanged.show();
                displayNameVal = displayNameInput.val();
            }

            if (emailInput.val() && (emailInput.val() != emailVal)) {
                emailChanged.find(".text").text('Email address changed from ' + emailVal+ ' to ' + emailInput.val() + '.');
                emailChanged.show();
                emailVal = emailInput.val();
            }

            if (phoneInput.val() && (phoneInput.val() != phoneVal)) {
                phoneChanged.find(".text").text('Phone number changed from ' + phoneVal + ' to ' + phoneInput.val() + '.');
                phoneChanged.show();
                phoneVal = phoneInput.val();
            }

            if (zipcodeInput.val() && (zipcodeInput.val() != zipcodeVal)) {
                zipcodeChanged.find(".text").text('Zipcode changed from ' + zipcodeVal + ' to ' + zipcodeInput.val() + '.');
                zipcodeChanged.show();
                zipcodeVal = zipcodeInput.val();
            }

            if ((passwordInput.val() || passwordConfirmationInput.val()) && (passwordInput.val() != passwordVal)) {
                passwordChanged.find(".text").text('Password changed to ' + passwordInput.val() + '.');
                passwordChanged.show();
                passwordVal = passwordInput.val();
            }

            // Clear all inputs.
            displayNameInput.val('');
            emailInput.val('');
            phoneInput.val('');
            zipcodeInput.val('');
            passwordInput.val('');
            passwordConfirmationInput.val('');

            // Display default values if any changed.
            updateDisplayedValues();

        }

    }

    submitButton.click(updateValues);

    updateDisplayedValues();
});







