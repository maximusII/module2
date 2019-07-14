import { Notyf } from "notyf";
import {
  PRIORITY_TYPES,
  ICON_TYPES,
  NOTE_ACTIONS,
  NOTIFICATION_MESSAGES
} from "./utils/constants";
import initialNotes from "../assets/notes.json";
import Notepad from "./model";
import {
  createNoteContent,
  createActionButton,
  createNoteFooter,
  createListItem,
  renderNoteList,
  templateMarkup
} from "./view";
import MicroModal from "micromodal";

const shortid = require("shortid");

const notepad = new Notepad(initialNotes);

const notyf = new Notyf();

const list = document.querySelector(".note-list");
const form = document.querySelector(".note-editor");
const search = document.querySelector(".search-form");
const openEditorModalBtn = document.querySelector(
  "button[data-action='open-editor']"
);

const handleAddNewNote = event => {
  event.preventDefault();
  const inputs = form.querySelectorAll(".note-editor__input");
  const inputTitle = inputs[0];
  const inputBody = inputs[1];
  const title = inputTitle.value;
  const body = inputBody.value;
  if (title.trim() === "" || body.trim() === "") {
    return notyf.error(NOTIFICATION_MESSAGES.EDITOR_FIELDS_EMPTY);
  }
  const id = shortid.generate();
  MicroModal.close("note-editor-modal");
  notyf.success(NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS);
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
    notyf.success(NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS);
  }
}

function handleSearch(event) {
  const input = event.target.value;
  const filteredNotes = notepad.filterNotesByQuery(input);
  renderNoteList(list, filteredNotes);
}

function handleOpenEditor() {
  MicroModal.show("note-editor-modal");
}

form.addEventListener("submit", handleAddNewNote);
list.addEventListener("click", removeListItem);
search.addEventListener("input", handleSearch);
openEditorModalBtn.addEventListener("click", handleOpenEditor);

export const template = templateMarkup();
