// src/index.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const path = require('path');

const app    = express();
const prisma = new PrismaClient();

// Configuración de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Para procesar formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Redirigir / → /students
app.get('/', (req, res) => res.redirect('/students'));

// LISTAR: índice via la VIEW
app.get('/students', async (req, res, next) => {
  try {
    const rows = await prisma.$queryRaw`
      SELECT * FROM "StudentCourseView" ORDER BY "studentId", "courseId"
    `;
    res.render('students/index', { rows });
  } catch (err) {
    next(err);
  }
});

// CREAR: formulario
app.get('/students/new', async (req, res, next) => {
  try {
    const courses = await prisma.course.findMany({ orderBy: { title: 'asc' }});
    res.render('students/new', { courses });
  } catch (err) {
    next(err);
  }
});

// CREAR: procesar
app.post('/students', async (req, res, next) => {
  const { firstName, lastName, email, gender, courseIds = [] } = req.body;
  try {
    await prisma.student.create({
      data: {
        firstName,
        lastName,
        email,
        gender,
        enrollments: {
          create: Array.isArray(courseIds)
            ? courseIds.map(id => ({ courseId: Number(id) }))
            : [{ courseId: Number(courseIds) }]
        }
      }
    });
    res.redirect('/students');
  } catch (err) {
    next(err);
  }
});

// EDITAR: formulario
app.get('/students/:id/edit', async (req, res, next) => {
  const id = Number(req.params.id);
  try {
    const student = await prisma.student.findUnique({
      where: { id },
      include: { enrollments: true }
    });
    if (!student) return res.status(404).send('Estudiante no encontrado');

    const courses = await prisma.course.findMany({ orderBy: { title: 'asc' }});
    const enrolledCourseIds = student.enrollments.map(e => e.courseId);

    res.render('students/edit', { student, courses, enrolledCourseIds });
  } catch (err) {
    next(err);
  }
});

// EDITAR: procesar
app.post('/students/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  const { firstName, lastName, email, gender, courseIds = [] } = req.body;
  try {
    await prisma.student.update({
      where: { id },
      data: {
        firstName,
        lastName,
        email,
        gender,
        enrollments: {
          deleteMany: {},
          create: Array.isArray(courseIds)
            ? courseIds.map(cid => ({ courseId: Number(cid) }))
            : [{ courseId: Number(courseIds) }]
        }
      }
    });
    res.redirect('/students');
  } catch (err) {
    next(err);
  }
});

// ELIMINAR
app.post('/students/:id/delete', async (req, res, next) => {
  const id = Number(req.params.id);
  try {
    await prisma.student.delete({ where: { id } });
    res.redirect('/students');
  } catch (err) {
    next(err);
  }
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Error interno del servidor');
});

// Levantar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
