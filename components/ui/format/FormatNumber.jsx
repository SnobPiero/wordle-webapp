import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";
import { it } from "date-fns/locale";

const FormatNumber = (props) => {
  const { value = "", prefix = null, suffix = null, decimal = 6, forceDecimal = null } = props;

  const currentLocale = it;

  let decimalSeparator = ",";
  switch (currentLocale) {
    case "en":
      decimalSeparator = ".";
      break;
    default:
    case "it":
    case "fr":
      decimalSeparator = ",";
      break;
  }

  return (
    <>
      {prefix && <span className="fix">{prefix}&nbsp;</span>}
      <NumericFormat
        displayType="text"
        value={value}
        thousandSeparator={false}
        decimalSeparator={decimalSeparator}
        allowNegative={true}
        allowLeadingZeros={false}
        valueIsNumericString={true}
        decimalScale={decimal}
        fixedDecimalScale={forceDecimal}
      />
      {suffix && <span className="fix">&nbsp;{suffix}</span>}
    </>
  );
};

FormatNumber.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  decimal: PropTypes.number,
  forceDecimal: PropTypes.bool,
};

export default FormatNumber;
