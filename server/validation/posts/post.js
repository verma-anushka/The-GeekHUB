const Validator = require("validator");
const isEmpty = require("../isEmpty");

module.exports = function validatePostInput(inputData) {
  let errors = {}; // object to store all the errors

  // Using in built function to convert user input to string
  inputData.content = !isEmpty(inputData.content) ? inputData.content : "";

  // Validation for the length of the post's content
  if (!Validator.isLength(inputData.content, { min: 25, max: 500 })) {
    errors.content = "Description must be between 25 and 500 characters";
  }

  // Validation for the empty content field
  if (Validator.isEmpty(inputData.content)) {
    errors.content = "Content field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
