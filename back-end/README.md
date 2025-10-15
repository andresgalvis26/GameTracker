# Games API

## Descripción
Este proyecto es una API construida con Node.js y Express que gestiona los juegos que has completado. Permite agregar nuevos juegos y recuperar la lista de juegos completados.

## Estructura del Proyecto
```
games-api
├── src
│   ├── app.js                # Punto de entrada de la aplicación
│   ├── controllers           # Controladores para manejar la lógica de negocio
│   │   └── gamesController.js # Controlador para la gestión de juegos
│   ├── routes                # Definición de rutas de la API
│   │   └── games.js          # Rutas para los juegos
│   ├── models                # Modelos de datos
│   │   └── Game.js           # Modelo de un juego
│   ├── middleware            # Middleware para la aplicación
│   │   └── index.js          # Middleware general
│   └── config                # Configuración de la aplicación
│       └── database.js       # Configuración de la base de datos
├── package.json              # Configuración de npm
└── README.md                 # Documentación del proyecto
```

## Instalación
1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   ```
2. Navega al directorio del proyecto:
   ```
   cd games-api
   ```
3. Instala las dependencias:
   ```
   npm install
   ```

## Uso
Para iniciar el servidor, ejecuta:
```
npm start
```
El servidor estará corriendo en `http://localhost:3000`.

## Endpoints
- `GET /games`: Recupera la lista de juegos completados.
- `POST /games`: Agrega un nuevo juego a la lista.

## Contribuciones
Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.