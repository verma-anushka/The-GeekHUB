const Validator = require("validator");
const isEmpty = require("../isEmpty");

module.exports = function validateExperienceInputs(inputData) {
  let errors = {}; // object to store all the errors

  inputData.name = !isEmpty(inputData.name) ? inputData.name : "";
  inputData.degree = !isEmpty(inputData.degree) ? inputData.degree : "";
  inputData.fieldOfStudy = !isEmpty(inputData.fieldOfStudy)
    ? inputData.fieldOfStudy
    : "";
  inputData.from = !isEmpty(inputData.from) ? inputData.from : "";

  // Validation for the empty name field
  if (Validator.isEmpty(inputData.name)) {
    errors.name = "Name field is required!";
  }
  // Validation for the empty degree field
  if (Validator.isEmpty(inputData.degree)) {
    errors.degree = "Degree field is required!";
  }
  // Validation for the empty fieldOfStudy field
  if (Validator.isEmpty(inputData.fieldOfStudy)) {
    errors.fieldOfStudy = "Field Of Study field is required!";
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
