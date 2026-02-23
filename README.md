# FichasPorgesa

Aplicación web full-stack para la gestión de fichas de despiece de piezas fabricadas. Permite registrar, consultar, editar y eliminar fichas técnicas con sus dimensiones, material, cantidad, cliente y documento PDF asociado.

---

## Tabla de contenidos

- [Descripción general](#descripción-general)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Requisitos previos](#requisitos-previos)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Instalación y puesta en marcha](#instalación-y-puesta-en-marcha)
  - [Backend (Laravel)](#backend-laravel)
  - [Frontend (React)](#frontend-react)
- [Variables de entorno](#variables-de-entorno)
- [API REST](#api-rest)
  - [Autenticación](#autenticación)
  - [Fichas de despiece](#fichas-de-despiece)
- [Modelo de datos](#modelo-de-datos)
- [Rutas del frontend](#rutas-del-frontend)
- [Autenticación y seguridad](#autenticación-y-seguridad)
- [Subida de archivos PDF](#subida-de-archivos-pdf)
- [CORS](#cors)

---

## Descripción general

FichasPorgesa es una aplicación de gestión de fichas de despiece orientada a talleres de fabricación. Ofrece:

- Listado paginado de fichas con sus datos técnicos.
- Detalle de cada ficha con dimensiones, material y datos del cliente.
- Creación, edición y eliminación de fichas (solo para usuarios autenticados).
- Descarga del PDF técnico asociado a cada ficha.
- Sistema de registro e inicio de sesión con tokens Bearer (Laravel Sanctum).

---

## Tecnologías utilizadas

### Backend

| Tecnología | Versión |
|---|---|
| PHP | ^8.2 |
| Laravel | ^12.0 |
| Laravel Sanctum | ^4.0 |
| Base de datos | SQLite (por defecto) / MySQL |
| PHPUnit | ^11.5 |

### Frontend

| Tecnología | Versión |
|---|---|
| React | ^19.2 |
| TypeScript | ~5.9 |
| Vite | ^7.3 |
| React Router DOM | ^7.13 |
| Axios | ^1.13 |
| Lucide React | ^0.574 |
| React Hot Toast | ^2.6 |

---

## Requisitos previos

- PHP 8.2 o superior con la extensión `pdo_sqlite` (o `pdo_mysql` para MySQL)
- Composer 2.x
- Node.js 18 o superior y npm
- Git

---

## Estructura del proyecto

```
/
├── backend/          # API REST en Laravel
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/Api/V1/   # AuthController, FichaDespieceController
│   │   │   ├── Requests/             # Validaciones de entrada
│   │   │   └── Resources/            # Transformación de respuestas JSON
│   │   └── Models/                   # FichaDespiece, User
│   ├── database/
│   │   ├── migrations/               # Estructura de las tablas
│   │   └── seeders/                  # Datos de ejemplo
│   └── routes/
│       └── api.php                   # Definición de endpoints
│
└── frontend/         # SPA en React + TypeScript
    └── src/
        ├── auth/                     # Contexto y almacenamiento de sesión
        ├── components/               # Componentes reutilizables
        ├── pages/                    # Vistas de la aplicación
        ├── routing/                  # PrivateRoute y configuración de rutas
        ├── services/                 # Llamadas a la API (axios)
        └── types/                    # Tipos TypeScript
```

---

## Instalación y puesta en marcha

### Backend (Laravel)

1. Acceder al directorio del backend:

```bash
cd backend
```

2. Instalar dependencias PHP:

```bash
composer install
```

3. Copiar el archivo de entorno y generar la clave de aplicación:

```bash
cp .env.example .env
php artisan key:generate
```

4. Configurar la base de datos en `.env` (ver sección [Variables de entorno](#variables-de-entorno)).

5. Ejecutar las migraciones y los seeders:

```bash
php artisan migrate --seed
```

6. Crear el enlace simbólico para el almacenamiento público (necesario para acceder a los PDF):

```bash
php artisan storage:link
```

7. Iniciar el servidor de desarrollo:

```bash
php artisan serve
```

El servidor quedará disponible en `http://localhost:8000`.

---

### Frontend (React)

1. Acceder al directorio del frontend:

```bash
cd frontend
```

2. Instalar dependencias Node:

```bash
npm install
```

3. Crear el archivo de entorno a partir del ejemplo:

```bash
cp .env.example .env
```

4. Configurar la URL de la API en `.env` (ver sección [Variables de entorno](#variables-de-entorno)).

5. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

---

## Variables de entorno

### Backend (`backend/.env`)

```env
APP_NAME=FichasPorgesa
APP_ENV=local
APP_KEY=          # Generada con php artisan key:generate
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite
# Para MySQL descomentar las siguientes líneas:
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=fichas_porgesa
# DB_USERNAME=root
# DB_PASSWORD=

SANCTUM_STATEFUL_DOMAINS=localhost:5173
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:8000/api/v1
```

---

## API REST

La API sigue el versionado `/api/v1`. Los endpoints que requieren autenticación esperan la cabecera:

```
Authorization: Bearer <token>
```

### Autenticación

| Método | Endpoint | Acceso | Descripción |
|---|---|---|---|
| POST | `/api/v1/auth/register` | Público | Registrar nuevo usuario |
| POST | `/api/v1/auth/login` | Público | Iniciar sesión y obtener token |
| POST | `/api/v1/auth/logout` | Privado | Cerrar sesión e invalidar token |

#### Ejemplo: registro

```json
POST /api/v1/auth/register
{
  "name": "Ana Garcia",
  "email": "ana@example.com",
  "password": "secreto123"
}
```

Respuesta `201`:

```json
{
  "user": { "id": 1, "name": "Ana Garcia", "email": "ana@example.com" },
  "token": "1|aBcDeFgH..."
}
```

---

### Fichas de despiece

| Método | Endpoint | Acceso | Descripción |
|---|---|---|---|
| GET | `/api/v1/fichas-despiece` | Público | Listar fichas (paginado) |
| GET | `/api/v1/fichas-despiece/{id}` | Público | Detalle de una ficha |
| GET | `/api/v1/fichas-despiece/{id}/pdf` | Público | Descargar el PDF de la ficha |
| POST | `/api/v1/fichas-despiece` | Privado | Crear una nueva ficha |
| PUT/PATCH | `/api/v1/fichas-despiece/{id}` | Privado | Actualizar una ficha |
| DELETE | `/api/v1/fichas-despiece/{id}` | Privado | Eliminar una ficha |

#### Parámetros de paginación (GET /fichas-despiece)

| Parámetro | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `page` | integer | 1 | Número de página |
| `per_page` | integer | 15 | Resultados por página |

#### Campos de una ficha (POST / PUT)

Los campos se envían como `multipart/form-data` cuando se adjunte un archivo PDF, o como `application/json` en caso contrario.

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `nombre_pieza` | string | Sí | Nombre de la pieza |
| `material` | enum | Sí | `Aluminio` o `Acero` |
| `largo` | decimal | Sí | Dimensión en mm |
| `ancho` | decimal | Sí | Dimensión en mm |
| `grosor` | decimal | Sí | Dimensión en mm |
| `cantidad` | integer | Sí | Unidades |
| `cliente` | string | Sí | Nombre del cliente |
| `archivo_pdf` | file (PDF) | No | Documento técnico asociado |

---

## Modelo de datos

### Tabla `fichas_despiece`

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | bigint (PK) | Identificador único |
| `nombre_pieza` | varchar | Nombre de la pieza |
| `material` | enum | `Aluminio` / `Acero` |
| `largo` | decimal(10,2) | Largo en mm |
| `ancho` | decimal(10,2) | Ancho en mm |
| `grosor` | decimal(10,2) | Grosor en mm |
| `cantidad` | integer | Cantidad de unidades |
| `cliente` | varchar | Cliente al que pertenece |
| `archivo_pdf` | varchar (nullable) | Ruta relativa del PDF en storage |
| `created_at` | timestamp | Fecha de creación |
| `updated_at` | timestamp | Fecha de última modificación |

### Tabla `users`

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | bigint (PK) | Identificador único |
| `name` | varchar | Nombre del usuario |
| `email` | varchar (unique) | Correo electrónico |
| `password` | varchar | Hash de la contraseña |
| `created_at` | timestamp | Fecha de creación |
| `updated_at` | timestamp | Fecha de última modificación |

---

## Rutas del frontend

| Ruta | Acceso | Descripción |
|---|---|---|
| `/` | Público | Página de inicio |
| `/login` | Público | Formulario de inicio de sesión |
| `/register` | Público | Formulario de registro |
| `/fichas` | Privado | Listado de fichas de despiece |
| `/fichas/:id` | Privado | Detalle de una ficha |
| `/fichas/:id/editar` | Privado | Formulario de edición |
| `/404` | Público | Página de error 404 |

Las rutas privadas redirigen a `/login` si el usuario no tiene sesión activa. Si el token expira o el servidor devuelve `401`, la sesión se limpia automáticamente y se redirige al inicio de sesión.

---

## Autenticación y seguridad

- Se utiliza **Laravel Sanctum** con tokens de tipo Personal Access Token (PAT).
- Al hacer login o registro, el servidor devuelve un token en texto plano que el frontend almacena en `localStorage` mediante `authStorage`.
- Cada petición autenticada incluye la cabecera `Authorization: Bearer <token>` gracias al interceptor de Axios configurado en `src/services/http.ts`.
- Al hacer logout, el token se invalida en el servidor y se elimina del almacenamiento local del navegador.

---

## Subida de archivos PDF

- Los archivos PDF se suben mediante `multipart/form-data` en los endpoints de creación y edición.
- Se almacenan en `storage/app/public/fichas_pdf/` del backend.
- Son accesibles públicamente a través del enlace simbólico creado con `php artisan storage:link`.
- Al actualizar una ficha con un nuevo PDF, el archivo anterior se elimina automáticamente del disco.
- Al eliminar una ficha, su PDF asociado también se elimina del almacenamiento.

---

## CORS

El backend acepta peticiones desde los siguientes orígenes por defecto:

- `http://localhost:5173`
- `http://localhost:5174`
- `http://127.0.0.1:5173`
- `http://127.0.0.1:5174`

Para modificar los orígenes permitidos, editar el archivo `backend/config/cors.php`.
