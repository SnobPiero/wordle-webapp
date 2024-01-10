import PropTypes from "prop-types";

const Container = ({ children }) => {
  return <div className="page-container">{children}</div>;
};

Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

export default Container;
