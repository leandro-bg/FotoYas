import Cookies from "js-cookie";
import { decryptInformation } from "@Utils";
import { AxiosRequest } from "./ApiRemote";
import { Config } from "@Constant";
// import { getToken } from "./getToken";

const requestClass = new AxiosRequest(
  decryptInformation(Config.Api),
  Config.isProd
);

const endPoint = Config.Routes;

/***
 * @function requestHttp
 * @description Metodo para lanzar la petición contra gateway
 * @param {datos} datos - Aqui envias el objeto que quieres que el backend reciba
 * @param {config} config - La configuración de la gateway se basa en un punto de entrada "base" (Servidor destino), enpoint de destino "entry" (Endpoint de destino) y el verbo http a utilizar
 ***/

const RequestHttp = async (datos, { base, entry, method, id = "none" }) => {
  try {
    const token = decryptInformation(Cookies.get("tk"));
    if (token != undefined) {
      requestClass.setAuthToken(token);
    }
    let dataSend = Object.keys(datos).length > 0 ? { ...datos } : {};
    let endPointFinal =
      id != "none"
        ? `${decryptInformation(endPoint[base][entry])}${id}`
        : `${decryptInformation(endPoint[base][entry])}`;
    const data = await requestClass.ExecutePetition(
      endPointFinal,
      method,
      dataSend
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export { RequestHttp };
