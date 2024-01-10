import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";

const Panel = forwardRef(
  ({ title = null, openable = false, opened = true, leftActions = null, rightActions = null, children }, ref) => {
    const [isOpened, setIsOpened] = useState(opened);

    useImperativeHandle(ref, () => ({
      close: () => {
        return setIsOpened(false);
      },
      open: () => {
        return setIsOpened(true);
      },
    }));

    return (
      <div className="panel">
        {(title || openable) && (
          <>
            <div className="header">
              <div className="actions">
                {title && <div className="title">{title}</div>}
                {leftActions &&
                  leftActions.length > 0 &&
                  leftActions.map((action, i) => {
                    return (
                      <div className="action" key={i}>
                        {action}
                      </div>
                    );
                  })}
              </div>
              <div className="actions">
                {rightActions &&
                  rightActions.length > 0 &&
                  rightActions.map((action, i) => {
                    return (
                      <div className="action" key={i}>
                        {action}
                      </div>
                    );
                  })}
                {openable && (
                  <div className="openable" onClick={() => setIsOpened(!isOpened)}>
                    {isOpened && <HiOutlineChevronUp />}
                    {!isOpened && <HiOutlineChevronDown />}
                  </div>
                )}
              </div>
            </div>
            <hr className="mb-4" />
          </>
        )}
        {isOpened && children}
      </div>
    );
  },
);
Panel.displayName = "Panel";
Panel.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.element]),
  openable: PropTypes.bool,
  opened: PropTypes.bool,
  leftActions: PropTypes.array,
  rightActions: PropTypes.array,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

export default Panel;
