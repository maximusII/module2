'use strict';

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

const ICON_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  ARROW_DOWN: 'expand_more',
  ARROW_UP: 'expand_less',
};

const NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority',
};

const generateUniqueId = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

class Notepad {
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

const initialNotes = [
  {
    id: 'id-1',
    title: 'JavaScript essentials',
    body:
      'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: PRIORITY_TYPES.HIGH,
  },
  {
    id: 'id-2',
    title: 'Refresh HTML and CSS',
    body:
      'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-3',
    title: 'Get comfy with Frontend frameworks',
    body:
      'First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-4',
    title: 'Winter clothes',
    body:
      "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: PRIORITY_TYPES.LOW,
  },
];

const notepad = new Notepad(initialNotes);

const list = document.querySelector('.note-list');

const form = document.querySelector('.note-editor');

const search = document.querySelector('.search-form');

function createNoteContent({ title, body }) {
  const noteContent = document.createElement('div');
  noteContent.classList.add('note__content');
  const noteTitle = document.createElement('h2');
  noteTitle.classList.add('note__title');
  noteTitle.textContent = title;
  const noteBody = document.createElement('p');
  noteBody.classList.add('note__body');
  noteBody.textContent = body;
  noteContent.appendChild(noteTitle);
  noteContent.appendChild(noteBody);
  return noteContent;
}

function createActionButton(actionType) {
  const button = document.createElement('button');
  button.classList.add('action');
  const icon = document.createElement('i');
  icon.classList.add('material-icons');
  icon.classList.add('action__icon');
  if (actionType === 'DELETE') {
    button.dataset.action = NOTE_ACTIONS.DELETE;
    icon.textContent = ICON_TYPES.DELETE;
  }
  if (actionType === 'EDIT') {
    button.dataset.action = NOTE_ACTIONS.EDIT;
    icon.textContent = ICON_TYPES.EDIT;
  }
  if (actionType === 'INCREASE_PRIORITY') {
    button.dataset.action = NOTE_ACTIONS.INCREASE_PRIORITY;
    icon.textContent = ICON_TYPES.ARROW_UP;
  }
  if (actionType === 'DECREASE_PRIORITY') {
    button.dataset.action = NOTE_ACTIONS.DECREASE_PRIORITY;
    icon.textContent = ICON_TYPES.ARROW_DOWN;
  }
  button.appendChild(icon);
  return button;
}

function createNoteFooter({ priority }) {
  const footer = document.createElement('footer');
  footer.classList.add('note__footer');
  const section = document.createElement('section');
  section.classList.add('note__section');
  const btnDecrease = createActionButton('DECREASE_PRIORITY');
  const btnIncrease = createActionButton('INCREASE_PRIORITY');
  const notePriority = document.createElement('span');
  notePriority.classList.add('note__priority');
  notePriority.textContent = priority;
  const section2 = section.cloneNode(false);
  const btnEdit = createActionButton('EDIT');
  const btnDel = createActionButton('DELETE');
  section.appendChild(btnDecrease);
  section.appendChild(btnIncrease);
  section.appendChild(notePriority);
  section2.appendChild(btnEdit);
  section2.appendChild(btnDel);
  footer.appendChild(section);
  footer.appendChild(section2);
  return footer;
}

function createListItem({ id, title, body, priority }) {
  const listItem = document.createElement('li');
  listItem.classList.add('note-list__item');
  listItem.dataset.id = id;
  const noteCard = document.createElement('div');
  noteCard.classList.add('note');
  const noteCont = createNoteContent({ title, body });
  const noteFoot = createNoteFooter({ priority });

  noteCard.append(noteCont);
  noteCard.append(noteFoot);
  listItem.appendChild(noteCard);
  return listItem;
}

function renderNoteList(listRef, notes) {
  const listItems = notes.map(item => createListItem(item));
  listRef.innerHTML = '';
  listRef.append(...listItems);
  return listRef;
}

const handleAddNewNote = event => {
  event.preventDefault();
  const inputs = form.querySelectorAll('.note-editor__input');
  const inputTitle = inputs[0];
  const inputBody = inputs[1];
  const title = inputTitle.value;
  const body = inputBody.value;
  if (title.trim() === '' || body.trim() === '') {
    return alert('All fields must be completed!');
  }
  const id = generateUniqueId();
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
  const button = target.closest('button');
  if (button.dataset.action === 'delete-note') {
    const listItem = button.closest('.note-list__item');
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

form.addEventListener('submit', handleAddNewNote);

list.addEventListener('click', removeListItem);

search.addEventListener('input', handleSearch);

renderNoteList(list, notepad.notes);
