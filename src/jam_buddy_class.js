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
