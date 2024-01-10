import { useState, createContext, useContext, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

const GlobalStateContext = createContext();

const ProviderGlobalState = ({ children }) => {
  const [globalState, setGlobalState] = useState(null);

  const _getInitialGlobalState = useCallback(() => {
    setGlobalState("");
  }, []);

  useEffect(() => {
    _getInitialGlobalState();
  }, [_getInitialGlobalState]);

  return <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>{children}</GlobalStateContext.Provider>;
};
ProviderGlobalState.propTypes = {
  children: PropTypes.element,
  state: PropTypes.object,
};

const useGlobalState = (value) => {
  const context = useContext(GlobalStateContext);
  if (context) return context;
  return value;
};
useGlobalState.propTypes = {
  value: PropTypes.string,
};

export { ProviderGlobalState, useGlobalState };
