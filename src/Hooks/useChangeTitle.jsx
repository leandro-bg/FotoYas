import { capitalizarPalabra } from "@Utils";

const ChangeTitleHook = () => {
  const changeTitle = (newTitle) => {
    const title =
      extraerRutaActual(newTitle) == ""
        ? "Inicio"
        : extraerRutaActual(newTitle);
    const lastTitle = document.title.split("|");
    let titleFinal = title;
    if (title.includes("-")) {
      const tmpTitle = title.split("-");
      let tmpString = "";
      tmpTitle.forEach((word, index) => {
        if (index == tmpTitle.length - 1) {
          tmpString += `${capitalizarPalabra(word)}`;
        } else {
          tmpString += `${capitalizarPalabra(word)} `;
        }
      });
      titleFinal = tmpString;
    }
    document.title = `${titleFinal} | ${lastTitle[1]}`;
  };

  function extraerRutaActual(obj) {
    const partes = obj.pathname.split("/").filter((part) => part !== "");

    if (
      partes.length > 1 &&
      /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(
        partes[partes.length - 1]
      )
    ) {
      return partes[partes.length - 2];
    }

    return partes[partes.length - 1] || "";
  }

  return { changeTitle };
};

export default ChangeTitleHook;
