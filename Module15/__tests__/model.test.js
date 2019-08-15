import Notepad from "../js/script";

const initialNotes = [
  {
    id: "id-1",
    title: "JavaScript essentials",
    body:
      "Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc",
    priority: 2
  },
  {
    id: "id-2",
    title: "Refresh HTML and CSS",
    body:
      "Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.",
    priority: 1
  },
  {
    id: "id-3",
    title: "Get comfy with Frontend frameworks",
    body:
      "First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.",
    priority: 1
  },
  {
    id: "id-4",
    title: "Winter clothes",
    body:
      "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: 0
  }
];

describe("Notepad", () => {
  let notepad;
  beforeEach(() => {
    notepad = new Notepad(initialNotes);
  });

  it("has initial notes", () => {
    expect(notepad._notes).toEqual(initialNotes);
  });

  it("geter test", () => {
    expect(notepad.notes).toEqual(initialNotes);
  });

  it("find note by id", () => {
    const note = notepad.findNoteById("id-2");
    expect(note).toEqual(initialNotes.find(el => el.id === "id-2"));
  });

  it("add note to Notepad", () => {
    const note = initialNotes[0];
    expect(notepad.saveNote(note)).toHaveProperty("id");
  });

  it("delete note from Notepad", () => {
    notepad.deleteNote("id-1");
    expect(notepad._notes).not.toHaveProperty("id-1");
  });

  it("update note priority", () => {
    notepad.updateNotePriority("id-2", 2);
    expect(notepad._notes.find(el => el.id === "id-2").priority).toBe(2);
  });

  it("update note content", () => {
    notepad.updateNoteContent("id-3", { title: "New title" });
    expect(notepad._notes.find(el => el.id === "id-3").title).toBe("New title");
  });

  it("filter note by priority", () => {
    notepad.filterNotesByPriority(1);
    expect(notepad._notes.filter(el => el.priority === 1).length).toBe(1);
  });

  it("filter note by query", () => {
    const note = notepad.filterNotesByQuery("New title");
    expect(note[0].id).toBe("id-3");
  });
});
