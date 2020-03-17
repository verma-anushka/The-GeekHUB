import React from "react";
import "../assets/styles/components/Spinner.scss";

export default function Spinner() {
  return (
    <div className="loader JS_on">
      <span className="binary"></span>
      <span className="binary"></span>
      <span className="binary"></span>
      <span className="binary"></span>
    </div>
  );
}
