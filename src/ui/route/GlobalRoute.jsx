import { useSessionStorageState } from "ahooks";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavigatorProvider } from "../../service/context/NavigatorContext";
import AdminLayout from "../page/_base/AdminLayout";
import HomePage from "../page/home/HomePage";
import LoginPage from "../page/login/LoginPage";
import CreateOpcrPage from "../page/createopcr/CreateOpcrPage";
import IpcrCreatePage from "../page/createIpcr/IpcrCreatePage";
import ReviewPmtPage from "../page/pmt/ReviewPmtPage";
import StrategicPlanPage from "../page/Strategicplan/StrategicPlanPage";
import OperationalPlanPage from "../page/Operationalplan/OperationalPlanPage";
import MediumDevGoalsPage from "../page/MediumDevGoals/MediumDevGoalsPage";
import GeneralPage from "../page/general/GeneralPage";
import UserProfilePage from "../page/Profile/UserProfilePage";
import OptionPage from "../page/options/OptionPage";
import ProtectedRoute from "./ProtectedRoute";

//This will serve as the base router for all pages
const GlobalRoute = () => {
  const [selectedKey, setSelectedKey] = useSessionStorageState(
    "selected-menu",
    "home"
  );
  return (
    <NavigatorProvider
      value={{ selectedKey: selectedKey, setSelectedKey: setSelectedKey }}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="home" element={<HomePage />} />

            <Route path="strategicplan" element={<StrategicPlanPage />} />

            <Route path="operationalplan" element={<OperationalPlanPage />} />

            <Route path="mediumdevgoals" element={<MediumDevGoalsPage />} />

            <Route path="createopcr" element={<CreateOpcrPage />} />

            {/* <Route path="ipcrforms" element={<IPCRFormsPage />} /> */}

            {/* <Route path="repository" element={<RepositoryPage />} /> */}

            <Route path="createipcr" element={<IpcrCreatePage />} />

            <Route path="reviewform" element={<ReviewPmtPage />} />

            <Route path="/general" element={<GeneralPage />} />

            <Route path="/profile" element={<UserProfilePage />} />

            <Route path="/option" element={<OptionPage />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </NavigatorProvider>
  );
};

export default GlobalRoute;
