function handleSubmit(event) {
    event.preventDefault();

    const form = document.getElementById('myForm');

    const Fname = document.getElementById('Fname').value.trim();
    const Lname = document.getElementById('Lname').value.trim();
    const Age = parseInt(document.getElementById('Age').value, 10);
    const Email = document.getElementById('Email').value.trim();
    const password = document.getElementById('Password').value;
    const country = document.getElementById('Country').value;

    const responseDiv = document.getElementById('response-message');
    responseDiv.textContent = '';
    const errors = [];

    if (!Fname) {
        errors.push('First name is required.');
    }
    if (!Lname) {
        errors.push('Last name is required.');
    }
    if (!Email) {
        errors.push('Email is required.');
    }
    if (!password) {
        errors.push('Password is required.');
    }
    if (country === 'blank') {
        errors.push('Please select a country.');
    }
    if (!Age || Age < 18) {
        errors.push('You must be at least 18 years old to submit this form.');
    }

    if (errors.length > 0) {
        alert(errors.join('\n'));
        return;
    }

    const formData = {
        fname: Fname,
        lname: Lname,
        age: Age,
        email: Email,
        password: password,
        country: country
    };

    console.log(formData);

    const xhr = new XMLHttpRequest();
    const query = encodeURIComponent(JSON.stringify(formData));

    xhr.open('GET', 'submit.json?data=' + query, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let messageText = 'Form submitted successfully!';

                try {
                    const response = JSON.parse(xhr.responseText);
                    if (response && response.message) {
                        messageText = response.message;
                    }
                } catch (e) {
                }

                responseDiv.textContent = messageText;

                alert(messageText);

                form.reset();

            } else {
                alert('Error submitting form. Please try again.');
            }
        }
    };

    xhr.send(null);
}
