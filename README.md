# Servidor Vue CLI
Descomprimir los archivos fuente del servidor en la carpeta deseada. Es necesaria la dependencia de Node.js. Luego, abrir una consola de Windows, Powershell o Shell de Linux en la carpeta y correr:

``` npm install ```

Al terminar la instalación, se inicia el servidor con el comando

``` npm run serve ```

En la consola aparecerá la dirección por dónde se puede ingresar a la página web.

# API

Utilizamos la versión 1.0.3 de la API provista por la cátedra. Se ejecutó en el puerto 3000 a la misma, por lo que se deben configurar los archivos .env del root de la API y api/swagger.yaml para utilizar este puerto.

Por otro lado, nuestro método de verificación de email requiere de un formato de url de confirmación distinto al predeterminado en la API. Se deberá cambiar la siguiente línea en el archivo config/mailing.js:

```confirmationLink: 'http://localhost:8080/verification/<%CODE%>'```

Donde el valor del puerto de localhost corresponde al que se está utilizando para correr el servidor Vue CLI.

