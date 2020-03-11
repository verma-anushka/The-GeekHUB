import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export default props => {
  return (
    <div className="fadein">
      {/* <div className="delete">
        <FontAwesomeIcon icon={faTimesCircle} size="2x" />
      </div> */}
      <img
        style={{ width: "200px", height: "200px" }}
        src={props.images}
        alt=""
      />
    </div>
  );
};
