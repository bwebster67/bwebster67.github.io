
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
// Project content typing animation using typed.js
// 
// 

// --- CONFIGURATION ---
const typeSpeed = 10;
const startDelay = 100;

// A Map to store Typed instances for each card, so we can manage them.
const cardAnimationState = new Map();

/**
 * Resets the animation for a specific card.
 * @param {HTMLElement} card The project card element to reset.
 */
function resetAnimationForCard(card) {
    if (cardAnimationState.has(card)) {
        const instances = cardAnimationState.get(card);
        instances.forEach(t => t.destroy());
        cardAnimationState.delete(card);
    }
    // // Clear the HTML content
    // card.querySelector('h1').innerHTML = '';
    // card.querySelector('p').innerHTML = '';
    // card.querySelector('h3').innerHTML = '';
    // card.querySelector('pre').innerHTML = '';
}

/**
 * Plays the full, chained animation for a specific card.
 * @param {HTMLElement} card The project card element to animate.
 */
function playAnimationForCard(card) {
    resetAnimationForCard(card);

    const h1Target = card.querySelector('h1 .type-target');
    const pTarget = card.querySelector('p .type-target');
    const h3Target = card.querySelector('h3 .type-target');
    const preTarget = card.querySelector('pre .type-target');

    const h1Text = card.dataset.h1 || '';
    const pText = card.dataset.p || '';
    const h3Text = card.dataset.h3 || '';
    const preText = (card.dataset.pre || '').split('|').join('\n');
    
    let typedInstances = [];
    cardAnimationState.set(card, typedInstances);

    const typeH1 = new Typed(h1Target, {
        strings: [h1Text], typeSpeed: typeSpeed * 3, showCursor: false,
        onComplete: () => typeDescription()
    });

    function typeDescription() {
        const typeP = new Typed(pTarget, {
            strings: [pText], typeSpeed: typeSpeed, startDelay: startDelay, cursorChar: '█',
            onComplete: (self) => {
                self.cursor.style.display = 'none';
                typeTechStackHeader();
            }
        });
        typedInstances.push(typeP);
    }
    function typeTechStackHeader() {
        const typeH3 = new Typed(h3Target, {
            strings: [h3Text], typeSpeed: typeSpeed, startDelay: startDelay, cursorChar: '█',
            onComplete: (self) => {
                self.cursor.style.display = 'none';
                typePreBlock();
            }
        });
        typedInstances.push(typeH3);
    }
    function typePreBlock() {
        const typePre = new Typed(preTarget, {
            strings: [preText], typeSpeed: typeSpeed, startDelay: startDelay, cursorChar: '█', loop: false,
            onComplete: (self) => self.cursor.style.display = 'none'
        });
        typedInstances.push(typePre);
    }
    
    typedInstances.push(typeH1);
}

// --- TRIGGER LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    // This flag tracks if the initial scroll animation has happened yet.
    let hasScrolledIntoView = false;

    const projectCards = document.querySelectorAll('.project-content');

    // --- Part 1: MutationObserver for Active State Changes ---
    const mutationObserverConfig = { attributes: true, attributeFilter: ['class'] };

    projectCards.forEach(card => {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.attributeName === 'class') {
                    const cardElement = mutation.target;
                    // ONLY play the animation if the initial scroll has already happened.
                    if (cardElement.classList.contains('active')) {
                        playAnimationForCard(cardElement);
                    } else {
                        resetAnimationForCard(cardElement);
                    }
                }
            }
        });
        observer.observe(card, mutationObserverConfig);
    });

    // --- Part 2: IntersectionObserver for the Initial Scroll ---
    const intersectionObserverOptions = { threshold: 1 };
    
    // We only need to observe one element, like the first project card,
    // to know when the whole section is visible.
    const firstProjectCard = document.querySelector('.project-content');

    if (firstProjectCard) {
        const intersectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Set the flag to true so the MutationObserver can now take over.
                    hasScrolledIntoView = true;

                    // Find which card is currently active and play its animation.
                    const activeCard = document.querySelector('.project-content.active');
                    if (activeCard) {
                        playAnimationForCard(activeCard);
                    }

                    // Disconnect this observer; its job is done.
                    observer.disconnect();
                }
            });
        }, intersectionObserverOptions);

        intersectionObserver.observe(firstProjectCard);
    }
});
