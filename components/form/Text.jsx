import PropTypes from "prop-types";
import { useController } from "react-hook-form";

import Field from "@/components/form/Field";

const Text = (props) => {
  const {
    name,
    control,
    required = false,
    disabled = false,
    placeholder = "",
    inputClass = "",
    // autocomplete = true,
    // disablePaste = false,
    // preventEnterSubmit = false,

    maxlength = null,
    autocomplete = false,
    icon = null,

    change = null,
    blur = null,
    focus = null,
    keyUp = null,
    keyDown = null,
    mouseDown = null,
  } = props;

  // https://react-hook-form.com/api/usecontroller
  const {
    field: { onChange, ref, ...rest },
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
    defaultValue: "",
  });

  return (
    <Field {...props} error={error}>
      {icon && (
        <div
          className="icon"
          onClick={() => {
            control._fields[name]._f.ref.focus();
          }}
        >
          {icon}
        </div>
      )}
      <input
        {...rest}
        id={name}
        ref={ref}
        type="text"
        className={`form-control ${inputClass}`}
        disabled={disabled}
        placeholder={placeholder}
        // https://stackoverflow.com/questions/12862624/whats-the-fastest-way-to-convert-string-to-number-in-javascript
        maxLength={~~maxlength || null}
        autoComplete={autocomplete ? "on" : "off"}
        onChange={(e) => {
          const value = e.target.value;
          onChange(value);
          change && change(value);
        }}
        onBlur={(e) => {
          const value = e.target.value;
          onChange(value);
          blur && blur(value);
        }}
        onFocus={(e) => {
          const value = e.target.value;
          focus && focus(value);
        }}
        onKeyUp={(e) => {
          keyUp && keyUp(e);
        }}
        onKeyDown={(e) => {
          keyDown && keyDown(e);
        }}
        onMouseDown={(e) => {
          mouseDown && mouseDown(e);
        }}
      />
    </Field>
  );
};

Text.propTypes = {
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

  maxlength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  autocomplete: PropTypes.bool,
  icon: PropTypes.element,

  change: PropTypes.func,
  blur: PropTypes.func,
  focus: PropTypes.func,
  keyUp: PropTypes.func,
  keyDown: PropTypes.func,
  mouseDown: PropTypes.func,
};

export default Text;
