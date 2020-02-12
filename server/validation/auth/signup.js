const Validator = require("validator");
const isEmpty = require("../isEmpty");

module.exports = function validateSignUpInputs(inputData) {
  let errors = {}; // object to store all the errors

  // Using in built function to convert user input to string
  inputData.firstname = !isEmpty(inputData.firstname)
    ? inputData.firstname
    : "";
  inputData.lastname = !isEmpty(inputData.lastname) ? inputData.lastname : "";
  inputData.username = !isEmpty(inputData.username) ? inputData.username : "";
  inputData.email = !isEmpty(inputData.email) ? inputData.email : "";
  inputData.password = !isEmpty(inputData.password) ? inputData.password : "";
  inputData.confirmpassword = !isEmpty(inputData.confirmpassword)
    ? inputData.confirmpassword
    : "";

  // Validation for the empty firstname field
  if (Validator.isEmpty(inputData.firstname)) {
    errors.firstname = "Firstname field is required!";
  }

  // Validation for the empty lastname field
  if (Validator.isEmpty(inputData.lastname)) {
    errors.lastname = "Lastname field is required!";
  }

  // Validation for the username's length
  if (!Validator.isLength(inputData.username, { min: 5, max: 30 })) {
    errors.username = "Username must be 5-30 characters long!";
  }

  // Validation for the empty username field
  if (Validator.isEmpty(inputData.username)) {
    errors.username = "Username field is required!";
  }

  // Validation for the invalid email address
  if (!Validator.isEmail(inputData.email)) {
    errors.email = "Invalid email address!";
  }

  // Validation for the empty email field
  if (Validator.isEmpty(inputData.email)) {
    errors.email = "Email field is required!";
  }

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
