import React from "react";
import "../assets/styles/components/Spinner.scss";

export default function Spinner() {
  return (
    // <div classNameName="spinner">
    //   <h1>Spinner..........</h1>
    // </div>

    <div class="loader JS_on">
      <span class="binary"></span>
      <span class="binary"></span>
      <span class="binary"></span>
      <span class="binary"></span>
    </div>
  );
}
