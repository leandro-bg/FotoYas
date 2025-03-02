import fs from "fs-extra";
import { fileURLToPath } from "url";
import path, { dirname, resolve } from "path";
import CryptoJS from "crypto-js";
import Config from "../Constant/Config.json" with { type: "json" };
import Params from "../Constant/Params.json" with { type: "json" };
import Key from "../Constant/Key.json" with { type: "json" };
import Routes from "../Constant/Routes.json" with { type: "json" };
const args = process.argv.slice(2);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const baseRute = resolve(__dirname, "..");
const configFilePath = path.resolve(baseRute, "../vite.config.js");
import prettier from "prettier";

const devConfig = `server: {
    host: '0.0.0.0',
    port: 3000,
    hmr: {
      host: 'localhost',
    },
  },
`;


const reconstructKey = (shuffledData) => {
  const order = shuffledData.yhs.split(",").map(Number);
  let sortedKeyParts = new Array(order.length);
  for (let i = 0; i < order.length; i++) {
    sortedKeyParts[order[i]] = shuffledData.xyz[i];
  }
  return sortedKeyParts.join("");
};

const encryptInformation = (data) => {
  let dataCifred = JSON.stringify(data);
  if (Params.Encripted[args[0]]) {
    const info = dataCifred;
    const metaKey = reconstructKey(Key.secretKey);
    dataCifred = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(info),
      metaKey
    ).toString();
  }
  return dataCifred;
};

const transformarJSON = (objeto, funcion) => {
  if (typeof objeto === "object" && objeto !== null) {
    for (let clave in objeto) {
      if (typeof objeto[clave] === "object" && objeto[clave] !== null) {
        transformarJSON(objeto[clave], funcion);
      } else {
        objeto[clave] = funcion(objeto[clave]);
      }
    }
  }
  return objeto;
};

async function modifyViteConfig(mode) {
  // Leer el archivo de configuración
  let configFileContent = fs.readFileSync(configFilePath, "utf8");

  if (mode === "dev") {
    if (!configFileContent.includes("server: {")) {
      if (configFileContent.includes("build: {")) {
        configFileContent = configFileContent.replace(
          /(\bbuild:\s*\{)/,
          `${devConfig}$1`
        );
      } else {
        configFileContent += `\n${devConfig}`;
      }
    }
  } else if (mode === "prod") {
    const serverPattern = /(\s*server:\s*\{[\s\S]*?\})[\s\S]*?(\s*build:\s*\{)/;
    if (serverPattern.test(configFileContent)) {
      configFileContent = configFileContent.replace(serverPattern, "$2");
    }

    configFileContent = configFileContent.replace(
      /,\s*build:\s*\{/,
      "\n,build: {"
    );
  } else {
    throw new Error('El parámetro debe ser "dev" o "prod".');
  }
  const formattedContent = await prettier.format(configFileContent, {
    parser: "babel",
  });

  fs.writeFileSync(configFilePath, formattedContent, "utf8");
}
const tmpObject = { ...Config };
if (args[0] == "Local") {
  tmpObject.isProd = Params.Encripted.Local;
  tmpObject.Api = encryptInformation(Params.Apis.Local);
  tmpObject.Routes = transformarJSON(Routes.Routes, encryptInformation);
  await modifyViteConfig("dev");
}

if (args[0] == "Dev") {
  tmpObject.isProd = Params.Encripted.Dev;
  tmpObject.Api = encryptInformation(Params.Apis.Dev);
  tmpObject.Routes = transformarJSON(Routes.Routes, encryptInformation);
  await modifyViteConfig("dev");
}

if (args[0] == "Prod") {
  tmpObject.isProd = Params.Encripted.Prod;
  tmpObject.Api = encryptInformation(Params.Apis.Prod);
  tmpObject.Routes = transformarJSON(Routes.Routes, encryptInformation);
  await modifyViteConfig("prod");
}

tmpObject.rxtz = { ...Key.secretKey };
tmpObject.nzxtz = Params.MinutesJWT;

const newConfig = JSON.stringify(tmpObject);
fs.writeFileSync(`${baseRute}/Constant/Config.json`, newConfig);