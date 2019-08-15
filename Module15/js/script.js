export default class Notepad {
  constructor(notes = []) {
    this._notes = notes;
  }
  get notes() {
    return this._notes;
  }
  findNoteById(id) {
    for (const el of this.notes) {
      if (el.id === id) {
        return el;
      }
    }
    return;
  }
  saveNote(note) {
    this.notes.push(note);
    return note;
  }
  deleteNote(id) {
    const findNote = this.findNoteById(id);
    if (!findNote) return;
    this.notes.splice(this.notes.indexOf(findNote), 1);
  }
  updateNoteContent(id, updatedContent) {
    const findNote = this.findNoteById(id);
    if (!findNote) return;
    Object.assign(findNote, updatedContent);
    return findNote;
  }
  updateNotePriority(id, priority) {
    const findNote = this.findNoteById(id);
    if (!findNote) return;
    findNote.priority = priority;
    return findNote;
  }
  filterNotesByQuery(query) {
    const newArr = [];
    for (const el of this.notes) {
      if (
        el.title.toLowerCase().includes(query.toLowerCase()) ||
        el.body.toLowerCase().includes(query.toLowerCase())
      ) {
        newArr.push(el);
      }
    }
    return newArr;
  }
  filterNotesByPriority(priority) {
    const newArr = [];
    for (const el of this.notes) {
      if (el.priority === priority) {
        newArr.push(el);
      }
    }
    return newArr;
  }
}
