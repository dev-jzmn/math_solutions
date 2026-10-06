import { chapters } from "../data/chapters.js";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://mbupfomfbsrsorcrjlsr.supabase.co";
const supabaseKey = "sb_publishable_XC7ALstTwgtB6zQIHwzTuQ_VOp0LF83";

const supabase = createClient(supabaseUrl, supabaseKey);

const chapterList = document.getElementById("chapter-list");

Object.entries(chapters).forEach(([chapterNumber, chapterInfo]) => {
    const link = document.createElement("a");

    link.href = `chapter.html?chapter=${chapterNumber}`;
    link.textContent =
        `Chapter ${chapterNumber} — ${chapterInfo.title}`;

    link.classList.add("chapter-link");

    chapterList.appendChild(link);
});

const openRequestButton =
    document.getElementById("open-request");

const requestSection =
    document.getElementById("request-problem-section");

const cancelRequestButton =
    document.getElementById("cancel-request");

openRequestButton.addEventListener("click", function () {
    requestSection.hidden = false;
    openRequestButton.hidden = true;
});

cancelRequestButton.addEventListener("click", function () {
    requestSection.hidden = true;
    openRequestButton.hidden = false;
});

const requestButton = document.getElementById("submit-request");

requestButton.addEventListener("click", async function () {
    const section =
    document.getElementById("request-section").value.trim();

    const problem =
        Number(document.getElementById("request-problem").value);

    const chapter =
        Number(section.split(".")[0]);

    const message =
        document.getElementById("request-message").value.trim();

    const status =
        document.getElementById("request-status");
    
    if (!section.includes(".") || !problem) {
        status.textContent =
            "Please enter a section like 7.2 and a problem number.";
    }

    if (!chapter || !section || !problem) {
        status.textContent =
            "Please enter the chapter, section, and problem number.";
        return;
    }

    const { error } = await supabase
        .from("feedback")
        .insert({
            type: "problem_request",
            chapter: chapter,
            section: section,
            problem: problem,
            message: message || "Problem requested."
        });

    if (error) {
        console.error(error);
        status.textContent = "Failed to submit request.";
        return;
    }

    status.textContent = "Problem request submitted.";

    document.getElementById("request-chapter").value = "";
    document.getElementById("request-section").value = "";
    document.getElementById("request-problem").value = "";
    document.getElementById("request-message").value = "";
});