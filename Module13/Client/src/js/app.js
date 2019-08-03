import { Notyf } from "notyf";
import { PRIORITY_TYPES, NOTIFICATION_MESSAGES } from "./utils/constants";
import { createListItem, renderNoteList, notepad } from "./view";
import MicroModal from "micromodal";
import noteTemplate from "../templates/note.hbs";

const notyf = new Notyf();

notepad.loadNotes().then(notes => {
  noteTemplate(notes);
  const template = function templateMarkup() {
    root.innerHTML = markup;
  };
});

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
  MicroModal.close("note-editor-modal");
  notyf.success(NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS);
  event.currentTarget.reset();
  notepad
    .saveNote({ title, body, priority: PRIORITY_TYPES.LOW })
    .then(note => addListItem(list, note))
    .catch(error => {
      console.log(error);
    });
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
    notepad
      .deleteNote(id)
      .then(note => listItem.remove())
      .catch(error => {
        console.log(error);
      });
    notyf.success(NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS);
  }
}

function handleSearch(event) {
  const input = event.target.value;
  notepad
    .filterNotesByQuery(input)
    .then(filteredNotes => renderNoteList(list, filteredNotes));
}

function handleOpenEditor() {
  MicroModal.show("note-editor-modal");
}

form.addEventListener("submit", handleAddNewNote);
list.addEventListener("click", removeListItem);
search.addEventListener("input", handleSearch);
openEditorModalBtn.addEventListener("click", handleOpenEditor);
