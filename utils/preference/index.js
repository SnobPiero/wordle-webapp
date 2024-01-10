import { createContext, useCallback, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

import { getLocalStorage, setLocalStorage } from "@/utils/storage";

const PreferenceContext = createContext();

const usePreference = () => {
  const context = useContext(PreferenceContext);
  if (!context) {
    throw new Error("usePreference must be used within a PreferenceProvider");
  }
  return context;
};

const ProviderPreference = ({ children }) => {
  const storageKey = "preference-settings";
  const [preference, setPreference] = useState({
    theme: "system",
    space: "default",
    size: 16,
  });

  const savePreference = useCallback((p) => {
    setPreference(p);
    setLocalStorage(storageKey, p);
  }, []);

  const applyPreference = useCallback((p) => {
    if (!p) return;
    let newTheme = p.theme;
    if (newTheme) {
      if (newTheme === "system") {
        newTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
      document.body.classList.remove("light", "dark");
      document.body.classList.add(newTheme);
    }
    if (p.space) {
      document.body.classList.remove("global-space-compact", "global-space-expand", "default");
      document.body.classList.add(p.space);
    }
    if (p.size) {
      document.querySelector(":root").style.setProperty("--global-font-size", `${p.size}px`);
    }
  }, []);

  useEffect(() => {
    let p = {
      theme: "system",
      space: "default",
      size: "16",
    };
    let unsubscribeStorage = null;
    if (typeof window !== "undefined") {
      if (getLocalStorage(storageKey)) {
        p = getLocalStorage(storageKey);
      }

      unsubscribeStorage = addEventListener("storage", (event) => {
        if (event.key === storageKey) {
          applyPreference(getLocalStorage(storageKey));
        }
      });
    }
    setPreference(p);

    return () => {
      if (unsubscribeStorage) {
        unsubscribeStorage();
      }
    };
  }, [applyPreference]);

  useEffect(() => {
    applyPreference(preference);
  }, [preference, applyPreference]);

  return <PreferenceContext.Provider value={{ preference, savePreference }}>{children}</PreferenceContext.Provider>;
};

ProviderPreference.propTypes = {
  children: PropTypes.element,
};

export { ProviderPreference, usePreference };
