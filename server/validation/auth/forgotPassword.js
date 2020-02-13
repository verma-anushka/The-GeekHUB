const Validator = require("validator");
const isEmpty = require("../isEmpty");

module.exports = function validateForgotPasswordInputs(inputData) {
  let errors = {}; // object to store all the errors

  // Using in built function to convert user input to string
  inputData.email = !isEmpty(inputData.email) ? inputData.email : "";

  // Validation for the invalid email address
  if (!Validator.isEmail(inputData.email)) {
    errors.email = "Invalid email address!";
  }

  // Validation for the empty email field
  if (Validator.isEmpty(inputData.email)) {
    errors.email = "Email field is required!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
