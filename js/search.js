import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://mbupfomfbsrsorcrjlsr.supabase.co";
const supabaseKey = "sb_publishable_XC7ALstTwgtB6zQIHwzTuQ_VOp0LF83";

const supabase = createClient(supabaseUrl, supabaseKey);

const form = document.getElementById("problem-search");
const input = document.getElementById("search-input");
const message = document.getElementById("search-message");

async function searchProblem() {
    const searchText = input.value
        .trim()
        .replace("#", "");

    const parts = searchText.split(/\s+/);

    if (parts.length < 2) {
        message.textContent =
            "Enter a section and problem number, for example 6.1 24.";
        return;
    }

    const section = parts[0];
    const problemNumber = Number(parts[1]);

    const { data: solution, error } = await supabase
        .from("solutions")
        .select("chapter, section, problem")
        .eq("section", section)
        .eq("problem", problemNumber)
        .maybeSingle();

    if (error) {
        console.error("Search error:", error);
        message.textContent = "Something went wrong.";
        return;
    }

    if (!solution) {
        message.textContent = "Problem not found.";
        return;
    }

    window.location.href =
        `problem.html?chapter=${solution.chapter}` +
        `&section=${solution.section}` +
        `&problem=${solution.problem}`;
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    searchProblem();
});