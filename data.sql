-- --------------------------------------------------
-- 1. Insertar Estudiantes (10 registros)
-- --------------------------------------------------
INSERT INTO student (first_name, last_name, email, gender) VALUES
('Ana',    'García',   'ana.garcia@uvg.edu.gt',    'FEMALE'),
('Luis',   'Méndez',   'luis.mendez@uvg.edu.gt',   'MALE'),
('María',  'Pérez',    'maria.perez@uvg.edu.gt',   'FEMALE'),
('Juan',   'López',    'juan.lopez@uvg.edu.gt',    'MALE'),
('Sofía',  'Ramírez',  'sofia.ramirez@uvg.edu.gt', 'FEMALE'),
('Carlos', 'Muñoz',    'carlos.munoz@uvg.edu.gt',  'MALE'),
('Elena',  'Flores',   'elena.flores@uvg.edu.gt',  'FEMALE'),
('Diego',  'Ruiz',     'diego.ruiz@uvg.edu.gt',    'MALE'),
('Laura',  'Romero',   'laura.romero@uvg.edu.gt',  'FEMALE'),
('Pedro',  'Ortiz',    'pedro.ortiz@uvg.edu.gt',   'MALE');

-- --------------------------------------------------
-- 2. Insertar Cursos (5 registros)
-- --------------------------------------------------
INSERT INTO course (title, code, level) VALUES
('Bases de Datos I',      'BD101',  'BEGINNER'),
('Algoritmos Avanzados',  'CS202',  'INTERMEDIATE'),
('Estructuras de Datos',  'CS203',  'INTERMEDIATE'),
('Sistemas Operativos',   'SO301',  'ADVANCED'),
('Redes de Computadoras', 'RN302',  'ADVANCED');

-- --------------------------------------------------
-- 3. Insertar Inscripciones (30 registros)
--    Cada estudiante inscrito en 3 cursos distintos
-- --------------------------------------------------
INSERT INTO enrollment (student_id, course_id, enrolled_at) VALUES
-- Estudiante 1 (Ana)
(1, 1, NOW()), (1, 2, NOW()), (1, 3, NOW()),
-- Estudiante 2 (Luis)
(2, 1, NOW()), (2, 3, NOW()), (2, 4, NOW()),
-- Estudiante 3 (María)
(3, 2, NOW()), (3, 4, NOW()), (3, 5, NOW()),
-- Estudiante 4 (Juan)
(4, 1, NOW()), (4, 2, NOW()), (4, 5, NOW()),
-- Estudiante 5 (Sofía)
(5, 1, NOW()), (5, 3, NOW()), (5, 5, NOW()),
-- Estudiante 6 (Carlos)
(6, 2, NOW()), (6, 3, NOW()), (6, 4, NOW()),
-- Estudiante 7 (Elena)
(7, 1, NOW()), (7, 4, NOW()), (7, 5, NOW()),
-- Estudiante 8 (Diego)
(8, 2, NOW()), (8, 3, NOW()), (8, 5, NOW()),
-- Estudiante 9 (Laura)
(9, 1, NOW()), (9, 3, NOW()), (9, 4, NOW()),
-- Estudiante 10 (Pedro)
(10,1, NOW()), (10,2, NOW()), (10,5, NOW());
