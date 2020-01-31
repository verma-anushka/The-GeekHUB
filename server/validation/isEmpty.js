// FUNCTION TO CHECK WHETHER THE GIVEN INPUT IS EMPTY

const isEmpty = value => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) || // check for empty object
    (typeof value === "string" && value.trim().length === 0) // check for empty string
  );
};

module.exports = isEmpty;
