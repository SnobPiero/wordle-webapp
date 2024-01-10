const getInitialGlobalState = (access_token) => {
  if (!access_token) {
    return {};
  }

  const globalState = {
    time: new Date().toISOString(),
  };
  return globalState;
};

export { getInitialGlobalState };
