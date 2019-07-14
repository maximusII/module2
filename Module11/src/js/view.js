import {
  PRIORITY_TYPES,
  NOTIFICATION_MESSAGES,
  NOTE_ACTIONS,
  ICON_TYPES
} from "./utils/constants";
import noteTemplate from "../templates/note.hbs";
import initialNotes from "../assets/notes.json";

const root = document.querySelector(".note-list");
const markup = noteTemplate(initialNotes);

export function createNoteContent({ title, body }) {
  const noteContent = document.createElement("div");
  noteContent.classList.add("note__content");
  const noteTitle = document.createElement("h2");
  noteTitle.classList.add("note__title");
  noteTitle.textContent = title;
  const noteBody = document.createElement("p");
  noteBody.classList.add("note__body");
  noteBody.textContent = body;
  noteContent.appendChild(noteTitle);
  noteContent.appendChild(noteBody);
  return noteContent;
}

export function createActionButton(actionType) {
  const button = document.createElement("button");
  button.classList.add("action");
  const icon = document.createElement("i");
  icon.classList.add("material-icons");
  icon.classList.add("action__icon");
  if (actionType === "DELETE") {
    button.dataset.action = NOTE_ACTIONS.DELETE;
    icon.textContent = ICON_TYPES.DELETE;
  }
  if (actionType === "EDIT") {
    button.dataset.action = NOTE_ACTIONS.EDIT;
    icon.textContent = ICON_TYPES.EDIT;
  }
  if (actionType === "INCREASE_PRIORITY") {
    button.dataset.action = NOTE_ACTIONS.INCREASE_PRIORITY;
    icon.textContent = ICON_TYPES.ARROW_UP;
  }
  if (actionType === "DECREASE_PRIORITY") {
    button.dataset.action = NOTE_ACTIONS.DECREASE_PRIORITY;
    icon.textContent = ICON_TYPES.ARROW_DOWN;
  }
  button.appendChild(icon);
  return button;
}

export function createNoteFooter({ priority }) {
  const footer = document.createElement("footer");
  footer.classList.add("note__footer");
  const section = document.createElement("section");
  section.classList.add("note__section");
  const btnDecrease = createActionButton("DECREASE_PRIORITY");
  const btnIncrease = createActionButton("INCREASE_PRIORITY");
  const notePriority = document.createElement("span");
  notePriority.classList.add("note__priority");
  notePriority.textContent = priority;
  const section2 = section.cloneNode(false);
  const btnEdit = createActionButton("EDIT");
  const btnDel = createActionButton("DELETE");
  section.appendChild(btnDecrease);
  section.appendChild(btnIncrease);
  section.appendChild(notePriority);
  section2.appendChild(btnEdit);
  section2.appendChild(btnDel);
  footer.appendChild(section);
  footer.appendChild(section2);
  return footer;
}

export function createListItem({ id, title, body, priority }) {
  const listItem = document.createElement("li");
  listItem.classList.add("note-list__item");
  listItem.dataset.id = id;
  const noteCard = document.createElement("div");
  noteCard.classList.add("note");
  const noteCont = createNoteContent({ title, body });
  const noteFoot = createNoteFooter({ priority });

  noteCard.append(noteCont);
  noteCard.append(noteFoot);
  listItem.appendChild(noteCard);
  return listItem;
}

export function renderNoteList(listRef, notes) {
  const listItems = notes.map(item => createListItem(item));
  listRef.innerHTML = "";
  listRef.append(...listItems);
  return listRef;
}

export function templateMarkup() {
  root.innerHTML = markup;
}
