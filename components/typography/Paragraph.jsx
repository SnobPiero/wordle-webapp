import PropTypes from "prop-types";

const Paragraph = ({ className = "", children }) => {
  return <p className={`paragraph ${className}`}>{children}</p>;
};

Paragraph.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.array]),
};

export default Paragraph;
