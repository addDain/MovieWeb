import React from "react";
import { useNavigate } from "react-router-dom";

function Logout({ logout }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
