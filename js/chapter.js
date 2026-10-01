import { chapters } from "../data/chapters.js";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://mbupfomfbsrsorcrjlsr.supabase.co";
const supabaseKey = "sb_publishable_XC7ALstTwgtB6zQIHwzTuQ_VOp0LF83";

const supabase = createClient(supabaseUrl, supabaseKey);

async function loadChapter() {
    const params = new URLSearchParams(window.location.search);
    const chapterNumber = Number(params.get("chapter"));

    const chapterInfo = chapters[chapterNumber];

    if (!chapterInfo) {
        document.getElementById("chapter-title").textContent =
            "Chapter not found";
        return;
    }

    document.getElementById("chapter-title").textContent =
        `Chapter ${chapterNumber} — ${chapterInfo.title}`;

    const { data: chapterProblems, error } = await supabase
        .from("solutions")
        .select("chapter, section, problem")
        .eq("chapter", chapterNumber)
        .order("section", { ascending: true })
        .order("problem", { ascending: true });

    if (error) {
        console.error("Supabase error:", error);
        return;
    }

    const sections = {};

    chapterProblems.forEach(item => {
        if (!sections[item.section]) {
            sections[item.section] = [];
        }

        sections[item.section].push(item);
    });

    document.getElementById("page-title").textContent =`${chapterNumber} ${chapters[chapterNumber].title}`;


    const chapterContent =
        document.getElementById("chapter-content");

    Object.entries(sections).forEach(
        ([sectionNumber, problems]) => {

            const sectionElement =
                document.createElement("section");

            sectionElement.id =
                `section-${sectionNumber.replace(".", "-")}`;

            const heading =
                document.createElement("h2");

            heading.textContent =
                `${sectionNumber} — ${chapterInfo.sections[sectionNumber]}`;

            sectionElement.appendChild(heading);

            const problemList =
                document.createElement("div");

            problemList.classList.add("problem-list");

            problems.forEach(item => {
                const link =
                    document.createElement("a");

                link.href =
                    `problem.html?chapter=${item.chapter}` +
                    `&section=${item.section}` +
                    `&problem=${item.problem}`;

                link.textContent =
                    `Problem ${item.problem}`;

                link.classList.add("problem-link");

                problemList.appendChild(link);
            });

            sectionElement.appendChild(problemList);
            chapterContent.appendChild(sectionElement);
        }
    );
}

loadChapter();

