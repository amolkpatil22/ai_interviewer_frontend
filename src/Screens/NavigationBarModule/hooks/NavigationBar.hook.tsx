import { useEffect, useState } from "react";
import { getItemFromLocalStorage, LocalStorageKeys } from "../../../Common/Utils/ManageLocalStorage";

export const useNavigationBar = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState();

  useEffect(() => {
    setIsUserLoggedIn(getItemFromLocalStorage(LocalStorageKeys.isLoggedIn));
  }, [getItemFromLocalStorage(LocalStorageKeys.isLoggedIn)]);

  return {
    isUserLoggedIn,
  };
};
