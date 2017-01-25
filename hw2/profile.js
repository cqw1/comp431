
        function onSubmit() {
            document.getElementById('timestamp-input').value = Date.now();

            // Validate passwords match
            if (document.getElementById('password-input').value != document.getElementById('password-confirmation-input').value) {
                alert("Passwords do not match");
                return false;
            }

            var age = new Date(document.getElementById('date-of-birth-input').value);
            var now = new Date();

            if ((now.getUTCFullYear() - age.getUTCFullYear()) < 18) {
                alert("Must be 18 years or older to continue.");
                return false;
            } else if (now.getUTCFullYear() - age.getUTCFullYear() == 18) {

                if (now.getUTCMonth() < age.getUTCMonth()) {

                    alert("Must be 18 years or older to continue.");
                    return false;
                } else if (now.getUTCMonth() == age.getUTCMonth()) {

                    if (now.getUTCDate() < age.getUTCDate()) {
                        alert("Must be 18 years or older to continue.");
                        return false;
                    }

                }

            }

            return true;
        }