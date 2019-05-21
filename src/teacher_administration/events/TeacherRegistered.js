const TeacherRegistered = (teacher, meta = null) => ({
  event: "TeacherRegistered",
  data: teacher,
  meta
});

module.exports = TeacherRegistered;
