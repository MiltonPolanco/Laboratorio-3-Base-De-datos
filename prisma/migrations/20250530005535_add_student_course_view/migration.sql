-- Crea la vista StudentCourseView que consolida Student + Course + Enrollment
CREATE OR REPLACE VIEW "StudentCourseView" AS
SELECT
  s.id          AS "studentId",
  s."firstName",
  s."lastName",
  s.email,
  s.gender,
  c.id          AS "courseId",
  c.title,
  c.code,
  c.level,
  e."enrolledAt"
FROM "Student"   s
JOIN "Enrollment" e ON e."studentId" = s.id
JOIN "Course"     c ON e."courseId"   = c.id;
