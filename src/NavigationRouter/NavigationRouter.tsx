import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginModule } from "../Screens/LoginModule/LoginModule";
import { SignUpModule } from "../Screens/SignUpModule/SignUpModule";
import { AnalysisModule } from "../Screens/AnalysisModule/AnalysisModule";

export const NavigationRouter: React.FC = () => {
  return (
    <Routes>
      <Route Component={LoginModule} path="/login" />
      <Route Component={SignUpModule} path="/signup" />
      <Route Component={AnalysisModule} path="/analysis" />
    </Routes>
  );
};
