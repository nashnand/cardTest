/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/login.js":
/*!*********************!*\
  !*** ./js/login.js ***!
  \*********************/
/***/ (() => {

eval("\r\n// import { userName,password } from './config.js';\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", function() {\r\n    console.log(\"inside dom\");\r\n    var loginForm = document.getElementById(\"loginForm\");\r\n    loginForm.addEventListener(\"submit\", function(event) {\r\n        event.preventDefault(); // Prevent default form submission behavior\r\n\r\n        // Call your loginUser() function to handle the login process\r\n        loginUser();\r\n    });\r\n});\r\n\r\nasync function loginUser() {\r\n    var inputUsername = document.getElementById('username').value.trim();\r\n    var inputPassword = document.getElementById('password').value.trim();\r\n\r\n    // Access sensitive information via environment variables\r\n       var username = \"admin\";\r\n       var password = \"Welcome@12\";\r\n\r\n    // Check if username and password are correct (you would replace this with your actual authentication logic)\r\n    if (inputUsername === username && inputPassword === password) {\r\n    // if (inputUsername === userName && inputPassword === password) {\r\n        // Set a flag in localStorage to indicate that the user is logged in\r\n        localStorage.setItem('isLoggedIn', 'true');\r\n\r\n        // Redirect to the main application page\r\n        window.location.href = 'index.html';\r\n        return false; // Prevent form submission\r\n    } else {\r\n        alert('Invalid username or password.');\r\n        return false; // Prevent form submission\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://dps-transactions/./js/login.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./js/login.js"]();
/******/ 	
/******/ })()
;