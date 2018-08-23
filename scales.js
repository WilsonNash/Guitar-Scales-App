const majorScale = [0,2,4,5,7,9,11];
const pentatonicMajor = [0,2,4,7,9];
const naturalMinor = [0,2,3,5,7,8,10];
const harmonicMinor = [0,2,3,5,7,8,11];
const pentatonicMinor = [0,3,5,7,10];
const dorian = [0,2,3,5,7,9,10];
const mixolydian = [0,2,4,5,7,9,10];
var keyNum;
var scaleNum;
var modeSelected;
var chromaticScale;
var newScale;
var radios = document.getElementsByTagName("input");
var keyButtons = document.forms["keyButtons"].elements["key"];
var scaleButtons = document.forms["scaleButtons"].elements["scale"];
var radioButtons = document.querySelectorAll('.btn');
var noteIcons = document.querySelectorAll('.note');

/*checks all the key buttons to see which one is selected*/
function getKeyNum() {
  for(var k = 0, max = keyButtons.length; k < keyButtons.length; k++) {
    if (keyButtons[k].name === 'key' && keyButtons[k].checked == true) {
      keyNum = keyButtons[k].value;
    }
  }
}

/*checks all the scale buttons to see which one is selected*/
function getScaleNum() {
  for(var s = 0, max = scaleButtons.length; s < max; s++) {
    if (scaleButtons[s].name === 'scale' && scaleButtons[s].checked == true) {
      scaleNum = scaleButtons[s].value;
    }
  }
}

/*gets the mode selected based on the scaleNum which is the
index number of the selected mode in the arrayOfAllScales*/
function getModeSelected() {
    var arrayOfAllScales = [majorScale, pentatonicMajor, naturalMinor, harmonicMinor, pentatonicMinor, dorian, mixolydian];
    modeSelected = arrayOfAllScales[scaleNum];
}

/*gets the chromatic scale for the selected key based on keyNum.
keyNum is the index number of the selected key in the keyButtons array*/
function chromaticScaleForKey() {
  arrayOfAllNotes = ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"];
  var travelNotes = arrayOfAllNotes.splice(keyNum);
  chromaticScale = travelNotes.concat(arrayOfAllNotes);
}

/*adds the appropriate notes to display into an array called newScale*/
function getTheNotes(theChromaticScaleForKey, scaleIndices) {
  newScale = [];
	for (var i = scaleIndices.length -1; i >= 0; i--) {
    var noteToAdd = theChromaticScaleForKey[scaleIndices[i]];
    newScale.push(noteToAdd);
	}
  newScale.reverse();
}

/*hides the notes that shouldn't be displayed*/
function hideTheBadNotes(notesOnFretBoard, notesToDisplay) {
  for (n = 0; n < notesOnFretBoard.length; n++) {
    notesOnFretBoard[n].style.background = "rgba(255,255,255,0.0)";
    notesOnFretBoard[n].style.color = "rgba(255,255,255,0.0)";
    for (g = 0; g < notesToDisplay.length; g++) {
      if (notesOnFretBoard[n].innerHTML == notesToDisplay[g]) {
        notesOnFretBoard[n].style.color = "white";
        notesOnFretBoard[n].style.background = "#3a2a22";
      }
    }
  }
}

/*invoking functions for initial page load*/
getKeyNum();
getScaleNum();
chromaticScaleForKey(keyNum);
getModeSelected();
getTheNotes(chromaticScale, modeSelected);
hideTheBadNotes(noteIcons, newScale);

/*invoking functions each time a button is pressed*/
for (var i = 0; i < radioButtons.length; i++) {
  radioButtons[i].onclick = function() {
  getKeyNum();
  getScaleNum();
  chromaticScaleForKey(keyNum);
  getModeSelected();
  getTheNotes(chromaticScale, modeSelected);
  hideTheBadNotes(noteIcons, newScale);
  }
}
