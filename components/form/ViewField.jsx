import PropTypes from "prop-types";

import { AiOutlineQuestionCircle } from "react-icons/ai";

const ViewField = ({
  children,
  value = "",
  label = null,
  size = "",
  align = null,
  labelClass = "",
  tooltipTitle = "",
  tooltipText = "",
  helpText = "",
}) => {
  return (
    <div className={`form-group ${size} ${align}`}>
      <div className="form-field-up">
        {label && <label className={`form-label ${labelClass}`}>{label}</label>}
        {(tooltipTitle || tooltipText) && (
          <div className="form-tooltip">
            <div data-tooltip-id="default-tooltip" data-tooltip-title={tooltipTitle} data-tooltip-content={tooltipText}>
              <AiOutlineQuestionCircle size="1rem" />
            </div>
          </div>
        )}
      </div>
      <div className="form-field">{children}</div>
      <div className="form-field-down">
        {value !== null && helpText ? <div className="form-help-text">{helpText}</div> : null}
      </div>
    </div>
  );
};

ViewField.propTypes = {
  children: PropTypes.element,
  value: PropTypes.any,
  label: PropTypes.string,
  size: PropTypes.string,
  align: PropTypes.string,
  labelClass: PropTypes.string,
  tooltipTitle: PropTypes.string,
  tooltipText: PropTypes.string,
  helpText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default ViewField;
