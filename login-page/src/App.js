import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import OffensePageAdmin from "./pages/OffenseTableAdmin";
import ViolationPageAdmin from "./pages/ViolationTableAdmin";
import CsSlipPageAdmin from "./pages/CommunityServiceSlip";
import CsReportPageAdmin from "./pages/CommunityServiceReport";
import CreateAccount from "./pages/CreateAccount";
import ForgotPassword from "./pages/ForgotPassword";
import CsListPageAdmin from "./pages/ListCommunityServiceReport";
import EmployeeCsList from "./pages/EmployeeCsList";
import OTP from "./pages/OTP";


//kate
import CsSlipGuest from "./pages/CsSlipGuest";
import CsSlipStudent from "./pages/CsSlipStudent";
import ViolationGuest from "./pages/ViolationsGuest";
import ViolationStudent from "./pages/ViolationStudent";

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/offense-admin" element={<OffensePageAdmin />} />
              <Route path="/violation-admin" element={<ViolationPageAdmin />} />
              <Route path="/cs-slip-admin" element={<CsSlipPageAdmin />} />
              <Route path="/cs-list-employee" element={<EmployeeCsList />} />
              <Route path="/cs-list-admin" element={<CsListPageAdmin />} />
              <Route path="/cs-report-admin" element={<CsReportPageAdmin/>} />
              <Route path="/create-account" element={<CreateAccount/>} />
              <Route path="/password" element={<ForgotPassword/>} />
              <Route path="/otp" element={<OTP/>} />  

              <Route path="/cs-slip-guest" element={<CsSlipGuest/>} /> 
              <Route path="/cs-slip-student" element={<CsSlipStudent/>} /> 
              <Route path="/violation-guest" element={<ViolationGuest/>} /> 
              <Route path="/violation-student" element={<ViolationStudent/>} /> 
              <Route path="*" element={<Navigate to="/" />} />
          </Routes>
      </Router>
  );
};

export default App;