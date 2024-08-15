# test-spot-frontend

Este proyecto Nuxt.js 2 se encarga de consumir una API externa para acortar URLs. Permite a los usuarios:

* Crear nuevas URLs cortas.
* Listar todas las URLs acortadas.
* Redirigir a la URL original a partir de la URL corta.
* Eliminar URLs acortadas.

## Requisitos previos
* **Node.js:** Versión 18.18.0 o superior.
* **npm:** Versión 9.8.1 o superior.

## Construcción

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

Además se debe incluir la siguiente variable de entorno
|Variable        |Valor                          |Descripción                  |
|----------------|-------------------------------|-----------------------------|
|BASE_URL        |https://url-microservice.com   |                             |
