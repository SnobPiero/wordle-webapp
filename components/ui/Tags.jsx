import PropTypes from "prop-types";

const Tags = ({ children, size = null }) => {
  return <div className={`tags ${size || ""}`}>{children}</div>;
};

Tags.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  size: PropTypes.string,
};

export default Tags;
