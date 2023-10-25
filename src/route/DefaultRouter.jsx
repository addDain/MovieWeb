import React from "react";
import { Routes, Route } from "react-router-dom";
// import DefaultLayout from "../layout/DefaultLayout";
import UserLayout from "../layout/UserLayout";
import AdminLayout from "../layout/AdminLayout";
import Home from "../pages/Home";
import Favorites from "../pages/Favorites";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import NotFound from "../component/Notfound";
import Admin from "../pages/Admin";
// import { RequireToken } from "../auth/Auth";
// import { signIn } from "../auth/Auth";
// import AuthRoute from "../auth/AuthRoute";
// import Logout from "../pages/Logout";
// import { AuthProvider } from "../auth/Auth";
// import RequireAuth from "../auth/RequireAuth";

function DefaultRouter() {
  // const [user, setUser] = useState(null);
  // const authenticated = user != null;

  // const login = ({ id, pw }) => setUser(signIn({ id, pw }));
  // const logout = () => setUser(null);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />

      <Route element={<UserLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}
export default DefaultRouter;
