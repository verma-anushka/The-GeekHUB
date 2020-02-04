const Validator = require("validator");
const isEmpty = require("../isEmpty");

module.exports = function validateExperienceInputs(inputData) {
  let errors = {}; // object to store all the errors

  inputData.title = !isEmpty(inputData.title) ? inputData.title : "";
  inputData.organization = !isEmpty(inputData.organization)
    ? inputData.organization
    : "";
  inputData.from = !isEmpty(inputData.from) ? inputData.from : "";

  // Validation for the empty title field
  if (Validator.isEmpty(inputData.title)) {
    errors.title = "Title field is required!";
  }
  // Validation for the empty organization field
  if (Validator.isEmpty(inputData.organization)) {
    errors.organization = "Organization field is required!";
  }

  // Validation for the empty from field
  if (Validator.isEmpty(inputData.from)) {
    errors.from = "Start date field is required!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
