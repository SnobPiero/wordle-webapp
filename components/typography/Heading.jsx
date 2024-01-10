import PropTypes from "prop-types";

const Heading = ({ size = 1, fitDown = false, className = "", children }) => {
  size = size < 1 ? 1 : size;
  size = size > 6 ? 6 : size;

  const HeadingComponent = `h${size}`;
  return <HeadingComponent className={`${fitDown ? "fit-down" : ""} ${className}`}>{children}</HeadingComponent>;
};

Heading.propTypes = {
  size: PropTypes.number,
  fitDown: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.array]),
};

export default Heading;
