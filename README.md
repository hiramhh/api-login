# Estructura Node

Aquí te presento la estructura básica que te puede servir para el desarrollo de un proyecto con NodeJS, teniendo como stack lo siguiente:

- Node Js -> Entorno que permite escribir código JS ejecutable de lado del servidor. Descarga en https://nodejs.org/es/download/
- Express -> Es un Framework de desarrollo que permite simplificar tareas. (https://expressjs.com/es/starter/hello-world.html)
- Sequelize -> Es una librería que como tal hace la función de ORM. Si quieres saber un poco más sobre ORMs te dejo un enlace (https://openwebinars.net/blog/que-es-un-orm/).

**Tabla de Contenido**

- [Árbol de carpetas📁](#árbol-de-carpetas-📁)
  - [api](#api)
  - [database](#database)
  - [config](#config)
- [Ejecutar proyecto🚀](#ejecutar-proyecto-🚀)
  - [Simple ejecución](#simple-ejecución)
  - [Utilizando Docker](#utilizando-docker)
- [Manejo de Sequelize CLI](#manejo-de-sequelize-cli)
  - [Crear un modelo](#1-crear-modelo-y-migración)
  - [Crear una migración](#2-crear-migraciones)
  - [Ejecutar migraciones](#3-ejecutar-migraciones)

## Árbol de carpetas 📁

## api

Nuestra carpeta api contendrá todo lo relacionado a la capa de la lógica del negocio, en ella encontrarás

- _index.js_ -> Donde se crea la instancia con el framework de express, eventualmente en este archivo escribirás código como usos de funciones y middlewares del framework express
- _db.js_ -> Conexión a una base de datos
- _controllers_ -> En esta carpeta se crean las funciones que permiten cumplir con los casos de uso pertenecientes a la lógica del negocio
- _repositories_ -> Aquí se escribirá todo lo relacionado a las acciones que una entidad puede hacer en la base de datos (hablando por entidad un modelo). Ejemplo CRUD estas acciones que normalmente las entidades llevan a cabo se pueden mantener en este módulo
- _routes_ -> En Esta carpeta mandas llamar a tus respectivos controllers y les asignas un nombre de EndPoint (urls), básicamente es donde podemos nombrarlos y de esta forma nuestra API los exponga
- _library_ -> Aquí podemos mantener código como aquellas funciones que nos permiten hacer ciertas cosas muy específicas, ejemplo una función de envío de correo.

## database

En esta carpeta se mantiene lo relacionado a la capa de datos, esto involucra que tengamos nuestros _models_ (tablas de la BD), _migrations_ archivos que rastrean los cambios que hacemos en la BD y por último los _seeders_ son archivos que permiten tener batches de información y que se pueden ir a poblar fácilmente la BD. (Entiéndase por BD: Base de Datos)

## config

Aquí tenemos módulos meramente de configuración con el fin de hacer más escalable nuestro desarrollo, configuraciones tipo mantener nuestras variables de entorno o globales en un mismo módulo exportable
y así utilizarlas en cualquier parte de nuestro proyecto

# Ejecutar Proyecto 🚀

Para la ejecución del proyecto eventualmente podrás hacerlo de dos formas, una es simple sin manejo de contenedores para tu aplicación y la otra forma será utilizando contenedores

## Simple ejecución

Para ejecutar el proyecto realiza lo siguientes pasos

1. Tener instalado NodeJS en tu sistema operativo
2. Crear una base de datos en postgreSQL
3. En la raíz del proyecto crear un archivo llamado .env donde colocarás las variables de entorno necesarias(como credenciales de la base de datos, puertos) para referencia tomar el archivo .env.example
4. En la terminal colocarte en el directorio donde se encuentra este proyecto y ejecutar las siguientes intrucciones
5. `npm install` -> Instalará las dependencias que se describen en el archivo package.json, generando así una carpeta llamada node_modules (son los módulos necesarios con los cuales trabajará el framework)
6. `node index.js` -> Ejecuta el codigo que hay en el archivo index.js lo que permitirá tener corriendo nuestra api o servidor

## Utilizando Docker

## Manejo de Sequelize CLI

Como se comenta al inicio, este proyecto trabaja con el ORM sequelize, por lo tanto muchas de las acciones que podemos hacer en la capa de datos podemos trabajarlas con la CLI de Sequelize, tareas como **crear modelos(tablas)**, **crear y ejecutar migraciones**, **crear y ejecutar seeders**, son operaciones que las podemos hacer desde nuestra terminal, para ello te listo abajo como puedes hacerlo:

### 1. Crear modelo y migración\*\*

`npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string`
Puedes ver esto en la propia documentación de Sequelize: https://sequelize.org/docs/v6/other-topics/migrations/#:~:text=Creating%20the%20first,change%20in%20database.

### 2. Crear migraciones\*\*

`npx sequelize migration:generate --name NombreDemigracion`

### 3. Ejecutar migraciones\*\*

`npx sequelize db:migrate --url "postgres://DB_USER:DB_PASSWORD@DB_HOST:DB_PORT/DB_NAME"`
