const Validator = require("validator");
const isEmpty = require("../isEmpty");

module.exports = function validateProfileInputs(inputData) {
  let errors = {}; // object to store all the errors

  // Using in built function to convert user input to string
  inputData.handle = !isEmpty(inputData.handle) ? inputData.handle : "";
  inputData.status = !isEmpty(inputData.status) ? inputData.status : "";
  inputData.skills = !isEmpty(inputData.skills) ? inputData.skills : "";

  // Validation for userhandle's length
  if (!Validator.isLength(inputData.handle, { min: 4, max: 40 })) {
    errors.handle = "User handle must be 4-40 characters long!";
  }

  // Validation for the empty userhandle field
  if (Validator.isEmpty(inputData.handle)) {
    errors.handle = "User handle field is required!";
  }

  // Validation for the empty status field
  if (Validator.isEmpty(inputData.status)) {
    errors.status = "Status field is required!";
  }

  // Validation for the empty skills field
  if (Validator.isEmpty(inputData.skills)) {
    errors.skills = "Skills field is required!";
  }

  //   VALIDATIONS FOR WEBSITE URLS
  // Validation for an invalid website link address
  if (!isEmpty(inputData.websiteLink)) {
    if (!Validator.isURL(inputData.websiteLink)) {
      errors.websiteLink = "Please enter a valid website URL.";
    }
  }

  // Validation for an invalid linkedin account link
  if (!isEmpty(inputData.linkedin)) {
    if (!Validator.isURL(inputData.linkedin)) {
      errors.linkedin = "Please enter a valid website URL.";
    }
  }

  // Validation for an invalid medium account link
  if (!isEmpty(inputData.medium)) {
    if (!Validator.isURL(inputData.medium)) {
      errors.medium = "Please enter a valid website URL.";
    }
  }

  // Validation for an invalid behance account link
  if (!isEmpty(inputData.behance)) {
    if (!Validator.isURL(inputData.behance)) {
      errors.behance = "Please enter a valid website URL.";
    }
  }

  // Validation for an invalid github account link
  if (!isEmpty(inputData.github)) {
    if (!Validator.isURL(inputData.github)) {
      errors.github = "Please enter a valid website URL.";
    }
  }

  // Validation for an invalid youtube channel link
  if (!isEmpty(inputData.youtube)) {
    if (!Validator.isURL(inputData.youtube)) {
      errors.youtube = "Please enter a valid website URL.";
    }
  }

  // Validation for an invalid twitter account link
  if (!isEmpty(inputData.twitter)) {
    if (!Validator.isURL(inputData.twitter)) {
      errors.twitter = "Please enter a valid website URL.";
    }
  }

  // Validation for an invalid facebook link
  if (!isEmpty(inputData.facebook)) {
    if (!Validator.isURL(inputData.facebook)) {
      errors.facebook = "Please enter a valid website URL.";
    }
  }

  // Validation for an invalid instagram account link
  if (!isEmpty(inputData.instagram)) {
    if (!Validator.isURL(inputData.instagram)) {
      errors.instagram = "Please enter a valid website URL.";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
