const { JamBuddy } = require("./jam_buddy_class.js");
const buddy = new JamBuddy();

const DOMEvents = {
  displayNotes() {
    const notes = buddy.selectNotes();
    document.querySelector(".first-note").textContent = notes[0];
    document.querySelector(".second-note").textContent = notes[1];
    return notes;
  },

  generateNewNotes() {
    document
      .querySelector(".generate-notes-button")
      .addEventListener("click", function () {
        DOMEvents.displayNotes();
        document.querySelector(".input").value = "";
        document.querySelector(".validation").textContent = "";
      });
  },

  streakCounter() {
    if (
      document.querySelector(".validation").textContent ===
      "You got it right. Well Done!"
    ) {
      console.log("MET");
      buddy.streak++;
    } else {
      console.log("not met");
      buddy.streak = 0;
    }
    document.querySelector(".streak").textContent = `Streak: ${buddy.streak}`;
  },

  validateInput() {
    document
      .querySelector(".submit-button")
      .addEventListener("click", function () {
        if (!Number(document.querySelector(".input").value)) {
          document.querySelector(".validation").textContent =
            "Invalid Input! Your input should be a number.";
        } else if (
          Number(document.querySelector(".input").value) ===
          buddy.noteDistance()
        ) {
          document.querySelector(".validation").textContent =
            "You got it right. Well Done!";
        } else {
          buddy.streak = 0;
          document.querySelector(".validation").textContent =
            "Wrong answer! Try again";
        }
        DOMEvents.streakCounter();
      });
  },
};

DOMEvents.displayNotes();
DOMEvents.generateNewNotes();
DOMEvents.validateInput();

module.exports = { DOMEvents };
