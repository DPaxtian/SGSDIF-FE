# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


---

Aquí les dejo una guía rápida sobre cómo clonar un repositorio de GitHub usando Git en la consola:

1. **Instala Git:**
   Si no lo tienes, primero necesitas instalar Git. Es gratis y lo puedes conseguir en (https://git-scm.com/).

2. **Abre tu terminal:**
   Abre la terminal de tu computadora. Si usas Windows, abre "Git Bash". Si usas Mac o Linux, simplemente usa la terminal que tengas.

3. **Navega hacia donde quieres clonar:**
   Usa el comando `cd` para ir al lugar en tu computadora donde quieras que esté el repositorio clonado. Por ejemplo:
   ```
   cd ruta/de/la/carpeta
   ```

4. **Clona el repositorio:**
   Usa el comando `git clone` seguido de la URL del repositorio en GitHub. La URL la encuentras en la página del repositorio en GitHub. Por ejemplo:
   ```
   git clone https://github.com/usuario/nombre-repositorio.git
   ```

5. **Verifica que se haya clonado:**
   Una vez hecho, ve a la carpeta del repositorio clonado con `cd` y luego mira los archivos con `ls` (en Mac/Linux) o `dir` (en Windows).


---

Ejecutando el proyecto por primera vez

1. **Instala Node.js:**
   Si no tienes Node.js instalado en tu sistema, descárgalo e instálalo desde (https://nodejs.org/). Node.js viene con npm, el administrador de paquetes de Node.js, que necesitarás para instalar las dependencias del proyecto.

2. **Abre tu terminal:**
   Abre la terminal de tu sistema operativo. Puedes usar la terminal integrada en macOS y Linux, o el programa "Git Bash" en Windows.

3. **Navega al directorio del proyecto clonado:**
   Utiliza el comando `cd` para cambiar al directorio del proyecto que acabas de clonar. Por ejemplo:
   ```
   cd ruta/del/proyecto
   ```

4. Crea el archivo .env y solicita las variables de entorno:
Crea un archivo llamado .env en la raíz del proyecto y solicita las variables de entorno necesarias para la configuración del proyecto. 

5. **Instala las dependencias del proyecto:**
   Ejecuta el siguiente comando para instalar todas las dependencias del proyecto, definidas en el archivo `package.json`:
   ```
   npm install
   ```

6. **Ejecuta el proyecto:**
   Una vez que todas las dependencias estén instaladas, puedes ejecutar el proyecto en modo de desarrollo. Utiliza el siguiente comando para iniciar el proyecto con Nodemon, que reflejará automáticamente los cambios en el código sin necesidad de reiniciar el servidor:
   ```
   npm start
   ```

7. **Verifica que el proyecto esté funcionando:**
   Después de ejecutar el proyecto, verifica que esté funcionando correctamente abriendo un navegador web y navegando a la URL o puerto especificado en la documentación del proyecto.
