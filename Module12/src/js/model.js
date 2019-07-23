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
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.notes.push(note);
        let notes = JSON.stringify(this.notes);
        localStorage.setItem("notes", notes);
        resolve(note);
      }, 300);
    });
  }
  deleteNote(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const findNote = this.findNoteById(id);
        this.notes.splice(this.notes.indexOf(findNote), 1);
        let notes = JSON.stringify(this.notes);
        localStorage.setItem("notes", notes);
        resolve(id);
        reject("Note no found!");
      }, 300);
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
