# UNIDAD 8 - REST WEB SERVICE

## Instalación y Setup

Primero que nada, necesitas [NPM](https://npmjs.org) y [Node.JS](https://nodejs.org/es/).
Después, es necesario instalar NestJS de manera global

```bash
$ npm install nestjs -g
```

Procede a clonar el proyecto, y verifica que estás ubicado en la rama master.

### Archivos de Configuración

Antes de proceder con la ejecución del servicio, agregue el archivo .env siguiendo el formato indicado en el archivo
`env.test`.

### Instalación de Dependencias

En la ruta principal del proyecto ejecute el siguiente comando para obtener todas las dependencias del proyecto:

```bash
$ npm install
```

## Creación de la Base de Datos

Para ejecutar de forma correcta la aplicación, proceda con la creación de la base de datos en el manejador PostgreSQL con el nombre **rest_web_service**.


## Ejecución de las Aplicaciones

Antes de proceder con la ejecución de la aplicación, asegúrate de tener las variables de ambiente necesarias en el archivo `.env`. Una vez se haya validado esto, es necesario que se asegure que la variable **DATABASE_SYNCHRONIZE** esté en **true** para la creación automática de la base de datos. Posteriormente, asegúrate de tener disponible el puerto asignado para la ejecución del servicio en el archivo `.env`. Finalmente, procede con la ejecución del comando:

```bash
$ npm run start
```

Después de la ejecución de este comando, puede validar en la base de datos la creación de todas las entidades correspondientes al sistema.

## Integrantes

[Andrea Da Silva](mailto:avdasilvab.17@est.ucab.edu.ve)
[Diego Gutiérrez](mailto:dagutierrez.17@est.ucab.edu.ve)
[Rafael Méndez](mailto:rrmendez.17@est.ucab.edu.ve)