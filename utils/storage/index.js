export const getLocalStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (err) {
    return undefined;
  }
};

export const setLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    // nop
  }
};

export const getSessionStorage = (key) => {
  try {
    return JSON.parse(sessionStorage.getItem(key));
  } catch (err) {
    return undefined;
  }
};

export const setSessionStorage = (key, data) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    // nop
  }
};
