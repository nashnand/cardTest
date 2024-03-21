
// import { userName,password } from './config.js';

//  import 'dotenv/config'
console.log(process.env)

document.addEventListener("DOMContentLoaded", function() {
    console.log("inside dom");
    var loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Call your loginUser() function to handle the login process
        loginUser();
    });
});

async function loginUser() {
    var inputUsername = document.getElementById('username').value.trim();
    var inputPassword = document.getElementById('password').value.trim();

    // Access sensitive information via environment variables
       var username = process.env.USERNAME;
       var password = process.env.PASSWORD;

    // Check if username and password are correct (you would replace this with your actual authentication logic)
    if (inputUsername === username && inputPassword === password) {
    // if (inputUsername === userName && inputPassword === password) {
        // Set a flag in localStorage to indicate that the user is logged in
        localStorage.setItem('isLoggedIn', 'true');

        // Redirect to the main application page
        window.location.href = 'index.html';
        return false; // Prevent form submission
    } else {
        alert('Invalid username or password.');
        return false; // Prevent form submission
    }
}
