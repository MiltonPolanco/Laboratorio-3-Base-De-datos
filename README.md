## 📖 Descripción

Sistema CRUD completo para gestión de estudiantes y cursos utilizando Prisma ORM. Implementa relaciones many-to-many a través de tabla intermedia, tipos de datos personalizados (ENUM), validaciones en base de datos y aplicación, y una vista optimizada para consultas del índice.

## 🔧 Requisitos Previos

- **Node.js** v14 o superior
- **npm** v6 o superior  
- **PostgreSQL** v10 o superior
- Cliente **psql** accesible desde línea de comandos

## 📁 Estructura del Proyecto

    ├── database/
    │   ├── schema.sql              # DDL completo con tipos personalizados
    │   ├── data.sql               # Datos de prueba (30+ registros)
    │   ├── .env.example           # Plantilla variables de entorno
    │   └── prisma/
    │       ├── schema.prisma      # Modelo declarativo de Prisma
    │       ├── migrations/        # Historial de migraciones
    │       └── seed.js           # Script de poblamiento
    │   ├── package.json
    │   ├── package-lock.json
    │   └── src/
    │       ├── index.js          # Servidor Express con rutas CRUD
    │       └── views/students/
    │           ├── index.ejs     # Listado desde StudentCourseView
    │           ├── new.ejs       # Formulario de creación
    │           └── edit.ejs      # Formulario edición/eliminación
    ├── docs/
    │   ├── Parte 3 – Análisis (analisis.pdf).pdf          # Respuestas a preguntas de análisis
    └── README.md

## 🚀 Instalación

### 1. Clonar el repositorio
    git clone https://github.com/MiltonPolanco/Laboratorio-3-Base-De-datos.git

### 2. Configurar base de datos
    cp .env.example .env
    
    # Editar .env con tus credenciales PostgreSQL
    # DATABASE_URL="postgresql://tu_usuario:tu_contraseña@localhost:5432/tu_bd?schema=public"

### 3. Instalar dependencias y aplicar migraciones
    npm install prisma @prisma/client
    npx prisma migrate dev
    npx prisma db seed

### 4. Iniciar servidor backend
    npm install
    npm start

### 5. Acceder a la aplicación
    http://localhost:3000/students

## 📡 Endpoints y Uso

### 🔍 Listar estudiantes con inscripciones
- **Ruta**: `GET /students`
- **Descripción**: Muestra todos los estudiantes con sus cursos desde `StudentCourseView`
- **Vista**: `views/students/index.ejs`

### ➕ Crear nuevo estudiante
- **Ruta**: `GET /students/new` → Formulario
- **Ruta**: `POST /students` → Procesar creación
- **Descripción**: Permite crear estudiante e inscribirlo a múltiples cursos
- **Vista**: `views/students/new.ejs`

### ✏️ Editar estudiante existente
- **Ruta**: `GET /students/:id/edit` → Formulario con datos
- **Ruta**: `POST /students/:id` → Procesar actualización
- **Descripción**: Modifica datos del estudiante y sus inscripciones
- **Vista**: `views/students/edit.ejs`

### 🗑️ Eliminar estudiante
- **Ruta**: `POST /students/:id/delete`
- **Descripción**: Elimina estudiante y todas sus inscripciones
- **Redirección**: `/students`

