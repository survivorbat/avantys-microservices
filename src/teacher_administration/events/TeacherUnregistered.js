const TeacherUnregistered = (teacher, meta = null) => ({
  event: "TeacherUnregistered",
  data: teacher,
  meta
});

module.exports = TeacherUnregistered;
