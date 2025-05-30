// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 10 estudiantes
  await prisma.student.createMany({
    data: [
      { firstName: 'Ana',  lastName: 'García',  email: 'ana.garcia@uvg.edu.gt',  gender: 'FEMALE' },
      { firstName: 'Luis', lastName: 'Méndez', email: 'luis.mendez@uvg.edu.gt', gender: 'MALE' },
      { firstName: 'María',lastName: 'Pérez',  email: 'maria.perez@uvg.edu.gt',  gender: 'FEMALE' },
      { firstName: 'Juan', lastName: 'López',  email: 'juan.lopez@uvg.edu.gt',  gender: 'MALE' },
      { firstName: 'Sofía',lastName: 'Ramírez',email: 'sofia.ramirez@uvg.edu.gt',gender: 'FEMALE' },
      { firstName: 'Carlos',lastName: 'Muñoz', email: 'carlos.munoz@uvg.edu.gt', gender: 'MALE' },
      { firstName: 'Elena',lastName: 'Flores', email: 'elena.flores@uvg.edu.gt', gender: 'FEMALE' },
      { firstName: 'Diego',lastName: 'Ruiz',   email: 'diego.ruiz@uvg.edu.gt',   gender: 'MALE' },
      { firstName: 'Laura',lastName: 'Romero', email: 'laura.romero@uvg.edu.gt', gender: 'FEMALE' },
      { firstName: 'Pedro',lastName: 'Ortiz',  email: 'pedro.ortiz@uvg.edu.gt',  gender: 'MALE' },
    ]
  });

  // 5 cursos
  await prisma.course.createMany({
    data: [
      { title: 'Bases de Datos I',      code: 'BD101', level: 'BEGINNER' },
      { title: 'Algoritmos Avanzados',   code: 'CS202', level: 'INTERMEDIATE' },
      { title: 'Estructuras de Datos',   code: 'CS203', level: 'INTERMEDIATE' },
      { title: 'Sistemas Operativos',    code: 'SO301', level: 'ADVANCED' },
      { title: 'Redes de Computadoras',  code: 'RN302', level: 'ADVANCED' },
    ]
  });

  // ~30 inscripciones (3 cursos aleatorios por estudiante)
  const students = await prisma.student.findMany();
  const courses  = await prisma.course.findMany();
  for (const s of students) {
    const picks = courses.sort(() => Math.random() - 0.5).slice(0, 3);
    for (const c of picks) {
      await prisma.enrollment.create({
        data: { studentId: s.id, courseId: c.id }
      });
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => { await prisma.$disconnect(); });
