# 🚀 Talento Tech - Proyecto Final

Una API REST completa construida con **Node.js** y **Express** que gestiona productos y usuarios con autenticación JWT y persistencia en **Firebase Firestore**. Este proyecto demuestra buenas prácticas de desarrollo backend incluyendo validación centralizada en servicios, manejo de errores estructurado y seguridad con tokens JWT.

---

## 📋 Descripción

Esta API REST proporciona un sistema completo de gestión de productos y usuarios con las siguientes funcionalidades:

- **Gestión de Productos**: CRUD completo (Create, Read, Update, Delete) con validación de campos numéricos.
- **Gestión de Usuarios**: Registro, login, y operaciones CRUD con autenticación JWT.
- **Autenticación JWT**: Protección de rutas con tokens seguros y validación de roles (admin).
- **Validaciones Centralizadas**: Toda la lógica de validación se encuentra en la capa de servicios.
- **Persistencia en Firestore**: Base de datos en tiempo real con Firebase.
- **Actualizaciones Parciales**: Soporte para PATCH en productos y usuarios.
- **Manejo de Errores Estructurado**: Respuestas consistentes con códigos HTTP apropiados.

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Descripción |
|-----------|---------|------------|
| **Node.js** | v18+ | Runtime de JavaScript |
| **Express.js** | ^5.1.0 | Framework web minimalista |
| **Firebase** | ^12.6.0 | Firestore para base de datos en tiempo real |
| **JWT (jsonwebtoken)** | ^9.0.2 | Autenticación con tokens seguros |
| **bcryptjs** | ^3.0.3 | Encriptación de contraseñas |
| **dotenv** | ^17.2.3 | Gestión de variables de entorno |
| **CORS** | ^2.8.5 | Control de recursos entre orígenes |

---

## ✨ Características Principales

✅ **Validación robusta** de datos en la capa de servicios  
✅ **Autenticación JWT** con tokens de 1 hora  
✅ **Control de roles** (admin/usuario)  
✅ **CRUD completo** para productos y usuarios  
✅ **Actualizaciones parciales** (PATCH) con coerción inteligente  
✅ **Respuestas estructuradas** con manejo de errores consistente  
✅ **Firestore como BD** con operaciones en tiempo real  
✅ **Contraseñas encriptadas** con bcrypt  
✅ **Middleware de autenticación** flexible (requerido y opcional)  

---

## 📦 Instalación

### Requisitos Previos

- **Node.js** v18 o superior
- **npm** (incluido con Node.js)
- Una cuenta de **Firebase** con proyecto activo

### Pasos de Instalación

#### 1. Clonar el Repositorio

```bash
git clone https://github.com/Itueze73/proyectoFinal.git
cd proyectoFinal
```

#### 2. Instalar Dependencias

```bash
npm install
```

Este comando instala todas las librerías necesarias:
- express
- firebase
- jsonwebtoken
- bcryptjs
- dotenv
- cors

#### 3. Crear el Archivo `.env`

En la raíz del proyecto, crea un archivo `.env` con tus credenciales de Firebase:

```env
# Firebase Configuration
FIREBASE_API_KEY=tu_api_key_aqui
FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
FIREBASE_PROJECT_ID=tu_proyecto_id
FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
FIREBASE_APP_ID=tu_app_id

# JWT Secret
JWT_SECRET=mi_palabra_secreta_para_generar_tokens_1234567890

# Puerto (opcional)
PORT=3001
```

**Cómo obtener las credenciales de Firebase:**
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto
3. Ve a **Configuración del proyecto** → **Tu aplicación**
4. Selecciona la aplicación web (`</>`)
5. Copia las credenciales mostradas

#### 4. Iniciar el Proyecto

**Modo desarrollo (con reinicio automático):**
```bash
npm run dev
```

**Modo producción:**
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

---

## 🔌 API Endpoints

### 📦 Productos

| Método | Ruta | Descripción |
|--------|------|-------------|---|
| `GET` | `/api/products` | Obtener todos los productos 
| `GET` | `/api/products/:id` | Obtener producto por ID 
| `POST` | `/api/products` | Crear nuevo producto 
| `PUT` | `/api/products/:id` | Actualizar producto (completo) 
| `PATCH` | `/api/products/:id` | Actualizar producto (parcial) 
| `DELETE` | `/api/products/:id` | Eliminar producto 

### 👥 Usuarios

| Método | Ruta | Descripción | Autenticación |
|--------|------|-------------|---|
| `GET` | `/api/users` | Obtener todos los usuarios | ✅ JWT |
| `GET` | `/api/users/:id` | Obtener usuario por ID | ✅ JWT |
| `POST` | `/api/users` | Registrar nuevo usuario | ❌ No |
| `POST` | `/api/users/login` | Login y obtener JWT | ❌ No |
| `PUT` | `/api/users/:id` | Actualizar usuario | ✅ JWT |
| `PATCH` | `/api/users/:id` | Actualizar usuario (parcial) | ✅ JWT |
| `DELETE` | `/api/users/:id` | Eliminar usuario | ✅ JWT + Admin |

---

## 📊 Ejemplos de Datos

### Estructura de Producto

```json
{
  "id": "doc_id_generado_por_firestore",
  "nombre": "Laptop Dell XPS 13",
  "descripcion": "Laptop ultraligera de alto rendimiento",
  "precio": 1299.99,
  "categoria": "Electrónica",
  "stock": 15
}
```

**Validaciones para Productos:**
- `nombre`: obligatorio, string no vacío, máximo 100 caracteres
- `descripcion`: opcional, string
- `precio`: obligatorio, número > 0
- `categoria`: opcional, string
- `stock`: obligatorio para POST, entero >= 0

### Estructura de Usuario

```json
{
  "id": "doc_id_generado_por_firestore",
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password": "contraseña_encriptada_bcrypt",
  "rol": "usuario"
}
```

**Validaciones para Usuarios:**
- `nombre`: obligatorio, string no vacío, máximo 30 caracteres
- `email`: obligatorio, formato válido, único en la BD
- `password`: obligatorio, máximo 12 caracteres
- `rol`: "usuario" (por defecto) o "admin"

---

## 🔍 Ejemplos con Insomnia

### 1. Crear Producto

**Petición:**
```
POST http://localhost:3000/api/products
Content-Type: application/json

{
  "nombre": "iPhone 15 Pro",
  "descripcion": "Smartphone premium con A17 Pro",
  "precio": 999,
  "categoria": "Smartphones",
  "stock": 25
}
```

**Respuesta (201 Created):**
```json
{
  "id": "Kj8vL2pQ9mN",
  "nombre": "iPhone 15 Pro",
  "descripcion": "Smartphone premium con A17 Pro",
  "precio": 999,
  "categoria": "Smartphones",
  "stock": 25
}
```

---

### 2. Obtener Todos los Productos

**Petición:**
```
GET http://localhost:3000/api/products
```

**Respuesta (200 OK):**
```json
[
  {
    "id": "Kj8vL2pQ9mN",
    "nombre": "iPhone 15 Pro",
    "descripcion": "Smartphone premium",
    "precio": 999,
    "categoria": "Smartphones",
    "stock": 25
  },
  {
    "id": "aB3cD4eF5gH",
    "nombre": "Samsung Galaxy S24",
    "descripcion": "Flagship Android",
    "precio": 899,
    "categoria": "Smartphones",
    "stock": 30
  }
]
```

---

### 3. Actualizar Producto (PUT - Completo)

**Petición:**
```
PUT http://localhost:3000/api/products/Kj8vL2pQ9mN
Content-Type: application/json

{
  "nombre": "iPhone 15 Pro Max",
  "descripcion": "Smartphone premium con pantalla grande",
  "precio": 1099,
  "categoria": "Smartphones",
  "stock": 20
}
```

**Respuesta (200 OK):**
```json
{
  "id": "Kj8vL2pQ9mN",
  "nombre": "iPhone 15 Pro Max",
  "descripcion": "Smartphone premium con pantalla grande",
  "precio": 1099,
  "categoria": "Smartphones",
  "stock": 20
}
```

---

### 4. Actualizar Producto (PATCH - Parcial)

**Petición:**
```
PATCH http://localhost:3000/api/products/Kj8vL2pQ9mN
Content-Type: application/json

{
  "stock": 18,
  "precio": 1050
}
```

**Respuesta (200 OK):**
```json
{
  "id": "Kj8vL2pQ9mN",
  "nombre": "iPhone 15 Pro Max",
  "descripcion": "Smartphone premium con pantalla grande",
  "precio": 1050,
  "categoria": "Smartphones",
  "stock": 18
}
```

---

### 5. Registrar Usuario

**Petición:**
```
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "nombre": "María García",
  "email": "maria@example.com",
  "password": "Pass123456",
  "rol": "usuario"
}
```

**Respuesta (201 Created):**
```json
{
  "id": "xyz123abc456",
  "nombre": "María García",
  "email": "maria@example.com",
  "rol": "usuario"
}
```

---

### 6. Login Usuario

**Petición:**
```
POST http://localhost:3000/api/users/login
Content-Type: application/json

{
  "email": "maria@example.com",
  "password": "Pass123456"
}
```

**Respuesta (200 OK):**
```json
{
  "msj": "Usuario verificado correctamente",
  "user": {
    "id": "xyz123abc456",
    "nombre": "María García",
    "email": "maria@example.com",
    "rol": "usuario"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Inh5ejEyM2FiYzQ1NiIsImVtYWlsIjoibWFyaWFAZXhhbXBsZS5jb20iLCJyb2wiOiJ1c3VhcmlvIiwiaWF0IjoxNzMzMzAwMDAwLCJleHAiOjE3MzMzMDM2MDB9.abc123def456..."
}
```

---

### 7. Obtener Usuarios (Protegido - Requiere JWT y Rol Admin)

**Petición:**
```
GET http://localhost:3000/api/users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Respuesta (200 OK):**
```json
[
  {
    "id": "xyz123abc456",
    "nombre": "María García",
    "email": "maria@example.com",
    "rol": "usuario"
  },
  {
    "id": "admin123xyz",
    "nombre": "Admin User",
    "email": "admin@example.com",
    "rol": "admin"
  }
]
```

---

### 8. Eliminar Producto

**Petición:**
```
DELETE http://localhost:3000/api/products/Kj8vL2pQ9mN
```

**Respuesta (200 OK):**
```json
{
  "message": "Producto eliminado correctamente con ID Kj8vL2pQ9mN"
}
```

---

## 📁 Estructura del Proyecto

```
proyectoFinal/
├── src/
│   ├── controller/
│   │   ├── products.controller.js    # Manejadores HTTP para productos
│   │   └── users.controller.js       # Manejadores HTTP para usuarios
│   │
│   ├── services/
│   │   ├── products.service.js       # Lógica de negocio y validación (productos)
│   │   └── users.service.js          # Lógica de negocio y validación (usuarios)
│   │
│   ├── routes/
│   │   ├── products.routes.js        # Definición de rutas (productos)
│   │   └── users.routes.js           # Definición de rutas (usuarios)
│   │
│   ├── models/
│   │   ├── products.model.js         # Esquema/modelo de Producto
│   │   └── user.model.js             # Esquema/modelo de Usuario
│   │
│   ├── middleware/
│   │   ├── authJWT.js                # Middleware de autenticación JWT
│   │   └── main.js                   # Configuración principal de Express
│   │
│   ├── firebase/
│   │   └── config.js                 # Configuración de Firebase
│   │
│   └── data/
│       └── usuarios.json             # Datos de prueba (opcional)
│
├── .env                              # Variables de entorno (NO incluir en git)
├── .gitignore                        # Archivos a ignorar en git
├── app.js                            # Punto de entrada principal
├── package.json                      # Dependencias y scripts
├── package-lock.json                 # Lock file de dependencias
└── README.md                         # Este archivo
```

### Descripción de Carpetas

- **`controller/`**: Manejadores HTTP que reciben peticiones, llaman servicios y retornan respuestas.
- **`services/`**: Lógica de negocio, validaciones y operaciones con Firestore.
- **`routes/`**: Definición de rutas y aplicación de middlewares.
- **`models/`**: Modelos/esquemas de datos (clases constructoras).
- **`middleware/`**: Funciones de middleware (autenticación, CORS, etc.).
- **`firebase/`**: Inicialización y configuración de Firebase.

---

## 🔐 Autenticación y Seguridad

### Flujo de Autenticación

1. **Registro**: Usuario se registra en `POST /api/users` con nombre, email y contraseña.
2. **Login**: Usuario inicia sesión en `POST /api/users/login` con email y contraseña.
3. **Token JWT**: El servidor retorna un token válido por 1 hora.
4. **Acceso Protegido**: Para acceder a rutas protegidas, envía el token en el header `Authorization: Bearer <token>`.
5. **Validación**: El middleware valida el token y verifica el rol si es necesario.

### Cómo Usar el Token en Insomnia

1. Copia el token de la respuesta del login.
2. En la siguiente petición, ve a la pestaña **Headers**.
3. Añade un header: `Authorization: Bearer <tu_token_aqui>`
4. Envía la petición.

**Ejemplo con curl:**
```bash
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## ❌ Códigos de Error Comunes

| Código | Mensaje | Causa |
|--------|---------|-------|
| **400** | Validation error | Datos inválidos (precio no numérico, email duplicado, etc.) |
| **401** | Token no proporcionado | Falta el header Authorization |
| **403** | Token inválido o expirado | Token expirado o corrompido |
| **403** | Acceso denegado: rol de administrador | Usuario no tiene permisos de admin |
| **404** | Recurso no encontrado | ID de producto/usuario no existe |
| **409** | Email ya existe | Email duplicado en registro |
| **500** | Error interno del servidor | Error inesperado en el servidor |

---

## 🧪 Tips para Pruebas

### Usuarios de Prueba

Puedes crear usuarios de prueba manualmente enviando peticiones POST:

```json
{
  "nombre": "Usuario Test",
  "email": "test@example.com",
  "password": "Test1234",
  "rol": "usuario"
}
```

### Productos de Prueba

```json
{
  "nombre": "Laptop Test",
  "descripcion": "Laptop para pruebas",
  "precio": 500,
  "categoria": "Electrónica",
  "stock": 10
}
```

### Validar Firbase Conecta

Si ves errores de Firebase, verifica:
1. Las credenciales en `.env` son correctas.
2. Firestore está habilitado en tu proyecto Firebase.
3. Las reglas de Firestore permiten lectura/escritura (en desarrollo):
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```

---

## 📚 Características Avanzadas

### Validación Centralizada en Servicios

- `validateProductData()`: Valida campos de producto (nombre, precio, stock, etc.)
- `validateUserInput()`: Valida datos de usuario (nombre, email, password)
- Retorna errores estructurados con status HTTP apropiad

### Manejo de Errores

Todas las respuestas de error incluyen:
- `status`: Código HTTP
- `message`: Mensaje descriptivo
- `errors`: Array con detalles de validación (si aplica)

---

## 🤝 Contribuciones

Este es un proyecto educativo. Si encuentras bugs o tienes sugerencias:

---

## 📄 Licencia

Este proyecto está bajo licencia **ISC**. Ver `LICENSE` para más detalles.

---

## 🙏 Agradecimientos

- **Talento Tech**: Por la formación en backend con Node.js.
- **Firebase**: Por la base de datos en tiempo real.
- **Express.js**: Por el framework minimalista y flexible.
- **La Comunidad de Node.js**: Por las herramientas y librerías increíbles.

---

## 📧 Contacto

- **Autor**: Ezequiel Iturriaga
- **Email**: [iturriagaezequiel@gmail.com]
- **GitHub**: [Itueze73](https://github.com/Itueze73)


---

## ⭐ Si te fue útil, ¡no olvides dejar una estrella en el repositorio!

**Última actualización**: 4 de Diciembre de 2025  
**Versión**: 1.0.0

---

### 🚀 ¡Listo para comenzar!

