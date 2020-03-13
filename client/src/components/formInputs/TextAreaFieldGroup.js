import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextAreaFieldGroup = props => {
  const { name, placeholder, value, error, onChange } = props;
  return (
    <div className="form-group" style={{ marginBottom: "0" }}>
      <textarea
        rows="3"
        cols="80"
        style={{ border: "none", outline: "none", background: "transparent" }}
        placeholder={placeholder}
        name={name}
        className={classnames({ "is-invalid": error })}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
      {/* {moreInfo && <small className="form-text text-muted">{moreInfo}</small>} */}
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  // moreInfo: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextAreaFieldGroup;
