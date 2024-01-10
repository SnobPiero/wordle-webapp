import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";

import ViewField from "@/components/form/ViewField";

const ViewNumber = (props) => {
  const {
    value = "",
    disabled = false,
    valueClass = "",
    prefix = null,
    suffix = null,

    decimal = 6,
    forceDecimal = null,
  } = props;

  return (
    <ViewField {...props} align="right">
      <div className={`form-value ${disabled ? "disabled" : ""} ${valueClass}`}>
        {prefix && <span className="fix">{prefix}&nbsp;</span>}
        <NumericFormat
          // type="text"
          // className={`form-control ${inputClass}`}
          displayType="text"
          value={value}
          // disabled={disabled}
          // placeholder={placeholder}
          thousandSeparator={false}
          decimalSeparator=","
          allowNegative={true}
          allowLeadingZeros={false}
          valueIsNumericString={true}
          decimalScale={decimal}
          fixedDecimalScale={forceDecimal}
        />
        {suffix && <span className="fix">&nbsp;{suffix}</span>}
      </div>
    </ViewField>
  );
};

ViewNumber.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  valueClass: PropTypes.string,
  prefix: PropTypes.string,
  suffix: PropTypes.string,

  decimal: PropTypes.number,
  forceDecimal: PropTypes.bool,
};

export default ViewNumber;
