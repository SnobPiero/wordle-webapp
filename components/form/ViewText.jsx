import PropTypes from "prop-types";

import ViewField from "@/components/form/ViewField";

const ViewText = (props) => {
  const { disabled = false, valueClass = "", prefix = "", suffix = "", uppercase = false } = props;

  let { value = "" } = props;

  if (value && uppercase) {
    value = value.toUpperCase(value);
  }

  return (
    <ViewField {...props}>
      <div className={`form-value ${disabled ? "disabled" : ""} ${valueClass}`}>
        {value && prefix && <span className="fix">{prefix}</span>}
        {value}
        {value && suffix && <span className="fix">{suffix}</span>}
      </div>
    </ViewField>
  );
};

ViewText.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  valueClass: PropTypes.string,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  uppercase: PropTypes.bool,
};

export default ViewText;
