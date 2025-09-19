# API de Noticias - Tarea 1

API para consultar noticias usando NewsAPI.org

## Descripcion

Esta es una API hecha con Node.js y Express que permite consultar noticias de diferentes fuentes usando la API de NewsAPI.org. El proyecto tiene 3 endpoints principales para obtener fuentes, titulares y buscar noticias.

## Tecnologias

- Node.js - Para el servidor
- Express.js - Framework web
- Axios - Para hacer peticiones HTTP
- Dotenv - Para las variables de entorno
- Nodemon - Para desarrollo

## Como esta organizado

```
tarea1/
├── src/
│   ├── controllers/
│   │   └── newsController.js    # Los controladores
│   ├── routes/
│   │   └── news.js             # Las rutas
│   ├── services/
│   │   └── newsapiService.js   # Servicio para NewsAPI
│   └── index.js                # Archivo principal
├── package.json                # Dependencias
├── .env                       # Variables de entorno
├── .env.example              # Ejemplo de .env
├── .gitignore               # Archivos que git ignora
└── README.md               # Este archivo
```

## Como instalarlo

### Lo que necesitas

1. Node.js (version 14 o mas nueva)
2. npm (viene con Node.js)
3. Una cuenta en NewsAPI.org para el API Key

### Pasos

1. Descargar el proyecto
   ```bash
   cd tarea1
   ```

2. Instalar las dependencias
   ```bash
   npm install
   ```

3. Configurar el API Key
   - Hacer cuenta en https://newsapi.org
   - Sacar tu API Key
   - Crear archivo .env:
   ```
   NEWSAPI_KEY=tu_api_key_aqui
   PORT=3000
   ```

4. Correr el proyecto
   
   Para desarrollo:
   ```bash
   npm run dev
   ```
   
   Para produccion:
   ```bash
   npm start
   ```

5. Probar que funcione
   - Abrir http://localhost:3000 en el navegador
   - Debe aparecer el mensaje de bienvenida

## Los endpoints

### 1. Fuentes
GET /api/sources

Obtiene las fuentes de noticias disponibles.

Parametros opcionales:
- category - Categoria (business, entertainment, general, health, science, sports, technology)
- language - Idioma (en, es, fr, etc.)
- country - Pais (us, mx, ar, etc.)

Ejemplo:
```bash
curl "http://localhost:3000/api/sources?category=technology&language=en"
```

### 2. Titulares
GET /api/headlines

Obtiene los titulares principales.

Parametros opcionales:
- country - Pais (us, mx, ar, etc.)
- category - Categoria
- sources - Fuentes especificas
- q - Termino de busqueda

Ejemplo:
```bash
curl "http://localhost:3000/api/headlines?country=mx&category=technology"
```

### 3. Buscar noticias
GET /api/news

Busca noticias especificas. Necesita parametro de busqueda.

Parametros:
- q - Que buscar (OBLIGATORIO)
- sources - Fuentes especificas
- language - Idioma
- sortBy - Como ordenar (relevancy, popularity, publishedAt)
- from - Fecha desde (YYYY-MM-DD)
- to - Fecha hasta (YYYY-MM-DD)

Ejemplo:
```bash
curl "http://localhost:3000/api/news?q=inteligencia+artificial&language=es"
```

## Como se ven las respuestas

### Cuando todo sale bien
```json
{
  "status": "ok",
  "totalResults": 100,
  "articles": [
    {
      "source": {
        "id": "source-id",
        "name": "Source Name"
      },
      "author": "Author Name",
      "title": "Article Title",
      "description": "Article description...",
      "url": "https://example.com/article",
      "urlToImage": "https://example.com/image.jpg",
      "publishedAt": "2024-01-01T12:00:00Z",
      "content": "Article content..."
    }
  ]
}
```

### Cuando hay error
```json
{
  "error": "Descripcion del error",
  "message": "Mensaje del error"
}
```

## Codigos de respuesta

- 200 - Todo bien
- 400 - Error en los parametros
- 401 - Problema con el API Key
- 404 - Endpoint no existe
- 500 - Error del servidor

## Para desarrollo

### Comandos disponibles

- npm start - Corre el servidor normal
- npm run dev - Corre con nodemon para desarrollo

### Variables de entorno

Crear archivo .env con:
```
NEWSAPI_KEY=tu_api_key_de_newsapi
PORT=3000
```

## Cosas importantes

- Se necesita el API Key de NewsAPI.org
- La version gratis tiene limites de requests
- Algunos endpoints necesitan parametros especificos
- Todo regresa en formato JSON
- El servidor debe estar corriendo para usar los endpoints

## Si algo no funciona

### Error 401
- Revisar que el API Key este bien en el .env
- Verificar que el API Key funcione en NewsAPI.org

### Error "NEWSAPI_KEY no esta definida"
- Verificar que existe el archivo .env
- Que la variable se llame exactamente NEWSAPI_KEY

### El servidor no arranca
- Instalar dependencias con npm install
- Revisar que el puerto 3000 no este ocupado

## Autor

Proyecto para la clase de Desarrollo en el Servidor.
