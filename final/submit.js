function handleSubmit(event) {
    event.preventDefault();

    const form = document.getElementById('myForm');

    const Fname = document.getElementById('Fname').value.trim();
    const Lname = document.getElementById('Lname').value.trim();
    const Age = parseInt(document.getElementById('Age').value, 10);
    const Weight = parseInt(document.getElementById('Weight').value, 10);
    const Language = document.getElementById('Language').value;

    const responseDiv = document.getElementById('response-message');
    const errors = [];

    if (!Fname) {
        errors.push('First name is required.');
    }
    if (!Lname) {
        errors.push('Last name is required.');
    }
    if (!Weight || Weight <= 0) {
        errors.push('Please enter a valid Weight.');
    }

    if (!Language) {
        errors.push('Language is required.');
    }

    if (Language === 'blank') {
        errors.push('Please select a Language.');
    }

    if (!Age || Age < 12) {
        errors.push('You must be at least 12 years old.');
    }

    if (errors.length > 0) {
        alert(errors.join('\n'));
        return;
    }

    const formData = {
        fname: Fname,
        lname: Lname,
        age: Age,
        weight: Weight,
        language: Language
    };

    console.log(formData);

    const xhr = new XMLHttpRequest();
    const query = encodeURIComponent(JSON.stringify(formData));

    xhr.open('GET', 'submit.json', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

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

                alert(messageText);

                form.reset();

            } else {
                alert('Error submitting form. Please try again.');
            }
        }
    };

    xhr.send(JSON.stringify(formData));

    form.innerHTML = '<p> Form submitted. Thank you!</p>';
}
