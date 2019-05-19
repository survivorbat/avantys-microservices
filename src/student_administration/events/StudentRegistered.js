const StudentRegistered = (student, meta = null) => ({
  event: "StudentRegistered",
  data: student,
  meta
});

module.exports = StudentRegistered;
