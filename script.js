
// Custom Text Glitching Effect

// 1. Select the element by its ID
const mySpan = document.getElementById('header');

// 2. Get the current text content
const currentText = mySpan.innerText;
var originalText = currentText;
var bool = true;

// Make a dictionary where each letter has at least on counterpart to switch to, then switch a random one
let alternateLettersDict = {
    "B" : ["β", "ϴ"],
    "E" : ["Ԑ"],
    "N" : ["Ŋ"],
    "R" : ["Ҏ"],
    "S" : ["$"],
    "T" : ["₸"],
    "W" : ["Ш"], 
    " " : ["_"],
}

function randomIntInclusive(min, max) {
    min = Math.ceil(min); 
    max = Math.floor(max); 
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function alterOneCharacter(originalInputText, currentInputText) {

    let coinflip = Math.random();
    if (coinflip > 0.5) {
        return currentInputText;
    }

    let rand = randomIntInclusive(0, originalInputText.length-1);

    if (rand != originalInputText.length) {
        stringStart = originalInputText.slice(0, rand);
        stringEnd = originalInputText.slice(rand + 1, originalInputText.length);
    } else {
        stringStart = originalInputText.slice(0, rand-1);
        stringEnd = "";
    }
    let replacedChar = originalInputText[rand];
    let replacingChar = alternateLettersDict[replacedChar]
        ? alternateLettersDict[replacedChar][0]
        : replacedChar;
    let stringCombined = stringStart + replacingChar + stringEnd;

    console.log(stringCombined);
    console.log(rand);
    console.log("replaced: "+ replacedChar + " with " + replacingChar + " at index " + rand);
    return stringCombined;
}

function updateText() {
    // if (bool) {
    //     mySpan.innerText = "TEST";
    //     console.log("updating to TEST");
    // }
    // else {
    //     mySpan.innerText = originalText;
    //     console.log("updating to 'originalText'");
    // }
    // bool = !bool;


    // let rand = randomIntInclusive(0, originalText.length);

    // Computes both halves of the string and combines them
    // if (rand != originalText.length) {
    //     stringStart = mySpan.innerText.slice(0, rand)
    //     stringEnd = mySpan.innerText.slice(rand + 1, originalText.length)
    // } else {
    //     stringStart = mySpan.innerText.slice(0, rand-1)
    //     stringEnd = ""
    // }
    // replacedChar = mySpan.innerText[rand];
    // replacingChar = alternateLettersDict[replacedChar][0];
    // stringCombined = stringStart + replacingChar + stringEnd

    // console.log(stringCombined)
    // console.log("replaced: "+ replacedChar + " with " + replacingChar + " at index " + rand);
    // mySpan.innerText = stringCombined;
    alteredText = alterOneCharacter(originalText, currentText);
    console.log(alteredText);
    mySpan.innerText = alteredText;

}

// Makes this run once per 2000ms 
setInterval(updateText, 750);