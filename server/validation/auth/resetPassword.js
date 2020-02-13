const Validator = require("validator");
const isEmpty = require("../isEmpty");

module.exports = function validateResetPasswordInputs(inputData) {
  let errors = {}; // object to store all the errors

  // Using in built function to convert user input to string
  inputData.password = !isEmpty(inputData.password) ? inputData.password : "";

  // Validation for password's length
  if (!Validator.isLength(inputData.password, { min: 8, max: 30 })) {
    errors.password = "Password must be at least 8 characters long!";
  }

  // Validation for the empty password field
  if (Validator.isEmpty(inputData.password)) {
    errors.password = "Password field is required!";
  }

  // Validation for the empty confirm password field
  if (Validator.isEmpty(inputData.confirmpassword)) {
    errors.confirmpassword = "Confirm password field is required!";
  }

  //   Validation for password match
  if (!Validator.equals(inputData.password, inputData.confirmpassword)) {
    errors.confirmpassword = "Passwords do not match!";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
