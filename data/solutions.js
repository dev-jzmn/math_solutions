const solutions = [
    {
        chapter: 6,
        section: "6.1",
        problem: 1,

        answer:
            "\\( h^{-1}(x)=\\frac{6-7x}{5x+3} \\)",

        hint:
            "Let \\(y=h(x)\\), interchange \\(x\\) and \\(y\\), then solve for \\(y\\).",

        steps: [
            {
                text: "Start with the original function.",
                math: "y=\\frac{6-3x}{5x+7}"
            },
            {
                text: "Interchange x and y.",
                math: "x=\\frac{6-3y}{5y+7}"
            },
            {
                text: "Multiply both sides by \\(5y+7\\).",
                math: "x(5y+7)=6-3y"
            },
            {
                text: "Expand and collect the terms containing y.",
                math: "5xy+3y=6-7x"
            },
            {
                text: "Factor out y.",
                math: "y(5x+3)=6-7x"
            },
            {
                text: "Solve for y.",
                math: "y=\\frac{6-7x}{5x+3}"
            }
        ],

        commonMistake:
            "Be careful with distribution at \\(x\\)\\((5y+7\\))."
    },

    {
        chapter: 6,
        section: "6.1",
        problem: 3,
        answer: "7",
        hint: "place holder",
        explanation: `
            place holder
        `
    }
];

