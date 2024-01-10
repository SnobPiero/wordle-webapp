import { useState, useEffect } from "react";

const useMediaQuery = (mediaQuery) => {
  const defaultValue =
    typeof window === "object" &&
    typeof window !== "undefined" &&
    "matchMedia" in window &&
    !!window.matchMedia(mediaQuery).matches;
  const [isVerified, setIsVerified] = useState(defaultValue);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQuery);
    const documentChangeHandler = () => setIsVerified(!!mediaQueryList.matches);

    mediaQueryList.addEventListener("change", documentChangeHandler);
    documentChangeHandler();

    return () => {
      mediaQueryList.removeEventListener("change", documentChangeHandler);
    };
  }, [mediaQuery]);

  return isVerified;
};

const isTouchDevice = () => {
  return (
    typeof window === "object" &&
    typeof window !== "undefined" &&
    // eslint-disable-next-line compat/compat
    ("ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0)
  );
};

export { useMediaQuery, isTouchDevice };
