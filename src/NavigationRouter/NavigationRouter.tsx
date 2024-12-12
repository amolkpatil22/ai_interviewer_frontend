import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginModule } from "../Screens/LoginModule/LoginModule";

export const NavigationRouter: React.FC = () => {
  return (
    <Routes>
      <Route Component={LoginModule} path="/login" />
    </Routes>
  );
};
