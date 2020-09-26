# REACT APP SCHEDULE

EL presente proyecto de caracter didactico, es un app front realizado con react usando el comando npm create-react-app Schedule-React, el cual consiste en un gestor basico de tareas.

Tecnologias principales:
- React js 16.8.
- docker
- Bootstrap 4

-Para correr el proyecto usando docker ejecutar los siguientes comandos en el simbolo del sistemas:

 1. docker build . -t dev/react_schedule:latest
 2. docker run -p 3000:3000 react_schedule:latest

 luego en el navegador de preferencia ir al la siguiente url: http://localhost:3000

 -En caso de no contar con docker, clonar el repositorio:
 1. dentro de la carpeta raiz del proyecto al nivel de package.json ejecutar en el cmd el comando " npm install "
 2. Luego ejecutar "npm run start"

luego en el navegador de preferencia ir al la siguiente url: http://localhost:3000
