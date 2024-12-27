export interface LocalStorageKeys {
  isLoggedIn: boolean;
  savedTime: number;
}

export const setItemToLocalStorage = <T extends keyof LocalStorageKeys>(key: T, value: LocalStorageKeys[T]) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItemFromLocalStorage = <T extends keyof LocalStorageKeys>(key: T): LocalStorageKeys[T] | null => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const removeItemFromLocalStorage = (key: keyof LocalStorageKeys) => {
  localStorage.removeItem(key);
};
