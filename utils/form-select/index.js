import { useMemo } from "react";
import PropTypes from "prop-types";
import { components } from "react-select";
import escapeRegExp from "lodash/escapeRegExp";

import Tags from "@/components/ui/Tags";
import Tag from "@/components/ui/Tag";

const SelectOption = (props) => {
  const {
    label,
    data: { __isNew__ = null },
    selectProps: { inputValue },
    extend = null,
  } = props;

  return (
    <components.Option {...props}>
      <div className="option-container">
        <div className="label">
          <Highlight text={label} search={__isNew__ ? "" : inputValue} />
        </div>
        {extend}
      </div>
    </components.Option>
  );
};

SelectOption.propTypes = {
  label: PropTypes.string,
  data: PropTypes.object,
  selectProps: PropTypes.object,
  extend: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.array]),
};

const OptionWithTags = (props) => {
  const {
    data,
    selectProps: { inputValue },
  } = props;

  return (
    <SelectOption
      {...props}
      extend={
        <Tags size="small">
          {data?.tagSuppliers?.map(({ idTag, name }) => {
            return (
              <Tag key={idTag}>
                <Highlight text={name} search={inputValue} />
              </Tag>
            );
          })}
        </Tags>
      }
    ></SelectOption>
  );
};

OptionWithTags.propTypes = {
  selectProps: PropTypes.object,
  data: PropTypes.object,
};

const Highlight = ({ text, search }) => {
  const highlightedText = useMemo(() => {
    if (!search.trim()) {
      return text;
    }
    // eslint-disable-next-line security/detect-non-literal-regexp
    const regex = new RegExp(`(${escapeRegExp(search)})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span className="highlight" key={i}>
          {part}
        </span>
      ) : (
        part
      ),
    );
  }, [text, search]);

  return highlightedText;
};

export { OptionWithTags, SelectOption };
