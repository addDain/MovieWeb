import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="nav">
      <Link to="/home">Home</Link>
      <Link to="/favorites">Favorites</Link>
    </div>
  );
}
export default Navigation;
