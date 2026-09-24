import { solutions } from "../data/solutions.js";

const form = document.getElementById("problem-search");
const input = document.getElementById("search-input");
const message = document.getElementById("search-message");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const searchText = input.value.trim();

    const cleanedText = searchText.replace("#", "");
    const parts = cleanedText.split(/\s+/);

    const section = parts[0];
    const problemNumber = Number(parts[1]);

    const solution = solutions.find(item =>
        item.section === section &&
        item.problem === problemNumber
    );

    if (solution) {
        window.location.href =
            `problem.html?chapter=${solution.chapter}` +
            `&section=${solution.section}` +
            `&problem=${solution.problem}`;
    } else {
        message.textContent = "Problem not found.";
    }
});