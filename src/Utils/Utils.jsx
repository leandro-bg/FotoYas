import CryptoJS from "crypto-js";
import { Config } from "@Constant";

/**
 * Valida si una cadena de texto cumple con el formato de una dirección de correo electrónico.
 *
 * @param {string} email - La cadena de texto que se va a validar como dirección de correo electrónico.
 * @returns {boolean} - Devuelve true si la cadena cumple con el formato de correo electrónico, de lo contrario, devuelve false.
 *
 * @example
 * // Ejemplo de uso:
 * const esCorreoValido = validarEmail("usuario@dominio.com");
 * console.log(esCorreoValido); // Devolverá true
 *
 * @example
 * // Ejemplo de uso con cadena no válida:
 * const esCorreoValido = validarEmail("correoInvalido");
 * console.log(esCorreoValido); // Devolverá false
 */
export function validarEmail(email) {
  var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
}

export const validarFormatoFecha = (fecha) => {
  const formatoFecha = /^\d{2}\/\d{2}\/\d{4}$/; // Expresión regular para el formato DD/MM/YYYY

  if (!formatoFecha.test(fecha)) {
    return false; // La fecha no coincide con el formato esperado
  }

  const partesFecha = fecha.split("/");
  const dia = parseInt(partesFecha[0], 10);
  const mes = parseInt(partesFecha[1], 10);
  const anio = parseInt(partesFecha[2], 10);

  if (isNaN(dia) || isNaN(mes) || isNaN(anio)) {
    return false; // Al menos una parte de la fecha no es un número válido
  }

  // Verificar si el año es bisiesto (divisible por 4 y no divisible por 100, o divisible por 400)
  if ((anio % 4 === 0 && anio % 100 !== 0) || anio % 400 === 0) {
    const diasPorMes = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (mes < 1 || mes > 12 || dia < 1 || dia > diasPorMes[mes - 1]) {
      return false; // La fecha no es válida
    }
  } else {
    const diasPorMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (mes < 1 || mes > 12 || dia < 1 || dia > diasPorMes[mes - 1]) {
      return false; // La fecha no es válida
    }
  }

  // La fecha es válida
  return true;
};

export function autoFormatFecha(input) {
  // Eliminar todos los caracteres no numéricos
  const cleanedInput = input.replace(/\D/g, "");

  // Aplicar el formato dd/mm/yyyy
  let formattedInput = "";
  for (let i = 0; i < cleanedInput.length; i++) {
    if (i === 2 || i === 4) {
      formattedInput += "/";
    }
    formattedInput += cleanedInput[i];
  }

  return formattedInput;
}

export const validarFechayHora = (fecha) => {
  const fechaIngresada = new Date(fecha);
  const fechaActual = new Date();

  if (fechaIngresada < fechaActual) {
    return false;
  } else {
    return true;
  }
};

export const noContieneEspacios = (texto) => {
  return texto.includes(" ") ? false : true;
};

export const validarTexto = (texto) => {
  const regex = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]*$/;

  if (regex.test(texto)) {
    return true;
  } else {
    return false;
  }
};

export const validarNumerosYBarra = (texto) => {
  const regex = /^[0-9/]*$/;

  if (regex.test(texto)) {
    return true;
  } else {
    return false;
  }
};

export function validarCorreoElectronico(correo) {
  // Dividir la dirección de correo en parte local y dominio
  const partes = correo.split("@");

  if (partes.length !== 2) {
    return false; // Debe haber exactamente una "@" en el correo
  }

  const parteLocal = partes[0];
  const dominio = partes[1];

  // Expresión regular para validar la parte local
  const regexParteLocal = /^[a-zA-Z0-9._%+-]+$/;
  // Expresión regular para validar el dominio
  const regexDominio = /^[a-zA-Z0-9.-]+$/;

  if (regexParteLocal.test(parteLocal) && regexDominio.test(dominio)) {
    return true;
  } else {
    return false;
  }
}

export function validarCorreoInWrite(correo) {
  const regex = /^[a-zA-Z0-9.@\-_ñÑ]+$/;
  if (regex.test(correo)) {
    return true;
  } else {
    return false;
  }
}

export function validarSoloNumeros(numero) {
  const regex = /^[0-9]*$/;

  if (regex.test(numero)) {
    return true;
  } else {
    return false;
  }
}

export function validarNumeroSinEspacios(cadena) {
  // Eliminar espacios en blanco de la cadena
  cadena = cadena.replace(/\s/g, "");

  // Comprobar si la cadena contiene solo números y no supera los 15 dígitos
  if (/^\d{1,15}$/.test(cadena)) {
    return true; // La cadena cumple con los requisitos
  } else {
    return false; // La cadena no cumple con los requisitos
  }
}

export function capitalizarPalabra(cadena) {
  // Dividimos la cadena en palabras usando un espacio como separador
  var palabras = cadena.split(" ");

  // Iteramos sobre cada palabra y capitalizamos la primera letra
  for (var i = 0; i < palabras.length; i++) {
    palabras[i] = palabras[i][0].toUpperCase() + palabras[i].slice(1);
  }

  // Unimos las palabras nuevamente en una cadena y las retornamos
  return palabras.join(" ");
}

// Politics password validation

export function haveMayus(string) {
  return /[A-Z]/.test(string);
}

export function haveMinus(string) {
  return /[a-z]/.test(string);
}

export function haveNumber(string) {
  return /\d/.test(string);
}

export function specialCharacter(string) {
  const caracteresEspeciales = /[!@@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  return caracteresEspeciales.test(string);
}

export function minLength(string) {
  return string.length >= 8;
}

export function maxLength(string) {
  return string.length <= 15;
}

export function NoFinalSpecialChar(string) {
  const lastChar = string.charAt(string.length - 1);
  const caracteresEspeciales = /[!@@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  return !caracteresEspeciales.test(lastChar);
}

export function noSpaces(string) {
  return !/\s/.test(string);
}

export const validationMapper = {
  minus: haveMinus,
  mayus: haveMayus,
  num: haveNumber,
  esp: specialCharacter,
  minlen: minLength,
  maxlen: maxLength,
  fnl: NoFinalSpecialChar,
  spc: noSpaces,
};

const reconstructKey = (shuffledData) => {
  const order = shuffledData.yhs.split(",").map(Number);
  let sortedKeyParts = new Array(order.length);
  for (let i = 0; i < order.length; i++) {
    sortedKeyParts[order[i]] = shuffledData.xyz[i];
  }
  return sortedKeyParts.join("");
};
export const encryptInformation = (data) => {
  let dataCifred = JSON.stringify(data);
  if (Config.isProd) {
    const info = dataCifred;
    const metaKey = reconstructKey(Config.rxtz);
    dataCifred = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(info),
      metaKey
    ).toString();
  }
  return dataCifred;
};

export const decryptInformation = (data) => {
  let dataCifred = data;
  if (data != null) {
    if (Config.isProd) {
      const metaKey = reconstructKey(Config.rxtz);
      const tmpData = CryptoJS.AES.decrypt(data, metaKey);
      dataCifred = tmpData.toString(CryptoJS.enc.Utf8);
    }
  }
  let finalData = "";
  try {
    finalData = JSON.parse(dataCifred);
  } catch {
    finalData = dataCifred;
  }
  return finalData;
};

export function validarArchivo(file) {
  const maxSizeInBytes = 5 * 1024 * 1024; // Convertir 5MB a bytes
  return file.size <= maxSizeInBytes;
}

export function formsMaxLength(string, max) {
  return string.length <= max;
}

export function formsSavingMinMaxLength(string, minLength, maxLength) {
  return string.length > minLength && string.length <= maxLength;
}

export function formsSavingNumberMinMaxLength(number, minLength, maxLength) {
  return (
    /^\d+$/.test(number) &&
    number.length >= minLength &&
    number.length <= maxLength
  );
}

export function formsDateNotPastCurrent(dateString) {
  const currentDate = new Date();
  const inputDate = new Date(dateString);
  return inputDate >= currentDate;
}

export function formsValidarEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
export function dividirTitulo(titulo) {
  const palabras = titulo.split(" ");
  const medio = Math.ceil(palabras.length / 2);
  const primeraMitad = palabras.slice(0, medio);
  const segundaMitad = palabras.slice(medio);
  return [primeraMitad.join(" "), segundaMitad.join(" ")];
}

export const base64ToFile = (base64String, filename) => {
  // Dividir la cadena base64 en partes para separar el tipo de los datos
  const parts = base64String.split(";base64,");
  const imageType = parts[0].split(":")[1]; // Extrae el tipo de imagen
  const decodedData = window.atob(parts[1]); // Decodifica la cadena base64

  // Convertir los datos decodificados en un objeto Blob
  const uInt8Array = new Uint8Array(decodedData.length);
  for (let i = 0; i < decodedData.length; ++i) {
    uInt8Array[i] = decodedData.charCodeAt(i);
  }
  const blob = new Blob([uInt8Array], { type: imageType });

  // Crear y retornar un objeto File a partir del Blob
  return new File([blob], filename, { type: imageType });
};

export const RegexValidator = {
  onlyNumber: /^[0-9]+$/,
  onlyLetter: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
  onlyLetterWithoudAsent: /^[a-zA-Z\s]+$/,
  onlyLetterNumber: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]+$/,
  onlyLetterNumberSpace: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s0-9]+$/,
  onlyLetterNumberSpaceDash: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s0-9\-]+$/,
  onlyLetterNumberSpaceDashDot: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s0-9\-\.]+$/,
  onlyLetterNumberSpaceDashDotDot: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s0-9\-\.]+$/,
  onlyLetterNumberSpaceDashDotDotDot: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s0-9\-\.]+$/,
  onlyLetterSpace: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
  validateEmailStructure: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  onlyUseForPassword: /^[^\s]+$/u,
};

export const ValidationsService = (value, key, mapperValidations) => {
  const validation = mapperValidations[key];
  if (!validation) {
    return value;
  }

  if (value == "") {
    return "empty";
  }
  if (validation.maxLength && value.length > validation.maxLength) {
    return "";
  }
  if (validation.minLength && value.length < validation.minLength) {
    return "underMin";
  }
  if (!validation.inWriting) {
    return value;
  }
  if (validation.pattern) {
    if (validation.pattern.test(value)) {
      return value;
    } else {
      return "";
    }
  }
  return value;
};

export const ValidationsServiceButton = (value, key, mapperValidations) => {
  const validation = mapperValidations[key];
  if (key === "paramParticipant") {
    for (const param in value.order) {
      if (
        param.startsWith("filler") &&
        value.order[param].isShow &&
        value[param].custom === ""
      ) {
        return param;
      }
    }
  }
  if (!validation) {
    return "Not validated";
  }

  if (
    value == "" &&
    key !== "sms" &&
    key !== "email" &&
    key !== "virtual" &&
    key !== "presencial"
  ) {
    return "bad";
  }
  if (validation.maxLength && value.length > validation.maxLength) {
    return "max";
  }
  if (validation.minLength && value.length < validation.minLength) {
    return "min";
  }
  if (!validation.inWriting) {
    return value;
  }
  if (validation.pattern) {
    if (validation.pattern.test(value)) {
      return value;
    } else {
      return "";
    }
  }
  return "good";
};

export function validateHttpStatus(code) {
  // Verifica si el código está dentro del rango de respuestas exitosas
  if (code >= 200 && code <= 299) {
    return true; // Código de respuesta exitoso
  } else {
    // Lanza un error si el código de respuesta no es exitoso
    return false;
  }
}

export function unifyStrings(name, lastName) {
  // Separar los strings por espacios
  const array1 = name.split(" ");
  const array2 = lastName.split(" ");

  // Unificar los arrays con un espacio entre ellos
  const unifiedArray = [];

  for (let i = 0; i < Math.max(array1.length, array2.length); i++) {
    if (i < array1.length) {
      unifiedArray.push(array1[i]);
    }
    if (i < array2.length) {
      unifiedArray.push(array2[i]);
    }
  }

  // Unir los elementos del array resultante con espacios
  return unifiedArray.join(" ");
}