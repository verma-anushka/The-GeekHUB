import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const InputGroup = props => {
  const { name, placeholder, value, error, icon, type, onChange } = props;
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend" style={{ width: "100%" }}>
        <div
          className="input-group-text"
          style={{
            width: "100%",
            backgroundColor: "transparent",
            border: "none"
          }}
        >
          <i className={icon} />
          <input
            type={type}
            placeholder={placeholder}
            name={name}
            className={classnames({ "is-invalid": error })}
            value={value}
            onChange={onChange}
          />
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
      </div>
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
  icon: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;
