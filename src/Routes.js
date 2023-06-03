import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Map from "./Pages/Map";
import NavigationIframe from "./Pages/NavigationIframe";
import VisitedPath from "./Pages/VisitedPath";
import AddCircleToRoute from "./Pages/Admin/AddCircleToRoute";
import ListOfRouts from "./Pages/Admin/ListOfRouts";
import ListOfUser from "./Pages/Admin/ListOfUser";
import AdminLogin from "./Pages/Admin/AdminLogin";
import UserLogin from "./Pages/UserLogin";
import LandingPage from "./Pages/LandingPage";
import RouteReport from "./Pages/Admin/RouteReport";
import Dashboard from "./Pages/Admin/Dashboard";
import TebleReport from "./Pages/Admin/TebleReport";
import RealTimePCRTracking from "./Pages/Admin/RealTimePCRTracking";

import Sample_MAP from "./Sample_MAP";

import { AdminLayout, UserLayout, UserHeaderlessLayout } from "./HOC/LayOutHOC";

class Routing extends React.Component {
  render() {
    return (
      <Routes>
        <Route exact path="/" element={UserHeaderlessLayout(LandingPage)} />
        <Route
          exact
          path="/sample"
          element={UserHeaderlessLayout(Sample_MAP)}
        />
        <Route
          exact
          path="/navigation/:source/:destinationdata"
          element={UserLayout(NavigationIframe, "back_button")}
        />
        {/* <Route exact path="/home" element={UserHeaderlessLayout(Home)} /> */}
        <Route
          exact
          path="/register"
          element={UserHeaderlessLayout(Register)}
        />
        <Route exact path="/login" element={UserHeaderlessLayout(UserLogin)} />
        <Route exact path="/home" element={UserLayout(Map)} />
        <Route exact path="/path" element={UserLayout(VisitedPath)} />

        <Route exact path="/admin/users" element={AdminLayout(ListOfUser)} />
        <Route
          exact
          path="/admin/list-of_routs"
          element={AdminLayout(ListOfRouts)}
        />
        <Route
          exact
          path="admin/add-routs/:id"
          element={AdminLayout(AddCircleToRoute)}
        />

        {/* <Route
          exact
          path="/admin/login"
          element={UserHeaderlessLayout(AdminLogin)}
        /> */}

        <Route
          exact
          path="/admin/route-report"
          element={AdminLayout(RouteReport)}
        />
        <Route exact path="/dashboard" element={AdminLayout(Dashboard)} />
        <Route
          exact
          path="/admin/status-reports"
          element={AdminLayout(TebleReport)}
        />
        <Route
          exact
          path="/track-pcr-vans"
          element={AdminLayout(RealTimePCRTracking)}
        />
        <Route element={<>Page Not found</>} />
      </Routes>
    );
  }
}

export default Routing;
