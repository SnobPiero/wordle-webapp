import { useState, useEffect, useMemo, useCallback, Suspense } from "react";
import PropTypes from "prop-types";
import { useController } from "react-hook-form";
import dynamic from "next/dynamic";
import indexOf from "lodash/indexOf";
import debounce from "lodash/debounce";

import Field from "@/components/form/Field";

import { SelectOption } from "@/utils/form-select";

const Select = (props) => {
  const {
    name,
    control,
    required = false,
    disabled = false,
    placeholder = null,
    size = null,
    inputClass = "",

    options = [],
    defaultValue = null,
    clearable = false,
    searchable = false,

    multi = false,
    async = false,
    fetch = null,
    asyncTime = 200,
    asyncMinChar = 1,
    creatable = false,
    onCreate = null,
    components = null,

    change = null,
    blur = null,
    focus = null,
  } = props;

  const [internalOptions, setInternalOptions] = useState(options);

  const [internalDisabled, setInternalDisabled] = useState(disabled);

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
    defaultValue: defaultValue,
  });

  const DynamicSelect = useMemo(() => {
    return dynamic(
      () => {
        if (async && !creatable) {
          return import("react-select/async");
        }
        if (!async && creatable) {
          return import("react-select/creatable");
        }
        if (async && creatable) {
          return import("react-select/async-creatable");
        }
        return import("react-select");
      },
      {
        suspense: true,
        // ssr: false,
      },
    );
  }, [async, creatable]);

  useEffect(() => {
    if (!async) {
      setInternalOptions(options);
    }
  }, [options, async]);

  const loadOptions = useCallback(
    (inputValue, callback) => {
      const searchValue = inputValue.trim();
      if (searchValue.length < asyncMinChar) {
        return callback([]);
      }
      fetch(searchValue).then((options) => callback(options));
      //! https://github.com/JedWatson/react-select/issues/3075#issuecomment-506647171
      return;
    },
    [fetch, asyncMinChar],
  );

  const handleCreate = async (inputValue) => {
    // NOTA: onCreateOption non scatena onChange
    setInternalDisabled(true);

    // se non si aggiunge una option temporanea "internal_creating", mentre si risolve la promise di creazione
    //  viene visualizzato il precedente valore selezionato.
    setInternalOptions([{ value: "internal_creating", label: "creating" }]);
    // onChange serve perchè cambia il valore su react-hook-form, e seleziona la option "internal_creating" sopra creata
    if (!multi) {
      onChange("internal_creating");
    } else {
      onChange(["internal_creating"]);
    }

    const newOption = await onCreate(inputValue.trim());
    if (!multi) {
      onChange(newOption.value);
    } else {
      onChange([...value, newOption.value]);
    }
    setInternalOptions([...internalOptions, newOption]);
    setInternalDisabled(disabled);
  };

  const selectedValue = useMemo(() => {
    return (
      internalOptions &&
      internalOptions.filter((o) => {
        if (multi) {
          return indexOf(value, o.value) > -1;
        }
        return o.value === value;
      })
    );
  }, [internalOptions, value, multi]);

  const isSearchable = useMemo(() => {
    return searchable || async || creatable;
  }, [searchable, async, creatable]);

  const customComponents = useMemo(() => {
    return isSearchable
      ? {
          Option: SelectOption,
          ...components,
        }
      : null;
  }, [isSearchable, components]);

  const isValidNewOption = useCallback((inputValue) => inputValue.trim().length > 0, []);

  const noOptionsMessage = useCallback(
    ({ inputValue }) =>
      inputValue === ""
        ? "Cerca"
        : async && inputValue.trim().length < asyncMinChar
          ? `minimo ${asyncMinChar} caratteri`
          : "nessuna opzione",
    [async, asyncMinChar],
  );

  const loadingMessage = useCallback(() => "caricamento...", []);

  const formatCreateLabel = useCallback((inputValue) => `$"create" "${inputValue.trim()}"`, []);

  const className = useMemo(() => {
    const cls = ["react-select-container"];
    if (size) {
      cls.push(size);
    }
    if (inputClass) {
      cls.push(inputClass);
    }
    return cls.join(" ");
  }, [size, inputClass]);

  return (
    <Field {...props} error={error}>
      <Suspense fallback={null}>
        <DynamicSelect
          {...rest}
          id={name}
          instanceId={name}
          inputRef={ref}
          options={internalOptions}
          value={selectedValue}
          className={className}
          classNamePrefix="react-select"
          isDisabled={internalDisabled}
          placeholder={placeholder}
          onChange={(selected) => {
            // selected => { value: x, label: y } OR null
            // if multi: selected => [{ value: x, label: y }] OR null

            if (async) {
              // se async, salvo l'option selected
              if (!multi) {
                setInternalOptions(selected ? [selected] : []);
              } else {
                setInternalOptions(selected);
              }
            }

            let value = null;
            let label = null;
            if (!multi) {
              value = selected?.value || null;
              label = selected?.label || null;
            } else {
              value = selected.map((s) => s.value);
              label = selected.map((s) => s.label);
            }

            onChange(value);
            change && change(value, label);
          }}
          onBlur={() => {
            blur && blur();
          }}
          onFocus={() => {
            focus && focus();
          }}
          isClearable={clearable}
          isSearchable={isSearchable}
          isMulti={multi}
          closeMenuOnSelect={!multi}
          menuPlacement="auto"
          cacheOptions
          defaultOptions={[]} // defaultOptions=true: esegue loadOptions da subito con inputValue=''
          loadOptions={debounce(loadOptions, asyncTime)}
          onCreateOption={handleCreate}
          isValidNewOption={isValidNewOption}
          components={customComponents}
          noOptionsMessage={noOptionsMessage}
          loadingMessage={loadingMessage}
          formatCreateLabel={formatCreateLabel}
        />
      </Suspense>
    </Field>
  );
};

Select.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  control: PropTypes.object,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  inputClass: PropTypes.string,
  labelClass: PropTypes.string,
  tooltipTitle: PropTypes.string,
  tooltipText: PropTypes.string,
  helpText: PropTypes.string,

  options: PropTypes.array,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  clearable: PropTypes.bool,
  searchable: PropTypes.bool,
  multi: PropTypes.bool,
  async: PropTypes.bool,
  fetch: PropTypes.func,
  asyncTime: PropTypes.number,
  asyncMinChar: PropTypes.number,
  creatable: PropTypes.bool,
  onCreate: PropTypes.func,
  components: PropTypes.object,

  change: PropTypes.func,
  blur: PropTypes.func,
  focus: PropTypes.func,
};

export default Select;
