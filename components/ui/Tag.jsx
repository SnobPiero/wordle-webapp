import PropTypes from "prop-types";

import { IoPricetag } from "react-icons/io5";

const Tag = ({ children }) => {
  return (
    <div className="tag">
      <IoPricetag />
      {children}
    </div>
  );
};

Tag.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.string]),
};

export default Tag;
