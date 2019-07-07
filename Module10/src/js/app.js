import { PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS } from "./utils/constants";
import initialNotes from "../assets/notes.json";
import Notepad from "./model";
import {
  createNoteContent,
  createActionButton,
  createNoteFooter,
  createListItem,
  renderNoteList
} from "./view";

const shortid = require("shortid");

const notepad = new Notepad(initialNotes);

const list = document.querySelector(".note-list");
const form = document.querySelector(".note-editor");
const search = document.querySelector(".search-form");

const handleAddNewNote = event => {
  event.preventDefault();
  const inputs = form.querySelectorAll(".note-editor__input");
  const inputTitle = inputs[0];
  const inputBody = inputs[1];
  const title = inputTitle.value;
  const body = inputBody.value;
  if (title.trim() === "" || body.trim() === "") {
    return alert("All fields must be completed!");
  }
  const id = shortid.generate();
  event.currentTarget.reset();
  notepad.saveNote({ id, title, body, priority: PRIORITY_TYPES.LOW });
  addListItem(list, { id, title, body, priority: PRIORITY_TYPES.LOW });
};

function addListItem(listRef, note) {
  const newListItem = createListItem(note);
  listRef.appendChild(newListItem);
}

function removeListItem() {
  const target = event.target;
  const button = target.closest("button");
  if (button.dataset.action === "delete-note") {
    const listItem = button.closest(".note-list__item");
    const id = listItem.dataset.id;
    notepad.deleteNote(id);
    listItem.remove();
  }
}

function handleSearch() {
  const input = event.target.value;
  const filteredNotes = notepad.filterNotesByQuery(input);
  renderNoteList(list, filteredNotes);
}

form.addEventListener("submit", handleAddNewNote);
list.addEventListener("click", removeListItem);
search.addEventListener("input", handleSearch);

export const render = renderNoteList(list, notepad.notes);
