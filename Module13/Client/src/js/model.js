import * as api from "./services/api";

export default class Notepad {
  constructor(notes = []) {
    this.notes = notes;
  }
  loadNotes() {
    return api.getNotes().then(notes => {
      this.notes = notes;

      return this.notes;
    });
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
    return api.saveNote(note).then(savedNote => {
      this.notes.push(savedNote);
      return savedNote;
    });
  }
  deleteNote(id) {
    return api.deleteNote(id).then(() => {
      this.notes = this.notes.filter(note => note.id !== id);

      return id;
    });
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
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newArr = [];
        for (const el of this.notes) {
          if (
            el.title.toLowerCase().includes(query.toLowerCase()) ||
            el.body.toLowerCase().includes(query.toLowerCase())
          ) {
            newArr.push(el);
          }
        }
        resolve(newArr);
      }, 300);
    });
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
