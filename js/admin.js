import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://mbupfomfbsrsorcrjlsr.supabase.co";
const supabaseKey = "sb_publishable_XC7ALstTwgtB6zQIHwzTuQ_VOp0LF83";

const supabase = createClient(supabaseUrl, supabaseKey);

const form = document.getElementById("problem-form");

// login to supabase
const loginButton =
    document.getElementById("login-button");

const loginSection =
    document.getElementById("login-section");

const loginMessage =
    document.getElementById("login-message");;

loginButton.addEventListener("click", async function () {
    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const { data, error } =
        await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

    if (error) {
        console.error("Login error:", error);

        loginMessage.textContent =
            "Login failed.";

        return;
    }

    console.log("Logged in:", data.user);

    loginSection.hidden = true;
    form.hidden = false;
});

async function checkLogin() {
    const {
        data: { session }
    } = await supabase.auth.getSession();

    if (session) {
        loginSection.hidden = true;
        form.hidden = false;
    } else {
        loginSection.hidden = false;
        form.hidden = true;
    }
}

checkLogin();

const stepsContainer =
    document.getElementById("steps-container");

const addStepButton =
    document.getElementById("add-step");

let stepCount = 0;

// adding steps button behavior
function addStep() {
    stepCount++;

    const stepDiv = document.createElement("div");
    stepDiv.classList.add("step-input");

    stepDiv.innerHTML = `
        <h3>Step ${stepCount}</h3>

        <label>
            Explanation
            <textarea class="step-text"></textarea>
        </label>

        <label>
            Math
            <textarea
                class="step-math"
                placeholder="e.g. y'=\\frac{e^x}{(1-e^x)^2}"
            ></textarea>
        </label>
    `;

    stepsContainer.appendChild(stepDiv);
}

addStep();

addStepButton.addEventListener("click", addStep);

// insert the information to supabase table when submitted
form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const chapter =
        Number(document.getElementById("chapter").value);

    const section =
        document.getElementById("section").value.trim();

    const problem =
        Number(document.getElementById("problem").value);

    const tags =
        document.getElementById("tags").value
            .split(",")
            .map(tag => tag.trim())
            .filter(tag => tag !== "");

    const prompt =
        document.getElementById("prompt").value.trim();

    const expression =
        document.getElementById("expression").value.trim();

    const answer =
        document.getElementById("answer").value.trim();

    const hint =
        document.getElementById("hint").value.trim();

    const commonMistake =
        document.getElementById("common-mistake").value.trim();

    const steps = [];

    const stepInputs =
        document.querySelectorAll(".step-input");

    stepInputs.forEach(step => {
        const text =
            step.querySelector(".step-text").value.trim();

        const math =
            step.querySelector(".step-math").value.trim();

        steps.push({
            text: text,
            math: math
        });
    });

    const problemData = {
        chapter: chapter,
        section: section,
        problem: problem,
        tags: tags,
        prompt: prompt,
        expression: expression,
        answer: answer,
        hint: hint,
        steps: steps,
        common_mistake: commonMistake
    };

    const { data, error } = await supabase
        .from("solutions")
        .insert(problemData)
        .select();

    if (error) {
        console.error("Insert error:", error);
        document.getElementById("form-message").textContent =
            "Failed to save the problem.";
        return;
    }

    console.log("Saved:", data);
});