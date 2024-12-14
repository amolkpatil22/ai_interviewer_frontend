export enum LocalStorageKeys {
  isLoggedIn = "isLoggedIn",
}

export const setItemToLocalStorage = (key: LocalStorageKeys, value: string | boolean | number) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItemFromLocalStorage = (key: LocalStorageKeys) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const removeItemFromLocalStorage = (key: LocalStorageKeys) => {
  localStorage.removeItem(key);
};
