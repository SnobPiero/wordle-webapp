import PropTypes from "prop-types";

import { FiCheck } from "react-icons/fi";

import { usePreference } from "@/utils/preference";

const SkeletonThemePreference = ({ themeType = "light", stateTheme = null, callBack = null }) => {
  return (
    <div
      className={`mx-auto w-full max-w-sm rounded-md ${
        themeType === stateTheme ? "border-blue-300" : "border-body-bg"
      } border-2 ${themeType === "light" ? "bg-white" : "bg-slate-900"}`}
    >
      <div className="flex-1 cursor-pointer rounded-md shadow" onClick={() => callBack()}>
        <div className="bg-header-bg h-4 rounded-t" />
        <div className="grid grid-cols-4 gap-4 p-2">
          <div className="col-span-1 space-y-2">
            <div className="h-4 rounded bg-slate-300" />
            <div className="h-4 rounded bg-slate-300" />
            <div className="h-4 rounded bg-slate-300" />
          </div>
          <div className={`col-span-3 h-full rounded ${themeType === "light" ? "bg-slate-300" : "bg-slate-700"}`} />
        </div>
      </div>
    </div>
  );
};

SkeletonThemePreference.propTypes = {
  themeType: PropTypes.string,
  stateTheme: PropTypes.string,
  callBack: PropTypes.func,
};

const SkeletonThemeSystem = ({ stateTheme = null, callBack = null }) => {
  return (
    <div
      className={`mx-auto w-full max-w-sm rounded-md ${
        "system" === stateTheme ? "border-blue-300" : "border-body-bg"
      } border-2 bg-transparent`}
    >
      <div className="flex-1 cursor-pointer rounded-md shadow" onClick={() => callBack()}>
        <div className="bg-header-bg h-4 rounded-t" />
        <div className="grid grid-cols-2 gap-0">
          <div className="grid grid-cols-4 gap-4 rounded-bl bg-white py-2 pl-2">
            <div className="col-span-2 space-y-2">
              <div className="h-4 rounded bg-slate-300" />
              <div className="h-4 rounded bg-slate-300" />
              <div className="h-4 rounded bg-slate-300" />
            </div>
            <div className="col-span-2 h-full rounded-l bg-slate-300" />
          </div>
          <div className="rounded-br bg-slate-900 py-2 pr-2">
            <div className="col-span-3 h-full rounded-r bg-slate-700" />
          </div>
        </div>
      </div>
    </div>
  );
};

SkeletonThemeSystem.propTypes = {
  stateTheme: PropTypes.string,
  callBack: PropTypes.func,
};

const ThemePreference = () => {
  const { preference, savePreference } = usePreference();

  const theme = preference.theme;

  const handleThemePreference = (selectedTheme) => {
    savePreference({ ...preference, theme: selectedTheme });
  };

  return (
    <div className="user-theme-list-wrapper">
      <div className="skeleton-theme-wrapper">
        <SkeletonThemePreference themeType="light" stateTheme={theme} callBack={() => handleThemePreference("light")} />
        <div className="skeleton-theme-footer">
          <span>Light</span>
          {theme === "light" && <FiCheck />}
        </div>
      </div>
      <div className="skeleton-theme-wrapper">
        <SkeletonThemePreference themeType="dark" stateTheme={theme} callBack={() => handleThemePreference("dark")} />
        <div className="skeleton-theme-footer">
          <span>Dark</span>
          {theme === "dark" && <FiCheck />}
        </div>
      </div>
      <div className="skeleton-theme-wrapper">
        <SkeletonThemeSystem stateTheme={theme} callBack={() => handleThemePreference("system")} />
        <div className="skeleton-theme-footer">
          <span>Default</span>
          {theme === "system" && <FiCheck />}
        </div>
      </div>
    </div>
  );
};

export default ThemePreference;
