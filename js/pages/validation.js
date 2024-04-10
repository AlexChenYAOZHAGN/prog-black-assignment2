const validation = new JustValidate("#signup");

validation
    .addField("#name", [
        {
            rule: "required",
            errorMessage: "Name is required"
        }
    ])
    .addField("#email", [
        {
            rule: "required",
            errorMessage: "Email is required"
        },
        {
            rule: "email",
            errorMessage: "Email is not valid"
        },
        {
            validator: (value) => {
                return fetch("prog-black-assignment2-main/phps/validate-email.php?email=" + encodeURIComponent(value))
                    .then(function(response) {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(function(json) {
                        // If json.available is true, validation passes
                        // If json.available is false, validation fails
                        return json.available === true;
                    })
                    .catch(function(error) {
                        console.error('There has been a problem with your fetch operation:', error);
                    });
            },
            errorMessage: "Email is already taken"
        }
    ])

    .addField("#password", [
        {
            rule: "required"
        },
        {
            rule: "password"
        }
    ])

    .addField("#password_confirmation",[
        {
            validator: (value, fields) =>{
                return value === fields["#password"].elem.value;
            },
            errorMessage: "Passwords should match"
        }
    ])
    .onSuccess((event) => {
        document.getElementById("signup").submit();
    });





