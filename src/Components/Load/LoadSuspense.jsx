import { Spinner } from "@nextui-org/react";
import React from "react";
import PropTypes from "prop-types";

const LoadSuspense = ({ text = "Cargando componente..." }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full flex items-center justify-center gap-4">
        <Spinner size="md" />
        <p className="font-light">{text}</p>
      </div>
    </div>
  );
};

LoadSuspense.propTypes = {
  text: PropTypes.string,
};

export default LoadSuspense;
