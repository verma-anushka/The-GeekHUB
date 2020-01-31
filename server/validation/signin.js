const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateSignInInputs(inputData) {
  let errors = {}; // object to store all the errors

  inputData.email = !isEmpty(inputData.email) ? inputData.email : "";
  inputData.password = !isEmpty(inputData.password) ? inputData.password : "";

  // Validation for the invalid email address
  if (!Validator.isEmail(inputData.email)) {
    errors.email = "Invalid email address!";
  }

  // Validation for the empty email field
  if (Validator.isEmpty(inputData.email)) {
    errors.email = "Email field is required!";
  }

  // Validation for the empty password field
  if (Validator.isEmpty(inputData.password)) {
    errors.password = "Password field is required!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
