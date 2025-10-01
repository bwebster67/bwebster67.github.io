
// Custom Text Glitching Effect

// 1. Select the element by its ID
const mySpan = document.getElementById('header');

//
const projectCard = document.getElementById('universal-project-card');

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

    // console.log(rand);
    // console.log("replaced: "+ replacedChar + " with " + replacingChar + " at index " + rand);
    return stringCombined;
}

function updateText() {
    alteredText = alterOneCharacter(originalText, currentText);
    alteredText = alterOneCharacter(alteredText, currentText);
    // console.log(alteredText);
    mySpan.innerText = alteredText;

}

// Makes glitch text run once per X miliseconds 
setInterval(updateText, 750);







let projectIDs = {
    0 : 'pedalogical',
    1 : 'gjk',
    2 : 'sha',
    3 : 'nav',
    4 : 'msb',
}

function loadProjectCard(index) {
    // console.log("BLAAAAAAA");
    console.log(index);
}


const projectLabels = document.querySelectorAll('.project-label');
console.log(projectLabels)
const projectContents = document.querySelectorAll('.project-content');
let currentlySelectedLabel = projectLabels[0]; 
let currentlySelectedIndex = 0;
currentlySelectedLabel.classList.add('selected');
const targetContent = document.getElementById(projectLabels[currentlySelectedIndex].getAttribute('data-project')); 
if (targetContent) {
    targetContent.classList.add('active');
}
loadProjectCard(currentlySelectedIndex);

// Defines the function to happen on click
projectLabels.forEach((label, index) => {
            label.addEventListener('click', () => {

                const targetId = label.getAttribute('data-project');
                const targetContent = document.getElementById(targetId); 

                // First, remove the 'selected' class from all labels
                projectLabels.forEach(l => l.classList.remove('selected'));
                projectContents.forEach(c => c.classList.remove('active'));

                // Then, add the 'selected' class to the one that was just clicked
                label.classList.add('selected');
                
                // And add 'active' to the corresponding content to show it
                if (targetContent) {
                    targetContent.classList.add('active');
                }

                // Update our variable and log the selected item's text to the console
                currentlySelectedLabel = label;
                currentlySelectedIndex = index;
                console.log('Currently selected:', currentlySelectedLabel.textContent, ' at ' + index);
                // loadProjectCard(currentlySelectedIndex);
            });
        });


// 
// 
// TEST typed.js
// 
// 

// --- CONFIGURATION ---
// Set your desired speed here. Lower number = faster typing.
const typeSpeed = 30; // 30ms is fast and readable
const startDelay = 100;

// --- ANIMATION FUNCTIONS ---
// All functions are now defined here, in one place.

// An object to hold our Typed instances so we can destroy them later
let typedInstances = [];

// Function to clear previous content and animations
function resetPedalogicalAnimation() {
    typedInstances.forEach(t => t.destroy());
    typedInstances = [];
    document.getElementById('type-h1').innerHTML = '';
    document.getElementById('type-p').innerHTML = '';
    document.getElementById('type-h3').innerHTML = '';
    document.getElementById('type-pre').innerHTML = '';
}

// Main function to start the entire animation chain
function playPedalogicalAnimation() {
    resetPedalogicalAnimation();

    const typeH1 = new Typed('#type-h1', {
        strings: ['PEDALOGICAL'],
        typeSpeed: typeSpeed, // Using your variable
        showCursor: false,
        onComplete: () => typeDescription()
    });

    function typeDescription() {
        const typeP = new Typed('#type-p', {
            strings: ['A brief but engaging description of the project goes here.'],
            typeSpeed: typeSpeed, // Using your variable
            startDelay: startDelay,
            showCursor: false,
            onComplete: () => typeTechStackHeader()
        });
        typedInstances.push(typeP);
    }
    
    function typeTechStackHeader() {
        const typeH3 = new Typed('#type-h3', {
            strings: ['TECH STACK'],
            typeSpeed: typeSpeed, // Using your variable
            startDelay: startDelay,
            showCursor: false,
            onComplete: () => typePreBlock()
        });
        typedInstances.push(typeH3);
    }

    function typePreBlock() {
        const techStack = `&gt; C#
&gt; HTML/CSS
&gt; .NET
&gt; Blazor
&gt; PostgreSQL`;
        const typePre = new Typed('#type-pre', {
            strings: [techStack],
            typeSpeed: typeSpeed, // Using your variable
            startDelay: startDelay,
            cursorChar: '_',
            loop: false,
            onComplete: (self) => self.cursor.style.display = 'none'
        });
        typedInstances.push(typePre);
    }
    
    typedInstances.push(typeH1);
}


// --- TRIGGER LOGIC ---
// This block now ONLY contains the trigger logic that runs after the page loads.
document.addEventListener('DOMContentLoaded', () => {
    const pedalogicalContainer = document.getElementById('pedalogical');
    const config = { attributes: true, attributeFilter: ['class'] };

    const callback = (mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.attributeName === 'class') {
                if (pedalogicalContainer.classList.contains('active')) {
                    playPedalogicalAnimation(); // Calling the function defined above
                } else {
                    resetPedalogicalAnimation(); // Calling the function defined above
                }
            }
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(pedalogicalContainer, config);

    // Check the initial state on page load
    if (pedalogicalContainer.classList.contains('active')) {
        playPedalogicalAnimation();
    }
});