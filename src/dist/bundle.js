(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class JamBuddy {
  constructor() {
    this.currentSelectedNotes = [];
    this.scale = [
      "A",
      ["A#", "Bb"],
      "B",
      "C",
      ["C#", "Db"],
      "D",
      ["D#", "Eb"],
      "E",
      "F",
      ["F#", "Gb"],
      "G",
      ["G#", "Ab"],
    ];
    this.streak = 0;
  }

  randomNoteSelector(arrayInput) {
    let outputNotes = arrayInput
      .slice(0)
      .sort(() => Math.random() - Math.random())
      .slice(0, 2);

    for (let i = 0; i < outputNotes.length; i++) {
      if (Array.isArray(outputNotes[i])) {
        outputNotes[i] = outputNotes[i]
          .slice(0)
          .sort(() => Math.random() - Math.random())
          .slice(0, 1)
          .join();
      }
    }
    return outputNotes;
  }

  selectNotes() {
    this.currentSelectedNotes = this.randomNoteSelector(this.scale);
    return this.currentSelectedNotes;
  }

  noteDistance() {
    let firstNotePosition = 0;
    let secondNotePosition = 0;
    for (let i = 0; i < this.scale.length; i++) {
      if (
        this.currentSelectedNotes[0] === this.scale[i] ||
        this.currentSelectedNotes[0] === this.scale[i][0] ||
        this.currentSelectedNotes[0] === this.scale[i][1]
      ) {
        firstNotePosition = i;
      } else if (
        this.currentSelectedNotes[1] === this.scale[i] ||
        this.currentSelectedNotes[1] === this.scale[i][0] ||
        this.currentSelectedNotes[1] === this.scale[i][1]
      ) {
        secondNotePosition = i;
      }
    }
    if (firstNotePosition > secondNotePosition) {
      secondNotePosition = secondNotePosition + 12;
    }
    let noteDistance = 0;
    if (firstNotePosition - secondNotePosition > 0) {
      noteDistance = firstNotePosition - secondNotePosition;
    } else {
      noteDistance = secondNotePosition - firstNotePosition;
    }
    return noteDistance;
  }

  checkAnswer(num) {
    return this.noteDistance() === num;
  }
}

module.exports = { JamBuddy };

},{}],2:[function(require,module,exports){
const { JamBuddy } = require("./jam_buddy_class.js");
const buddy = new JamBuddy();

const DOMEvents = {
  displayNewNotes() {
    const notes = buddy.selectNotes();
    document.querySelector(".first-note").textContent = notes[0];
    document.querySelector(".second-note").textContent = notes[1];
    return notes;
  },

  generateNewNotes() {
    document
      .querySelector(".generate-notes-button")
      .addEventListener("click", function () {
        DOMEvents.displayNewNotes();
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
      DOMEvents.displayNewNotes();
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

DOMEvents.displayNewNotes();
DOMEvents.generateNewNotes();
DOMEvents.validateInput();

module.exports = { DOMEvents };

},{"./jam_buddy_class.js":1}]},{},[1,2]);
