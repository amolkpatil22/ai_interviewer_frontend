import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginModule } from "../Screens/LoginModule/LoginModule";
import { SignUpModule } from "../Screens/SignUpModule/SignUpModule";

export const NavigationRouter: React.FC = () => {
  return (
    <Routes>
      <Route Component={LoginModule} path="/login" />
      <Route Component={SignUpModule} path="/signup" />
    </Routes>
  );
};
