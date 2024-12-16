import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { LoginModule } from "../Screens/LoginModule/LoginModule";
import { SignUpModule } from "../Screens/SignUpModule/SignUpModule";
import { AnalysisModule } from "../Screens/AnalysisModule/AnalysisModule";
import { InterviewModule } from "../Screens/InterviewModule/InterviewModule";
import { LandingModule } from "../Screens/LandingModule/LandingModule";

export const NavigationRouter: React.FC = () => {
  return (
    <Routes>
      <Route Component={LandingModule} path="/" />
      <Route Component={LoginModule} path="/login" />
      <Route Component={SignUpModule} path="/signup" />
      <Route Component={AnalysisModule} path="/analysis" />
      <Route Component={InterviewModule} path="/interview" />
      <Route path="/*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
