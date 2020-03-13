import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextFieldGroup = props => {
  const {
    name,
    placeholder,
    value,
    error,
    // moreInfo,
    type,
    onChange,
    disabled
  } = props;
  // console.log(error);

  return (
    <div className="form-group">
      <label className={placeholder}>
        <span>{placeholder}</span>
        <input
          type={type}
          name={name}
          className={classnames({ "is-invalid": error })}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </label>
      {/* {moreInfo && <small className="form-text text-muted">{moreInfo}</small>} */}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  // moreInfo: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
