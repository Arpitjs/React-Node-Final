export const setData = (key, val) => localStorage.setItem(key, JSON.stringify(val));
export const getData = (key) => JSON.parse(localStorage.getItem(key));
export const removeData = (key) => localStorage.removeItem(key);