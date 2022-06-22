const { document } = require("./jsdom_setup.js");
const { DOMEvents } = require("../src/jam_buddy_dom_manipulation.js");

describe("The displayNotes method of the JamBuddy class", () => {
  it("should display notes to the browser by modifying the default copy", () => {
    DOMEvents.displayNotes();
    expect(document.querySelector(".first-note").textContent).not.toBe(
      "First Note"
    );
    expect(document.querySelector(".second-note").textContent).not.toBe(
      "Second Note"
    );
  });
});

describe("The submit-button", () => {
  it("should trigger a message to confirm the validity of the user's input", () => {
    document.querySelector(".input").value = 5;

    const button = document.querySelector(".submit-button");
    button.click();

    const output = document.querySelector(".validation").textContent;

    expect(output).not.toBe("");
  });
});
