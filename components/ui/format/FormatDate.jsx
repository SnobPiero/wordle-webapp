import PropTypes from "prop-types";
import dateFormat from "date-fns/format";
import isValid from "date-fns/isValid";

import { it } from "date-fns/locale";

const FormatDate = (props) => {
  const { value = null, type = "date", format = null } = props;

  let _format = "P";
  if (type === "datetime") {
    _format = "Pp";
  }
  if (type === "time") {
    _format = "p";
  }
  if (type === "datetimesec") {
    _format = "Ppp";
  }
  if (format) {
    _format = format;
  }

  return value && isValid(new Date(value)) && dateFormat(new Date(value), _format, { locale: it });
};

FormatDate.propTypes = {
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  disabled: PropTypes.bool,
  valueClass: PropTypes.string,

  type: PropTypes.string,
  format: PropTypes.string,
};

export default FormatDate;
