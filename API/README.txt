Instalaci�n del API:
--------------------
1) Descomprimir el archivo "API v1.6.2 Installer.zip" en alg�n directorio temporal.
2) Descargar de https://nodejs.org/en/ la versi�n 20.12.2 de Node.js correspondiente a la plataforma.
3) Crear un nuevo directorio donde quedar� instalada el API una vez finalizado este instructivo.
4) Copiar el archivo "package.json" que se encuentra en el directorio temporal del paso 1 al directorio creado en el paso 3.
5) Utilizando la consola de l�nea de comandos o una terminal, posicionarse en el directorio creado en el paso 3, escribir "npm install" (sin las comillas) y presionar la tecla Enter. Ignorar las advertencias que se pudieran mostrar en relaci�n a m�dulos que puedan presentar vulnerabilidades.
6) Copiar los subdirectorios actions, config, db, initializers, locales, node_modules y public que se encuentran dentro del directorio temporal del paso 1 al directorio creado en el paso 3. Durante la copia se solicitar� la confirmaci�n para sobrescribir archivos existentes, aceptar la misma.
7) Utilizando la consola de l�nea de comandos o una terminal, posicionarse en el directorio creado en el paso 3, escribir ".\node_modules\.bin\actionhero link --name=ah-swagger-plugin" (sin las comillas y ajustando las barras de acuerdo a la plataforma) y presionar la tecla Enter. Ignorar la advertencia que se muestra por la existencia del archivo "swagger.js".
NOTA: en macOS a veces el m�dulo "action-hero" no se instala correctamente. Si este fuera el caso se obtendr� un error en el paso 7 al ejcutar el comando especificado. Para resolver el problema escribir "npm install action-hero" y presionar la tecla Enter. Una vez finalizada la instalaci�n del m�dulo volver a repetir el paso 7.

Iniciar el API:
---------------
Utilizando la consola de l�nea de comandos o una terminal, posicionarse en el directorio de instalaci�n, escribir "npm start" (sin las comillas) y presionar la tecla Enter.

Detener el API:
---------------
Presionar Ctrl+C la consola de l�nea de comandos o terminal donde se est� ejecutando el API (o cerrar la misma)

Acceder a la documentaci�n del API:
-----------------------------------
Utilizando un navegador Web, acceder a la URL "http://localhost:8080/swagger"

Resetear la base de datos del API:
----------------------------------
En caso de que estuviera ejecutando, detener el API.
Eliminar los archivos *.db que se encuentran en el subdirectorio db dentro del directorio de instalaci�n.