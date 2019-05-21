const NotesCreated = (notes, meta = null) => ({
  event: "NotesCreated",
  data: notes,
  meta
});

module.exports = NotesCreated;
