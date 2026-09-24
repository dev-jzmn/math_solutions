import { solutions } from "../data/solutions.js";

const params = new URLSearchParams(window.location.search);

const chapter = Number(params.get("chapter"));
const section = params.get("section");
const problemNumber = Number(params.get("problem"));

console.log(chapter);
console.log(section);
console.log(problemNumber);

// load problems from soultions.js
function loadProblem() {
    const solution = solutions.find(item =>
        item.chapter === chapter &&
        item.section === section &&
        item.problem === problemNumber
    );

    if (!solution) {
        document.getElementById("problem-title").textContent =
            "Solution not found";
        return; 
    }

    
    document.getElementById("problem-title").textContent =
        `Section ${section} — Problem ${problemNumber}`;

    document.getElementById("problem-prompt").textContent =
    solution.prompt;

    document.getElementById("problem-expression").textContent =
    `\\[${solution.expression}\\]`;

    document.getElementById("answer").textContent =
        solution.answer;

    document.getElementById("hint").textContent =
        solution.hint;

    const stepsContainer = document.getElementById("steps");

    solution.steps.forEach((step, index) => {
        const stepDiv = document.createElement("div");

        stepDiv.classList.add("solution-step");

        stepDiv.innerHTML = `
            <h3>Step ${index + 1}</h3>
            <p>${step.text}</p>
            <p>\\[${step.math}\\]</p>
        `;

        stepsContainer.appendChild(stepDiv);
    });

    document.getElementById("common-mistake").textContent =
        solution.commonMistake ?? "None";

    MathJax.typesetPromise();
}

// buttons for hints/answers/solutions
function setupToggle(buttonId, boxId, showText, hideText) {
    const button = document.getElementById(buttonId);
    const box = document.getElementById(boxId);

    button.addEventListener("click", function () {
        box.hidden = !box.hidden;

        if (box.hidden) {
            button.textContent = showText;
        } else {
            button.textContent = hideText;
        }
    });
}

// previous / next question navigation
const sectionProblems = solutions
    .filter(item =>
        item.chapter === chapter &&
        item.section === section
    )
    .sort((a, b) => a.problem - b.problem);

const currentIndex = sectionProblems.findIndex(
    item => item.problem === problemNumber
);

const previousLink = document.getElementById("previous-problem");
const nextLink = document.getElementById("next-problem");

if (currentIndex > 0) {
    const previous = sectionProblems[currentIndex - 1];

    previousLink.href =
        `problem.html?chapter=${previous.chapter}` +
        `&section=${previous.section}` +
        `&problem=${previous.problem}`;

    previousLink.textContent =
        `← Problem ${previous.problem}`;
} else {
    previousLink.style.visibility = "hidden";
}

if (currentIndex < sectionProblems.length - 1) {
    const next = sectionProblems[currentIndex + 1];

    nextLink.href =
        `problem.html?chapter=${next.chapter}` +
        `&section=${next.section}` +
        `&problem=${next.problem}`;

    nextLink.textContent =
        `Problem ${next.problem} →`;
} else {
    nextLink.style.visibility = "hidden";
}

setupToggle(
    "hint-button",
    "hint-box",
    "Show Hint",
    "Hide Hint"
);

setupToggle(
    "answer-button",
    "answer-box",
    "Show Answer",
    "Hide Answer"
);

setupToggle(
    "solution-button",
    "solution-box",
    "Show Full Solution",
    "Hide Full Solution"
);

loadProblem();