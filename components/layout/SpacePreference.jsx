import { useCallback } from "react";

import { FiCheck } from "react-icons/fi";

import { usePreference } from "@/utils/preference";

const SpacePreference = () => {
  const { preference, savePreference } = usePreference();

  const space = preference.space || "default";

  const changeTextSize = useCallback(
    (spacing) => {
      let setSpacing = "default";
      if (spacing === "compact") {
        setSpacing = "global-space-compact";
      }
      if (spacing === "expand") {
        setSpacing = "global-space-expand";
      }
      savePreference({ ...preference, space: setSpacing });
    },
    [preference, savePreference],
  );

  return (
    <div className="user-space-selector">
      <div className="space-selector-item">
        <div className={`skeleton-space-wrapper ${space === "global-space-compact" ? "border-blue-300" : "border-body-bg"} `}>
          <div className="grid cursor-pointer grid-cols-1 gap-2 rounded p-2 shadow" onClick={() => changeTextSize("compact")}>
            <div className="h-2 rounded bg-slate-300" />
            <div className="h-2 rounded bg-slate-300" />
            <div className="h-2 rounded bg-slate-300" />
            <div className="h-2 rounded bg-slate-300" />
          </div>
        </div>
        <div className="space-selector-footer">
          <span>Compact</span>
          {space === "global-space-compact" && <FiCheck />}
        </div>
      </div>
      <div className="space-selector-item">
        <div className={`skeleton-space-wrapper ${space === "default" ? "border-blue-300" : "border-body-bg"} `}>
          <div className="grid cursor-pointer grid-cols-1 gap-3 rounded p-2 shadow" onClick={() => changeTextSize("default")}>
            <div className="h-3 rounded bg-slate-300" />
            <div className="h-3 rounded bg-slate-300" />
            <div className="h-3 rounded bg-slate-300" />
          </div>
        </div>
        <div className="space-selector-footer">
          <span>Normal</span>
          {space === "default" && <FiCheck />}
        </div>
      </div>
      <div className="space-selector-item">
        <div className={`skeleton-space-wrapper ${space === "global-space-expand" ? "border-blue-300" : "border-body-bg"} `}>
          <div className="grid cursor-pointer grid-cols-1 gap-3 rounded p-2 shadow" onClick={() => changeTextSize("expand")}>
            <div className="h-6 rounded bg-slate-300" />
            <div className="h-6 rounded bg-slate-300" />
          </div>
        </div>
        <div className="space-selector-footer">
          <span>Expand</span>
          {space === "global-space-expand" && <FiCheck />}
        </div>
      </div>
    </div>
  );
};

export default SpacePreference;
