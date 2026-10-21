import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://mbupfomfbsrsorcrjlsr.supabase.co";
const supabaseKey = "sb_publishable_XC7ALstTwgtB6zQIHwzTuQ_VOp0LF83";

const supabase = createClient(supabaseUrl, supabaseKey);

const params =
    new URLSearchParams(window.location.search);

const tags =
    params.getAll("tag");

console.log(tags);

document.getElementById("search_again")
        .addEventListener("click", function(){
            document.getElementById("search_by_label").hidden = false;
            document.getElementById("search-type").hidden = false;
            document.getElementById("search-form").hidden = false;
            document.getElementById("search_again").hidden = true;
        })
function displaySelectedTags() {
    const container =
        document.getElementById("selected-tag-display");

    container.innerHTML = "";

    tags.forEach(tag => {
        const chip =
            document.createElement("span");

        chip.classList.add("tag-chip");
        chip.textContent = tag;

        container.appendChild(chip);
    });
}

function displayTagResults(problems) {
    const results =
        document.getElementById("tag-results");

    results.innerHTML = "";

    if (problems.length === 0) {
        results.textContent =
            "No problems found.";
        return;
    }

    problems.forEach(problem => {
        const card =
            document.createElement("div");

        card.classList.add("problem-result");

        const title =
            document.createElement("a");

        title.href =
            `problem.html?chapter=${problem.chapter}` +
            `&section=${problem.section}` +
            `&problem=${problem.problem}`;

        title.textContent =
            `Section ${problem.section} #${problem.problem}`;

        card.appendChild(title);
        results.appendChild(card);
    });
}

async function loadResults() {
    if (tags.length === 0) {
        return;
    }

    displaySelectedTags();

    const { data, error } = await supabase
        .from("solutions")
        .select(
            "chapter, section, problem, prompt, tags"
        )
        .contains(
            "tags",
            JSON.stringify(tags)
        )
        .order("chapter", { ascending: true })
        .order("section", { ascending: true })
        .order("problem", { ascending: true });

    if (error) {
        console.error(error);
        return;
    }

    displayTagResults(data);
}

loadResults();