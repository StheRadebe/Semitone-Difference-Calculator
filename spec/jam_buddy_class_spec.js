const { JamBuddy } = require("../src/jam_buddy_class.js");
const buddy = new JamBuddy();

describe("The selectNotes method of the JamBuddy class", () => {
  it("should return an array of 2 notes", () => {
    expect(typeof buddy.selectNotes).toBe(typeof Array);
    expect(buddy.selectNotes()).toHaveSize(2);
  });
  const notes = buddy.selectNotes();
  const currentSelectedNotes = buddy.currentSelectedNotes;
  it("should have its output stored in the currentSelectedNotes variable", () => {
    expect(notes).toEqual(currentSelectedNotes);
  });
});

describe("The checkAnswer method of the JamBuddy class", () => {
  const userInput = 2;
  buddy.currentSelectedNotes = ["A#", "A"];
  const firstCheck = buddy.checkAnswer(11);
  const secondCheck = buddy.checkAnswer(2);
  it("should return true/false if the distance between the 2 selected notes matches the value selected by the user", () => {
    expect(buddy.noteDistance() === userInput).toEqual(
      buddy.checkAnswer(userInput)
    );
  });
  it("should return true when it is called with the correct distance as a parameter", () => {
    expect(firstCheck).toBe(true);
  });
  it("should return false when it is called with the incorrect distance as a parameter", () => {
    expect(secondCheck).toBe(false);
  });
});
