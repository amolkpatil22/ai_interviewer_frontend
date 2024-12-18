import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { LoginModule } from "../Screens/LoginModule/LoginModule";
import { SignUpModule } from "../Screens/SignUpModule/SignUpModule";
import { AnalysisModule } from "../Screens/AnalysisModule/AnalysisModule";
import { InterviewModule } from "../Screens/InterviewModule/InterviewModule";
import { LandingModule } from "../Screens/LandingModule/LandingModule";
import { AuthWrapper } from "./Wrappers/Auth.wrapper";

export const NavigationRouter: React.FC = () => {
  return (
    <Routes>
      <Route Component={LandingModule} path="/" />
      <Route Component={LoginModule} path="/login" />
      <Route Component={SignUpModule} path="/signup" />
      <Route
        element={
          <AuthWrapper>
            <AnalysisModule />
          </AuthWrapper>
        }
        path="/analysis"
      />
      <Route
        element={
          <AuthWrapper>
            <InterviewModule />
          </AuthWrapper>
        }
        path="/interview/:session_id/:question_id?"
      />
      <Route path="/*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
