const params = new URLSearchParams(window.location.search);

const chapter = Number(params.get("chapter"));
const section = params.get("section");
const problemNumber = Number(params.get("problem"));

console.log(chapter);
console.log(section);
console.log(problemNumber);

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

    document.getElementById("answer").textContent =
        solution.answer;

    document.getElementById("hint").textContent =
        solution.hint;

    const stepsContainer = document.getElementById("steps");

    solution.steps.forEach((step, index) => {
        const stepDiv = document.createElement("div");

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

loadProblem();