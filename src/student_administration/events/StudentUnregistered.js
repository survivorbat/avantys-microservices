const StudentUnregistered = (student, meta = null) => ({
  event: "StudentUnregistered",
  data: student,
  meta
});

module.exports = StudentUnregistered;
