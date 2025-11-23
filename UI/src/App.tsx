import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import LoginContainer from "./components/container/LoginContainer";
import RegisterOrgContainer from "./components/container/RegisterOrgContainer";
import OrgListContainer from "./components/container/OrgListContainer";
import EditOrgContainer from "./components/container/EditOrgContainer";
import EditHRContainer from "./components/container/EditHRContainer";

import OrgHRListContainer from "./components/container/OrgHRListContainer";
import AddHRContainer from "./components/container/AddHRContainer";
//import EditHRContainer from "./components/container/EditHRContainer";

import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/common/Navbar";

function App() {
  return (
    <BrowserRouter>
      <NavbarWrapper />

      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LoginContainer />} />

        {/* ------------ Organisation Routes ------------ */}
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

        {/* ------------ HR Routes ------------ */}
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

        {/* ------------ Fallback ------------ */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

/* Hide navbar on login page only */
function NavbarWrapper() {
  const location = useLocation();

  const hideOn = ["/"]; // login page
  if (hideOn.includes(location.pathname)) return null;

  return <Navbar />;
}

export default App;
