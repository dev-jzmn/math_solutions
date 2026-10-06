import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://mbupfomfbsrsorcrjlsr.supabase.co";
const supabaseKey = "sb_publishable_XC7ALstTwgtB6zQIHwzTuQ_VOp0LF83";

const supabase = createClient(supabaseUrl, supabaseKey);

import { chapters } from "../data/chapters.js";

const params = new URLSearchParams(window.location.search);

const chapter = Number(params.get("chapter"));
const section = params.get("section");
const problemNumber = Number(params.get("problem"));

console.log(chapter);
console.log(section);
console.log(problemNumber);

// load problems from supabase solution table
async function loadProblem() {
    const { data: solution, error } = await supabase
        .from("solutions")
        .select("*")
        .eq("chapter", chapter)
        .eq("section", section)
        .eq("problem", problemNumber)
        .single();

    console.log("solution:", solution);
    console.log("error:", error);



    if (!solution) {
        document.getElementById("problem-title").textContent =
            "Problem not found";

        document.getElementById("problem-content").textContent =
            "The requested problem does not exist.";

        return;
    }

    if (!chapter || !section || !problemNumber) {
        // invalid URL
        return;
    }

    // get chapter info to show it on the top
    const chapterInfo = chapters[chapter];

    const chapterLink =
        document.getElementById("chapter-link");

    chapterLink.href =
        `chapter.html?chapter=${chapter}` +
        `#section-${section.replace(".", "-")}`;

    chapterLink.textContent =
        `Chapter ${chapter} — ${chapterInfo.title}`;

    document.getElementById("section-name").textContent =
        `${section} — ${chapterInfo.sections[section]}`;


    // set problem info
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
        solution.common_mistake ?? "None";

    const { data: sectionProblems, error: sectionError } = await supabase
        .from("solutions")
        .select("chapter, section, problem")
        .eq("chapter", chapter)
        .eq("section", section)
        .order("problem", { ascending: true });

    if (sectionError) {
        console.error(sectionError);
        return;
    }

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

    MathJax.typesetPromise();
}

// buttons for hints/answers/solutions
async function setupToggle(buttonId, boxId, showText, hideText) {
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

// feedback section
// send the feedback to the feedback table
const openFeedbackButton =
    document.getElementById("open-feedback");

const feedbackSection =
    document.getElementById("feedback-section");

const cancelFeedbackButton =
    document.getElementById("cancel-feedback");

const feedbackButton =
    document.getElementById("submit-feedback");

openFeedbackButton.addEventListener("click", function () {
    feedbackSection.hidden = false;
    openFeedbackButton.hidden = true;
});

cancelFeedbackButton.addEventListener("click", function () {
    feedbackSection.hidden = true;
    openFeedbackButton.hidden = false;
});

feedbackButton.addEventListener("click", async function () {
    const type =
        document.getElementById("feedback-type").value;

    const message =
        document.getElementById("feedback-message").value.trim();

    const statusMessage =
        document.getElementById("feedback-status");

    if (!message) {
        statusMessage.textContent =
            "Please enter a message.";
        return;
    }

    const { error } = await supabase
        .from("feedback")
        .insert({
            type: type,
            chapter: chapter,
            section: section,
            problem: problemNumber,
            message: message
        });

    if (error) {
        console.error("Feedback error:", error);

        statusMessage.textContent =
            "Failed to submit feedback.";
        return;
    }

    statusMessage.textContent =
        "Thank you! Your feedback was submitted.";

    document.getElementById("feedback-message").value = "";
});