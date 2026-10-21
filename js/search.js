import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://mbupfomfbsrsorcrjlsr.supabase.co";
const supabaseKey = "sb_publishable_XC7ALstTwgtB6zQIHwzTuQ_VOp0LF83";

const supabase = createClient(supabaseUrl, supabaseKey);

const problemInput =
    document.getElementById("search-input");

const message =
    document.getElementById("search-message");

const searchType =
    document.getElementById("search-type");

const problemFields =
    document.getElementById("problem-search-fields");

const tagFields =
    document.getElementById("tag-search-fields");

// Search type switch
function updateSearchMode() {
    if (searchType.value === "problem") {
        problemFields.hidden = false;
        tagFields.hidden = true;
    } else {
        problemFields.hidden = true;
        tagFields.hidden = false;
    }

    message.textContent = "";
}

searchType.addEventListener(
    "change",
    updateSearchMode
);

// initial state
updateSearchMode();

// Search specific problem
async function searchProblem() {
    const searchText = problemInput.value
        .trim()
        .replace("#", "");

    const parts =
        searchText.split(/\s+/);

    if (parts.length < 2) {
        message.textContent =
            "Enter a section and problem number, for example 6.1 24.";
        return;
    }

    const section = parts[0];
    const problemNumber =
        Number(parts[1]);

    if (Number.isNaN(problemNumber)) {
        message.textContent =
            "Enter a valid problem number.";
        return;
    }

    const { data: solution, error } =
        await supabase
            .from("solutions")
            .select(
                "chapter, section, problem"
            )
            .eq("section", section)
            .eq("problem", problemNumber)
            .maybeSingle();

    if (error) {
        console.error(
            "Search error:",
            error
        );

        message.textContent =
            "Something went wrong.";

        return;
    }

    if (!solution) {
        message.textContent =
            "Problem not found.";

        return;
    }

    window.location.href =
        `problem.html?chapter=${solution.chapter}` +
        `&section=${solution.section}` +
        `&problem=${solution.problem}`;
}

// Tag autocomplete
let allTags = [];
let selectedTags = [];

const tagInput =
    document.getElementById("tag-input");

const suggestionsBox =
    document.getElementById("tag-suggestions");


async function loadTags() {
    const { data, error } =
        await supabase
            .from("solutions")
            .select("tags");

    if (error) {
        console.error(error);
        return;
    }

    allTags = [
        ...new Set(
            data.flatMap(
                row => row.tags ?? []
            )
        )
    ].sort();
}

loadTags();


tagInput.addEventListener(
    "input",
    function () {
        const tagText =
            tagInput.value
                .trim()
                .toLowerCase();

        suggestionsBox.innerHTML = "";

        if (!tagText) {
            suggestionsBox.hidden = true;
            return;
        }

        const matches =
            allTags.filter(tag =>
                tag
                    .toLowerCase()
                    .includes(tagText)
                &&
                !selectedTags.includes(tag)
            );

        if (matches.length === 0) {
            suggestionsBox.hidden = true;
            return;
        }

        matches.forEach(tag => {
            const button =
                document.createElement(
                    "button"
                );

            button.type = "button";
            button.textContent = tag;

            button.addEventListener(
                "click",
                function () {
                    addTag(tag);
                }
            );

            suggestionsBox.appendChild(
                button
            );
        });

        suggestionsBox.hidden = false;
    }
);


// Add selected tag
function addTag(tag) {
    if (selectedTags.includes(tag)) {
        return;
    }

    selectedTags.push(tag);

    tagInput.value = "";
    suggestionsBox.innerHTML = "";
    suggestionsBox.hidden = true;

    renderSelectedTags();
}

// Show selected tags
function renderSelectedTags() {
    const container =
        document.getElementById(
            "selected-tags"
        );

    container.innerHTML = "";

    selectedTags.forEach(tag => {
        const tagElement =
            document.createElement(
                "span"
            );

        tagElement.classList.add(
            "tag-chip"
        );

        tagElement.textContent = tag;

        const removeButton =
            document.createElement(
                "button"
            );

        removeButton.type = "button";
        removeButton.classList.add(
            "tag-delete-button"
        );
        removeButton.textContent = "×";

        removeButton.addEventListener(
            "click",
            function () {
                selectedTags =
                    selectedTags.filter(
                        t => t !== tag
                    );

                renderSelectedTags();
            }
        );

        tagElement.appendChild(
            removeButton
        );

        container.appendChild(
            tagElement
        );
    });
}

// Move to tag result page
function sendSearchTagInfo() {
    if (selectedTags.length === 0) {
        message.textContent =
            "Select at least one tag.";
        return;
    }

    const params =
        new URLSearchParams();

    selectedTags.forEach(tag => {
        params.append(
            "tag",
            tag
        );
    });

    window.location.href =
        `tag_results.html?${params.toString()}`;
}


// One search form
document
    .getElementById("search-form")
    .addEventListener(
        "submit",
        function (event) {
            event.preventDefault();

            if (
                searchType.value ===
                "problem"
            ) {
                searchProblem();
            } else {
                sendSearchTagInfo();
            }
        }
    );