const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Read form data submitted using POST
app.use(express.urlencoded({ extended: true }));

// Open the registration form
app.get('/user_reg', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'user_reg.html'));
});

// Receive form data and display it on the next page
app.post('/user_reg_submit', (req, res) => {
    const {
        firstName,
        middleName,
        lastName,
        gender,
        dob,
        email,
        password,
        securityQuestion,
        securityAnswer,
        hobbies
    } = req.body;

    // Do not display the actual password on the page.
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Registration Details</title>
            <meta charset="UTF-8">
        </head>
        <body>
            <h1>User Registration Details</h1>
            <p><strong>First Name:</strong> ${escapeHTML(firstName)}</p>
            <p><strong>Middle Name:</strong> ${escapeHTML(middleName || 'Not provided')}</p>
            <p><strong>Last Name:</strong> ${escapeHTML(lastName)}</p>
            <p><strong>Gender:</strong> ${escapeHTML(gender)}</p>
            <p><strong>Date of Birth:</strong> ${escapeHTML(dob)}</p>
            <p><strong>Email:</strong> ${escapeHTML(email)}</p>
            <p><strong>Password:</strong> Not displayed for security</p>
            <p><strong>Security Question:</strong> ${escapeHTML(securityQuestion)}</p>
            <p><strong>Security Answer:</strong> ${escapeHTML(securityAnswer)}</p>
            <p><strong>Hobbies:</strong> ${escapeHTML(hobbies)}</p>
            <br>
            <a href="/user_reg">Back to Registration Form</a>
        </body>
        </html>
    `);
});

// Convert user input to safe HTML text
function escapeHTML(value = '') {
    return String(value).replace(/[&<>"']/g, (character) => {
        const entities = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return entities[character];
    });
}

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
