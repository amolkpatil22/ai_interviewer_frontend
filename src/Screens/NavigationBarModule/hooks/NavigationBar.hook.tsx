import { useEffect, useState } from "react";
import { getItemFromLocalStorage, LocalStorageKeys } from "../../../Common/Utils/ManageLocalStorage";

export const useNavigationBar = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    setIsUserLoggedIn(getItemFromLocalStorage("isLoggedIn"));
  }, [getItemFromLocalStorage("isLoggedIn")]);

  return {
    isUserLoggedIn,
  };
};
