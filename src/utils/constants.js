require('dotenv').config({ debug: process.env.DEBUG });

module.exports = { 
  NEWS_API_KEY: process.env.REACT_APP_NEWS_API_KEY,
  RESPONSE_MSG: {
    serverError: 'An error occurred on the server.',
    accountExists: 'This email address is already associated with an account.',
    registrationValidationError: 'Your email or username is invalid.',
    connectionFailed: 'Could not connect to server. Try again later.',
    incorrectLogin: 'Your email or password was incorrect. Please try again.'
  },
};
