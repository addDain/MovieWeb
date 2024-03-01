import React from "react";
import { Outlet } from "react-router";
import Navigation from "../component/Navigation";

export default function DefaultLayout() {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
}
