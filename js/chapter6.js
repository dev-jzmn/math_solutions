import { solutions } from "../data/solutions.js";

const sectionContainer = document.getElementById("section-6-1");

const sectionProblems = solutions.filter(item =>
    item.chapter === 6 &&
    item.section === "6.1"
);

sectionProblems.forEach(item => {
    const link = document.createElement("a");

    link.href =
        `problem.html?chapter=${item.chapter}&section=${item.section}&problem=${item.problem}`;

    link.textContent =
        `Problem ${item.problem}`;
        
    link.classList.add("problem-link");

    // append problem links
    sectionContainer.appendChild(link);
});