import PropTypes from "prop-types";

import Header from "@/components/project/Header";
import Footer from "@/components/project/Footer";

const InternalLayout = ({ children, headerTitle, helpTitleText }) => {
  return (
    <div className="flex flex-col min-h-screen bg-body-bg !text-body-text">
      <Header headerTitle={headerTitle} helpTitleText={helpTitleText} />
      {children}
      <Footer />
    </div>
  );
};

InternalLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  headerTitle: PropTypes.string,
  helpTitleText: PropTypes.string,
};

export default InternalLayout;
