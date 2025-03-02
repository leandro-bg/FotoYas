# Documentación del Aplicativo

En primera instancia vamos a explicar como funciona el aplicativo al momento de utilizarlo:

Debemos clonarlos el proyecto de la siguiente manera

```
git clone https://github.com/leandro-bg/FotoYas.git
```

una vez tengamos el repositorio clonado en la ruta de nuestra preferencia explicaremos para que sirve los scripts que encontramos en el <strong>package.json</strong>

Scripts:

- "dev": "node ./src/Build/configBuild.js dev && vite"
- "prod": "node ./src/build/configBuild.js prod && vite"
- "build": "node ./src/Build/configBuild.js dev && vite build"

Si nos podemos dar cuenta todos estos scripts están ejecutando un configBuild.js el cual es nuestro archivo de construcción para que nuestro poryecto utilize la configuración bien sea de desarrollo o de producción esta parametrización se realiza mediante un archivo de configuración <strong>Params.json</strong> que lo podemos encontrar en la siguiente ruta:

```
yourSystemPath/src/Constante/Params.json
```

Aquí encontraremos tanto Params.json como Config.json nunca debemos tocar el Config.json porque es un archivo que se contruye con base a lo que parametricemos en el Params.json y no nos debemos preocupar por la seguridad puesto que no exponemos directamente en el ofuscado el archivo Params.json como tampoco el configBuild.json

## Proceso para crear parametrizaciones y agragarlas a nuestro Config.json

en el params encontraras una estructura JSON la cual podras modificar a tu antojo pero debes tener en cuenta que al momento de ejecutar el script no rompas nada.

### Ejemplo:

Estructura básica de nuestro Params.json:

```json
{
  "Apis": {
    "Dev": "Api de desarrollo",
    "Prod": "Api de producción"
  }
}
```

Estructura de nuestro script configBuild.js:

```js
import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import Config from "../Constant/Config.json" assert { type: "json" };
import Params from "../Constant/Params.json" assert { type: "json" };
const args = process.argv.slice(2);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const baseRute = resolve(__dirname, "..");

const tmpObject = { ...Config };
if (args[0] == "dev") {
  tmpObject.isProd = false;
  tmpObject.Api = Params.Apis.Dev;
} else {
  tmpObject.isProd = true;
  tmpObject.Api = Params.Apis.Prod;
}

const newConfig = JSON.stringify(tmpObject);
fs.writeFileSync(`${baseRute}/Constant/Config.json`, newConfig);
```

Como podemos ver nuesto script se rige bajo un if y un else donde valida si está en dev o en prod no nos debemos preocupar de como funcionan las importaciones ni tampoco como funcionan las constantes que tenemos en este fragmento de código, solo nos debemos preocupara en configurar bien lo que tenemos dentro del if else, por ejemplo vamos a crear una nueva llave de encriptación para para guardar datos en el localStorage, primero debemos configurar nuestro Params. json de la siguiente manera:

```json
{
  "Apis": {
    "Dev": "Api de desarrollo",
    "Prod": "Api de producción"
  },
  "Key": {
    "Dev": "Key dev",
    "Prod": "Key prod"
  }
}
```

una vez definidas nuestras llaves que vamos a ingresar, procedemos a configurar nuestro script de la siguiente manera:

```js
if (args[0] == "dev") {
  tmpObject.isProd = false;
  tmpObject.Api = Params.Apis.Dev;
  tmpObject.Key = Params.Key.Dev;
} else {
  tmpObject.isProd = true;
  tmpObject.Api = Params.Apis.Prod;
  tmpObject.Key = Params.Key.Prod;
}
```

Con estos pequeños cambios acabamos de agregar nuestras variables a nuestro sistema, y cuando ejecutemos bien sea npm run [dev, prod, build] tomará el script está configuración y la definirá en el Config.json

#### ¡¡¡OJO Y MUY IMPORTANTE, TODA NUESTRA APLICACIÓN DEBE SER DEPENDIENTE DEL CONFIG.JSON, JAMAS DEBE UTILIZAR PARA IMPORTACIONES A PARAMS.JSON PUESTO QUE ESTE ARCHIVO JAMAS SE AGREGA AL COMPILADO!!!

## Crear alias y rutas dinamicas en el aplicativo

Si bien en cierto que podemos realizar importaciones mediante rutas estaticas, vite nos provee herramientas para crear rutas dinamicas dentro de nuestras aplicaciones, es decir:

En vez de utilizar

```js
import MiComponente from '../../../Components/Button/MiComponente'
```

Podemos utilizar importaciones dinamicas o los famosos alias

```js
import MiComponente from '@Components'
```

ahora bien, ¿como hacemos esto?, realizamos estas importaciones dinamicas de la siguiente manera:

en nuestro archivo <strong>vite.config.js</strong> y <strong>jsconfig.json</strong> los cuales tienen las siguientes estructuras

vite.config.js
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@Components': path.resolve(__dirname, 'src/Components'),
      '@Store': path.resolve(__dirname, 'src/Redux/Store/store.jsx'),
      '@Slice': path.resolve(__dirname, 'src/Redux/Slice'),
      '@Pages': path.resolve(__dirname, 'src/Pages'),
      '@Routes': path.resolve(__dirname, 'src/Routes'),
      '@Assets': path.resolve(__dirname, 'src/Assets'),
      '@Helpers': path.resolve(__dirname, 'src/Helpers'),
      '@HttpRequest': path.resolve(__dirname, 'src/Adapters/Remote/HttpRequest.jsx'),
      '@Adapters': path.resolve(__dirname, 'src/Adapters/index.jsX'),
      '@Hooks': path.resolve(__dirname, 'src/Hooks'),
      '@Middleware': path.resolve(__dirname, 'src/Middleware'),
      '@Constant': path.resolve(__dirname, 'src/Constant'),
      '@Styles': path.resolve(__dirname, 'src/Css'),
    }
  },
  build: {
    // Configuración de construcción...
    assetsInclude: [
      // Excluir carpetas específicas
      '!src/Build/**/*',
      '!src/Constant/Params.json',
    ],
  },
})
```

jsconfig.json
```json
{
    "compilerOptions": {
      "baseUrl": "./",
      "paths": {
        "@Components": ["src/Components"],
        "@Store": ["src/Redux/Store"],
        "@Slice": ["src/Redux/Slice"],
        "@Pages": ["src/Pages"],
        "@Routes": ["src/Routes"],
        "@Assets": ["src/Assets"],
        "@Helpers": ["src/Helpers"],
        "@HttpRequest": ["src/Adapters/Remote/HttpRequest.jsx"],
        "@Adapters": ["src/Adapters"],
        "@Hooks": ["src/Hooks"],
        "@Middleware": ["src/Middleware"],
        "@Constant": ["src/Constant"],
        "@Styles": ["src/Css"]
      }
    },
    "exclude": ["node_modules", "dist"]
  }
  
```

si bien podemos ver una estructura fácil de seguir pero de todos modos vamos a explicar como funciona dicha estructura para poder seguirla sin errores:

- <strong>vite.config.js:</strong> dentro de las llaves de alias vamos a ingresar todas nuestra importaciones dinamicas apuntando a la carpeta que queremos importar, generalmente se utiliza archivos de barril para realizar estas importaciones dinamicas, pero ¿por que?, porqué porque evitamos tener importaciones de tipo @Components/Buttons/MiComponente y pasamos a tener unicamente @Components, si podemos darnos cuenta nuestro alias es un objeto y como llave colocamos la importación que querramos hacer por ejemplo: @Components, @Pages, @Adapters entre otros y como valos debemos resolver la ruta con path.resolve(__dirname) esto se realiza para ubicar el path en la ruta raíz del directorio y el segundo argumento es la navegación a la carpeta a la que apuntaremos.
-  <strong>jsconfig.json:</strong> En este archivo simplemnte replicamos lo que hicimos en el anterior archivo, y ¿con que fin realizamos esto en este archivo? con el fin de decirle al editor de texto que capture la metadata y la doc de cada importación, es decir que si colocamos JsDoc a las funciones o componentes que vamos a escribir y unicamente dejamos la configuración de vite al momento de importar esta metadata y doc nunca se verá reflejada.

### Crear archivo de barril

Para crear dicho archivo de barril utilizamos una extensión o plugin de vscode:

```
mikehanson.auto-barrel
```

Con este id lo pegamos en el buscador de extensiones e instalamos el unico que aparece, una vez instalado el uso es fácil. Simplemente en nuestro buscador de archivos seleccionamos la carpeta a la que queramos crear el archivo de barril y le damos click derecho y al final de las opciones nos aparecerá una opción que dice Create Barrel.

Esto lo que nos generará es un index.js o si estamos usando ts será un index.ts, ya con esto podemos realizar importaciones directamente a carptes puedo que no es necesario realizar la importación de la siguiente manera

```js
import MiComponente from '../../../Components/index.jsx'
```

sino que ocupamos solo

```js
import MiComponente from '../../../Components'
```

puesto que js asume el archivo index.js cuando apuntamos a la carpeta, ademas nuestro archivo de barril automaticamente nos genera las importaciones y exportaciones de los componentes y funciones, a lo que nosotros le conocemos como orquestador de exportaciones, aquí un ejemplo:


./src/Components/index.js aunque obviamos el index.js ./src/Components
```js
export { default as BorderGradient } from './Borders/BorderGradient';
export { default as InputGradient } from './Inputs/InputGradient';
```

Ahora bien, si creas diferentes componentes despues de crear dicho archivo de barril de la misma opción como lo creaste lo puedes actualizar pero en vez de darle click derecho a la carpeta le darás click derecho directamente al archivo ya creado index.js y verás como aparecerá la opción: Update Barrel

## Creación de páginas y rutas

In writing...


<strong>Documentation written by  <a href="https://github.com/Camilo1423" target="_blank">@Camilo1423</a></strong>
