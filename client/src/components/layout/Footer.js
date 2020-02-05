import React from "react";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer>
      <div className="container-fluid">
        Copyright &copy; {new Date().getFullYear()} Go Geeks
      </div>
    </footer>
  );
}
