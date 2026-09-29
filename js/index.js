import { chapters } from "../data/chapters.js";

const chapterList = document.getElementById("chapter-list");

Object.entries(chapters).forEach(([chapterNumber, chapterInfo]) => {
    const link = document.createElement("a");

    link.href = `chapter.html?chapter=${chapterNumber}`;
    link.textContent =
        `Chapter ${chapterNumber} — ${chapterInfo.title}`;

    link.classList.add("chapter-link");

    chapterList.appendChild(link);
});