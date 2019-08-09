import { Notyf } from "notyf";
import {
  PRIORITY_TYPES,
  NOTIFICATION_MESSAGES
  // NOTE_ACTIONS,
  // ICON_TYPES
} from "./utils/constants";
import { createListItem, renderNoteList, notepad } from "./view";
import MicroModal from "micromodal";

const notyf = new Notyf();

const list = document.querySelector(".note-list");
const form = document.querySelector(".note-editor");
const search = document.querySelector(".search-form");
const openEditorModalBtn = document.querySelector(
  "button[data-action='open-editor']"
);

const handleAddNewNote = async event => {
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
  try {
    const note = await notepad.saveNote({
      title,
      body,
      priority: PRIORITY_TYPES.LOW
    });
    addListItem(list, note);
  } catch (error) {
    notyf.error(NOTIFICATION_MESSAGES.ERROR);
  }
};

function addListItem(listRef, note) {
  const newListItem = createListItem(note);
  listRef.appendChild(newListItem);
}

async function removeListItem() {
  const target = event.target;
  const button = target.closest("button");
  if (button.dataset.action === "delete-note") {
    const listItem = button.closest(".note-list__item");
    const id = listItem.dataset.id;
    try {
      const note = await notepad.deleteNote(id);
      const delNote = listItem.remove();
      notyf.success(NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS);
    } catch (error) {
      notyf.error(NOTIFICATION_MESSAGES.ERROR);
    }
  }
}

async function handleSearch(event) {
  try {
    const input = event.target.value;
    const filteredNotes = await notepad.filterNotesByQuery(input);
    renderNoteList(list, filteredNotes);
  } catch (error) {
    notyf.error(NOTIFICATION_MESSAGES.ERROR);
  }
}

function handleOpenEditor() {
  MicroModal.show("note-editor-modal");
}

form.addEventListener("submit", handleAddNewNote);
list.addEventListener("click", removeListItem);
search.addEventListener("input", handleSearch);
openEditorModalBtn.addEventListener("click", handleOpenEditor);
