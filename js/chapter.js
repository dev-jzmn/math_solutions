import { solutions } from "../data/solutions.js";
import { chapters } from "../data/chapters.js";

const params = new URLSearchParams(window.location.search);

const chapterNumber = Number(params.get("chapter"));
const sectionNumber = Number(params.get("section"));

const chapterInfo = chapters[chapterNumber];

if (!chapterInfo) {
    document.getElementById("chapter-title").textContent =
        "Chapter not found";

    document.getElementById("chapter-content").textContent =
        "The requested chapter does not exist.";
} else {
    document.getElementById("chapter-title").textContent =
        `Chapter ${chapterNumber} — ${chapterInfo.title}`;

    const chapterContent =
    document.getElementById("chapter-content");

    const chapterProblems = solutions
        .filter(item => item.chapter === chapterNumber)
        .sort((a, b) => {
            if (a.section !== b.section) {
                return Number(a.section) - Number(b.section);
            }

            return a.problem - b.problem;
        });

    const sections = {};


    document.getElementById("chapter-title").textContent =
        `Chapter ${chapterNumber} — ${chapterInfo.title}`;
    const sectionTitle =
        chapterInfo.sections[sectionNumber];

    chapterProblems.forEach(item => {
        if (!sections[item.section]) {
            sections[item.section] = {
                title: item.sectionTitle,
                problems: []
            };
        }

        sections[item.section].problems.push(item);
    });

    Object.entries(sections).forEach(([sectionNumber, sectionData]) => {
        const sectionElement = document.createElement("section");
        sectionElement.id =
            `section-${sectionNumber.replace(".", "-")}`;
        const heading = document.createElement("h2");

        heading.textContent =
        `${sectionNumber} — ${chapterInfo.sections[sectionNumber]}`;

        sectionElement.appendChild(heading);

        const problemList = document.createElement("div");

        problemList.classList.add("problem-list");

        sectionData.problems.forEach(item => {
            const link = document.createElement("a");

            link.href =
                `problem.html?chapter=${item.chapter}` +
                `&section=${item.section}` +
                `&problem=${item.problem}`;

            link.textContent = `Problem ${item.problem}`;
            link.classList.add("problem-link");

            problemList.appendChild(link);
        });

        sectionElement.appendChild(problemList);

        chapterContent.appendChild(sectionElement);
    });
}

