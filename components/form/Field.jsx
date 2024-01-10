import PropTypes from "prop-types";

import { FaAsterisk } from "react-icons/fa";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const Field = ({
  children,
  label = null,
  required = false,
  size = "",
  groupClass = "",
  labelClass = "",
  errorClass = "",
  tooltipTitle = "",
  tooltipText = "",
  helpText = "",
  prefix = "",
  suffix = "",
  error,
}) => {
  return (
    <div className={`form-group ${groupClass} ${size}`}>
      <div className="form-field-up">
        {label && (
          <label className={`form-label ${labelClass}`}>
            {label}
            {required && <FaAsterisk size="0.4rem" />}
          </label>
        )}
        {(tooltipTitle || tooltipText) && (
          <div className="form-tooltip">
            <div data-tooltip-id="default-tooltip" data-tooltip-title={tooltipTitle} data-tooltip-content={tooltipText}>
              <AiOutlineQuestionCircle size="1rem" />
            </div>
          </div>
        )}
      </div>
      <div className={`form-field ${suffix ? "reverse" : ""}`}>
        {prefix && <div className="form-prefix">{prefix}</div>}
        {suffix && <div className="form-suffix">{suffix}</div>}
        {children}
      </div>
      <div className="form-field-down">
        {(error?.message || error?.customMessage) && (
          <div className={`form-error-message ${errorClass}`}>
            {error?.message ? (
              error?.message?.key ? (
                <span>
                  {error?.message.key}-{error?.message?.values}
                </span>
              ) : (
                error?.message
              )
            ) : null}
            {error?.customMessage}
          </div>
        )}
        {helpText && <div className="form-help-text">{helpText}</div>}
      </div>
    </div>
  );
};

Field.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  name: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  size: PropTypes.string,
  groupClass: PropTypes.string,
  labelClass: PropTypes.string,
  errorClass: PropTypes.string,
  tooltipTitle: PropTypes.string,
  tooltipText: PropTypes.string,
  helpText: PropTypes.string,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  error: PropTypes.object,
};

export default Field;
