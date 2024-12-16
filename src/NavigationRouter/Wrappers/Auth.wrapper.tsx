import { ReactNode } from "react";
import { getItemFromLocalStorage, LocalStorageKeys } from "../../Common/Utils/ManageLocalStorage";
import { Navigate } from "react-router-dom";

interface AuthWrapperProps {
  children: ReactNode; // Specify the type of children
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const isUserLoggedIn = getItemFromLocalStorage("isLoggedIn");

  if (isUserLoggedIn !== true) {
    return <Navigate to={"/login"}></Navigate>;
  }
  return children;
};
