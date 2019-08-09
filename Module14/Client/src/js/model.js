import * as api from "./services/api";

export default class Notepad {
  constructor(notes = []) {
    this.notes = notes;
  }
  async loadNotes() {
    try {
      const notes = await api.getNotes();
      this.notes = notes;
      return this.notes;
    } catch (error) {
      throw error;
    }
  }
  findNoteById(id) {
    for (const el of this.notes) {
      if (el.id === id) {
        return el;
      }
    }
    return;
  }
  async saveNote(note) {
    try {
      const savedNote = await api.saveNote(note);
      this.notes.push(savedNote);
      return savedNote;
    } catch (error) {
      throw error;
    }
  }
  async deleteNote(id) {
    try {
      await api.deleteNote(id);
      this.notes = this.notes.filter(note => note.id !== id);
      return id;
    } catch (error) {
      throw error;
    }
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
  async filterNotesByQuery(query) {
    try {
      const newArr = [];
      for (const el of this.notes) {
        if (
          el.title.toLowerCase().includes(query.toLowerCase()) ||
          el.body.toLowerCase().includes(query.toLowerCase())
        ) {
          newArr.push(el);
        }
      }
      const result = await newArr;
      return result;
    } catch (error) {
      throw error;
    }
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
