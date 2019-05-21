const CoupleStudentToClass = (student, meta = null) => ({
  event: "CoupleStudentToClass",
  data: student,
  meta
});

module.exports = CoupleStudentToClass;
