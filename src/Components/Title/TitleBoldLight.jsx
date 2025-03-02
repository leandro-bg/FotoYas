import React from "react";
import PropTypes from "prop-types";

const TitleBoldLight = ({
  children,
  header = "h2",
  className = "",
  withSpace = true,
}) => {
  // Code logic here
  const validHeaders = ["h1", "h2", "h3", "h4", "h5", "h6"];

  if (typeof children != "string") {
    console.error(
      `El children proporcionado '${children}' no es válido. Debe ser un string.`
    );
    return null;
  }

  if (!validHeaders.includes(header)) {
    console.error(
      `El header proporcionado '${header}' no es válido. Debe ser uno de ${validHeaders.join(
        ", "
      )}.`
    );
    return null;
  }

  const dividirTitulo = (titulo) => {
    const palabras = titulo.split(" ");
    const medio = Math.ceil(palabras.length / 2);
    const primeraMitad = palabras.slice(0, medio);
    const segundaMitad = palabras.slice(medio);
    return [primeraMitad.join(" "), segundaMitad.join(" ")];
  };

  const TilteHeader = header;

  return (
    <TilteHeader className={`text-2xl font-normal ${className}`}>
      {dividirTitulo(children)[0]}
      {withSpace && " "}
      <span className="font-bold">{dividirTitulo(children)[1]}</span>
    </TilteHeader>
  );
};

TitleBoldLight.propTypes = {
  header: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  withSpace: PropTypes.bool,
};

export default TitleBoldLight;