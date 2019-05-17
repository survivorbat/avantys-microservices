const StudentUnregistered = (student, meta) => ({
  event: "StudentUnregistered",
  data: student,
  meta
});

module.exports = StudentUnregistered;
