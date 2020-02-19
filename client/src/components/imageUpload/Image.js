import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export default props => {
  return (
    <div className="fadein">
      <div className="delete">
        <FontAwesomeIcon icon={faTimesCircle} size="2x" />
      </div>
      <img src={props.images} alt="" />
    </div>
  );
};
