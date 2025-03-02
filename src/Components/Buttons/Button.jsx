import React from "react";
import PropTypes from "prop-types";
import { TitleBoldLight } from "@Components";
import * as OutlineIcon from "@heroicons/react/24/outline";
import * as SolidIcon from "@heroicons/react/24/solid";
import { Spinner } from "@nextui-org/spinner";

const Button = ({
  children,
  onClick = () => {},
  type = "submit",
  color = "default",
  variant = "default",
  textCustom = false,
  icon = "none",
  iconVariant = "outline",
  showIcon = false,
  strokeWidth = 1,
  className = "",
  loading = false,
}) => {
  let Icon = "";
  let Color = "";
  if (iconVariant == "outline" && showIcon) {
    Icon = OutlineIcon[icon];
  }
  if (iconVariant == "solid" && showIcon) {
    Icon = SolidIcon[icon];
  }
  if (typeof children != "string" && !textCustom) {
    return (
      <button
        onClick={onClick}
        type={type}
        className={`w-full text-base rounded-md py-2 flex items-center justify-center gap-2 ${className}`}
        style={{
          backgroundColor: variant == "default" ? Color : "transparent",
          border:
            variant == "default" ? "none" : `${strokeWidth}px solid ${Color}`,
          color: variant == "default" ? "white" : Color,
        }}
      >
        {children}
      </button>
    );
  }
  if (typeof children != "string" && textCustom) {
    console.log(
      "El texto custom solo acepta un children de tipo string, no nodos html"
    );
    return null;
  }
  if (icon == "none" && showIcon) {
    console.error("El icono no puede ser 'none' si showIcon es true");
    return null;
  }
  if (color == "default") {
    Color = "var(--color-pink-3)";
  }
  if (color == "dark") {
    Color = "var(--color-gray-3)";
  }

  return (
    <button
      className={`w-full text-base rounded-md py-2 flex items-center justify-center gap-2 ${className}`}
      onClick={onClick}
      type={type}
      style={{
        backgroundColor: variant == "default" ? Color : "transparent",
        border:
          variant == "default" ? "none" : `${strokeWidth}px solid ${Color}`,
        color: variant == "default" ? "white" : Color,
      }}
    >
      {children.split(" ").length > 1 ? (
        <>
          <TitleBoldLight className={`text-base`}>{children}</TitleBoldLight>
          {showIcon && !loading && (
            <Icon
              strokeWidth={1.5}
              className={`w-5 h-5 ${
                variant == "default" ? "text-white" : "text-pink-1"
              }`}
            />
          )}
          {showIcon && loading && <Spinner size="sm" />}
        </>
      ) : (
        <>
          {children}
          {showIcon && !loading && (
            <Icon
              strokeWidth={1.5}
              className={`w-5 h-5 ${
                variant == "default" ? "text-white" : "text-pink-1"
              }`}
            />
          )}
          {showIcon && loading && <Spinner size="sm" />}
        </>
      )}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.string,
  textCustom: PropTypes.bool,
  icon: PropTypes.string,
  iconVariant: PropTypes.string,
  showIcon: PropTypes.bool,
  color: PropTypes.string,
  className: PropTypes.string,
  strokeWidth: PropTypes.number,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  children: PropTypes.node,
  type: PropTypes.string,
};

export default Button;
