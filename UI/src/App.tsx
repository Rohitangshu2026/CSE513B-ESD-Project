import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AccessDeniedContainer from "./components/container/AccessDeniedContainer";
import NotFoundContainer from "./components/container/NotFoundContainer";

import LoginContainer from "./components/container/LoginContainer";
import RegisterOrgContainer from "./components/container/RegisterOrgContainer";
import OrgListContainer from "./components/container/OrgListContainer";
import EditOrgContainer from "./components/container/EditOrgContainer";
import EditHRContainer from "./components/container/EditHRContainer";
import ServerErrorContainer from "./components/container/ServerErrorContainer";

import OrgHRListContainer from "./components/container/OrgHRListContainer";
import AddHRContainer from "./components/container/AddHRContainer";
//import EditHRContainer from "./components/container/EditHRContainer";

import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/common/Navbar";

function App() {
  return (
    <BrowserRouter>
      <NavbarWrapper />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        theme="colored"
      />
      <Routes>
        
        {/* Public Routes */}
        <Route path="/" element={<LoginContainer />} />
        <Route path="/access-denied" element={<AccessDeniedContainer />} />
        <Route path="/not-found" element={<NotFoundContainer />} />
        <Route path="/server-error" element={<ServerErrorContainer />} />

        {/* Protected Routes */}
        <Route
          path="/org/register"
          element={
            <PrivateRoute>
              <RegisterOrgContainer />
            </PrivateRoute>
          }
        />

        <Route
          path="/org/list"
          element={
            <PrivateRoute>
              <OrgListContainer />
            </PrivateRoute>
          }
        />

        <Route
          path="/org/edit/:name"
          element={
            <PrivateRoute>
              <EditOrgContainer />
            </PrivateRoute>
          }
        />

        <Route
          path="/org/:name/hr"
          element={
            <PrivateRoute>
              <OrgHRListContainer />
            </PrivateRoute>
          }
        />

        <Route
          path="/org/:name/hr/add"
          element={
            <PrivateRoute>
              <AddHRContainer />
            </PrivateRoute>
          }
        />

        <Route
          path="/org/:name/hr/edit/:hrId"
          element={
            <PrivateRoute>
              <EditHRContainer />
            </PrivateRoute>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </BrowserRouter>
  );
}

function NavbarWrapper() {
  const location = useLocation();

  const noNavbarRoutes = ["/"];

  if (noNavbarRoutes.includes(location.pathname)) {
    return null;
  }

  return <Navbar />;
}


export default App;
