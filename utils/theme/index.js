import { useState, createContext, useContext, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

const storageKey = "theme-setting";

const ThemeContext = createContext();

const ProviderTheme = ({ children }) => {
  const [theme, setTheme] = useState();

  const getColorPreference = () => {
    let theme = "system";
    if (typeof window !== "undefined") {
      if (localStorage.getItem(storageKey)) {
        theme = localStorage.getItem(storageKey);
      }
    }
    return theme;
  };

  useEffect(() => {
    const theme = getColorPreference();
    setTheme(theme);
  }, []);

  useEffect(() => {
    if (!theme) return;
    let newTheme = theme;
    if (theme === "system") {
      newTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    document.body.classList.remove("light", "dark");
    document.body.classList.add(newTheme);
  }, [theme]);

  const saveTheme = useCallback((theme) => {
    setTheme(theme);
    localStorage.setItem(storageKey, theme);
  }, []);

  useEffect(() => {
    if (!window || !window.matchMedia) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = ({ matches: isDark }) => {
      if (theme === "system") {
        const newTheme = isDark ? "dark" : "light";
        document.body.classList.remove("light", "dark");
        document.body.classList.add(newTheme);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    // rimuove il listener quando il componente viene smontato
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [saveTheme, theme]);

  return <ThemeContext.Provider value={{ theme, saveTheme }}>{children}</ThemeContext.Provider>;
};
ProviderTheme.propTypes = {
  children: PropTypes.element,
  initTheme: PropTypes.string,
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context) return context;
  return "light";
};

export { ProviderTheme, useTheme };
