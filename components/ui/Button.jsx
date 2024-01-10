import PropTypes from "prop-types";

import { RiLoader4Fill } from "react-icons/ri";

const Button = ({
  children,
  type = "button",
  level = null,
  xsmall = null,
  small = null,
  large = null,
  pillar = false,
  outline = null,
  disabled = false,
  loading = false,
  icon = null,
  iconRight = false,
  block = false,
  onClick = null,
  className = null,
  style = null,
}) => {
  const cls = ["button"];
  if (level) {
    cls.push(level);
  }
  if (xsmall) {
    cls.push("xsmall");
  }
  if (small) {
    cls.push("small");
  }
  if (large) {
    cls.push("large");
  }
  if (pillar) {
    cls.push("pillar");
  }
  if (outline) {
    cls.push("outline");
  }
  if (block) {
    cls.push("block");
  }
  if (loading) {
    cls.push("loading");
    disabled = true;
  }
  if (className) {
    cls.push(className);
  }

  const Icon = icon;

  return (
    <button type={type} className={cls.join(" ")} style={style} disabled={disabled} onClick={(e) => onClick && onClick(e)}>
      {Icon && !iconRight && !loading && <Icon />}
      {Icon && !iconRight && loading && <RiLoader4Fill className="animate-spin" />}
      <span>{children}</span>
      {Icon && iconRight && !loading && <Icon />}
      {Icon && iconRight && loading && <RiLoader4Fill className="animate-spin" />}
      {!Icon && loading && (
        <div className="pins">
          <div className="pin-move"></div>
          <div className="pin"></div>
          <div className="pin"></div>
          <div className="pin"></div>
          <div className="pin"></div>
        </div>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.element]),
  type: PropTypes.string,
  level: PropTypes.string,
  xsmall: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  pillar: PropTypes.bool,
  outline: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.func,
  iconRight: PropTypes.bool,
  block: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Button;
