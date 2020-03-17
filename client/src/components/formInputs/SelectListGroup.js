import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectListGroup = props => {
  const { name, value, error, onChange, options } = props;

  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div>
      <div className="form-group select">
        <select
          id="format"
          name={name}
          className={classnames({ "is-invalid": error })}
          value={value}
          onChange={onChange}
        >
          {selectOptions}
        </select>
        {/* {moreInfo && <small className="form-text text-muted">{moreInfo}</small>} */}
      </div>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  // moreInfo: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
