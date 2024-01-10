import PropTypes from "prop-types";
import { useController } from "react-hook-form";
import { NumericFormat } from "react-number-format";

import { it } from "date-fns/locale";

import Field from "@/components/form/Field";

const Number = (props) => {
  const {
    name,
    control,
    required = false,
    disabled = false,
    placeholder = "",
    inputClass = "",

    min = null,
    max = null,
    decimal = 10,
    // shiftDecimal = undefined,
    forceDecimal = null,
    maxlength = null,

    change = null,
    blur = null,
    focus = null,
  } = props;

  // https://react-hook-form.com/api/usecontroller
  const {
    field: { value, onChange, ref, ...rest },
    fieldState: {
      // invalid,
      // isTouched,
      // isDirty,
      error,
    },
  } = useController({
    name,
    control,
    rules: { required },
    defaultValue: null,
  });

  const currentLocale = it;

  // default it/fr
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
    <Field {...props} error={error}>
      <NumericFormat
        {...rest}
        type="text"
        className={`form-control ${inputClass}`}
        displayType="input"
        value={value}
        getInputRef={ref}
        disabled={disabled}
        placeholder={placeholder}
        thousandSeparator={false}
        decimalSeparator={decimalSeparator}
        allowNegative={true}
        allowLeadingZeros={false}
        valueIsNumericString={true}
        decimalScale={decimal}
        fixedDecimalScale={forceDecimal}
        maxLength={~~maxlength || null}
        onValueChange={(target) => {
          const formattedNumber = isNaN(target.floatValue) ? null : target.floatValue;
          onChange(formattedNumber);
          change && change(formattedNumber);
        }}
        onBlur={(e) => {
          let value = e.target.value;

          //* NOTE:
          // it: 1234,56 -> 1234.56
          // en: 1234.56 -> 1234.56
          value = value.replaceAll(decimalSeparator, ".");

          value = parseFloat(value);
          value = min ? Math.max(value, min) : value;
          value = max ? Math.min(value, max) : value;
          const formattedNumber = isNaN(value) ? null : value;
          onChange(formattedNumber);
          blur && blur(formattedNumber);
        }}
        onFocus={(e) => {
          const value = e.target.value;
          focus && focus(value);
        }}
      />
    </Field>
  );
};

Number.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  control: PropTypes.object,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  inputClass: PropTypes.string,
  labelClass: PropTypes.string,
  tooltipTitle: PropTypes.string,
  tooltipText: PropTypes.string,
  helpText: PropTypes.string,

  min: PropTypes.number,
  max: PropTypes.number,
  decimal: PropTypes.number,
  forceDecimal: PropTypes.bool,
  maxlength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  change: PropTypes.func,
  blur: PropTypes.func,
  focus: PropTypes.func,
};

export default Number;
