import { useCallback } from "react";

import { FiCheck } from "react-icons/fi";

import { usePreference } from "@/utils/preference";

const TextSizePreference = () => {
  const { preference, savePreference } = usePreference();

  const size = preference.size || "16";

  const changeTextSize = useCallback(
    (sizing) => {
      let setSizing = "16";
      if (sizing === "small") {
        setSizing = "14";
      }
      if (sizing === "large") {
        setSizing = "18";
      }
      savePreference({ ...preference, size: setSizing });
    },
    [preference, savePreference],
  );

  return (
    <div className="user-text-size">
      <div className="col-wrapper">
        <div
          className={`letters-wrapper ${size === "14" ? "border-blue-300" : "border-body-bg"}`}
          onClick={() => changeTextSize("small")}
        >
          <div>
            <span className="text-lg">A</span>
            <span className="text-xl">A</span>
            <span className="text-2xl">A</span>
          </div>
        </div>
        <div className="col-footer">
          <span>Small</span>
          {size === "14" && <FiCheck />}
        </div>
      </div>
      <div className="col-wrapper">
        <div
          className={`letters-wrapper ${size === "16" ? "border-blue-300" : "border-body-bg"}`}
          onClick={() => changeTextSize("base")}
        >
          <div>
            <span className="text-xl">A</span>
            <span className="text-2xl">A</span>
            <span className="text-3xl">A</span>
          </div>
        </div>
        <div className="col-footer">
          <span>Default</span>
          {size === "16" && <FiCheck />}
        </div>
      </div>
      <div className="col-wrapper">
        <div
          className={`letters-wrapper ${size === "18" ? "border-blue-300" : "border-body-bg"}`}
          onClick={() => changeTextSize("large")}
        >
          <div>
            <span className="text-2xl">A</span>
            <span className="text-3xl">A</span>
            <span className="text-4xl">A</span>
          </div>
        </div>
        <div className="col-footer">
          <span>Big</span>
          {size === "18" && <FiCheck />}
        </div>
      </div>
    </div>
  );
};

export default TextSizePreference;
