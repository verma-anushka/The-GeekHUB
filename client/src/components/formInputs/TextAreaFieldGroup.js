import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextAreaFieldGroup = props => {
  const { name, placeholder, value, error, moreInfo, onChange } = props;
  return (
    <div className="form-group">
      <textarea
        placeholder={placeholder}
        name={name}
        className={classnames({ "is-invalid": error })}
        value={value}
        onChange={onChange}
      />
      {moreInfo && <small className="form-text text-muted">{moreInfo}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  moreInfo: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextAreaFieldGroup;
