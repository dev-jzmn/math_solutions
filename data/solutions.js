export const solutions = [
    {
        chapter: 6,
        section: "6.1",
        problem: 24,

        prompt:
            "Find a formula for the inverse of the function.",

        expression:
            "h(x)=\\frac{6-3x}{5x+7}",

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
        section: "6.2",
        problem: 32,

        prompt:
            "Differentiate the function.",

        expression:
            "k(r)=e^r+r^e",

        answer:
            "\\(k'(r)=e^r+er^{e-1}\\)",

        hint:
            "Differentiate each term separately. Remember that in \\(r^e\\), the exponent \\(e\\) is a constant.",

        steps: [
            {
                text:
                    "Differentiate the two terms separately.",
                math:
                    "k'(r)=\\frac{d}{dr}(e^r)+\\frac{d}{dr}(r^e)"
            },
            {
                text:
                    "The derivative of \\(e^r\\) is \\(e^r\\).",
                math:
                    "\\frac{d}{dr}(e^r)=e^r"
            },
            {
                text:
                    "Since \\(e\\) is a constant, use the power rule for \\(r^e\\).",
                math:
                    "\\frac{d}{dr}(r^e)=er^{e-1}"
            },
            {
                text:
                    "Combine the derivatives.",
                math:
                    "k'(r)=e^r+er^{e-1}"
            }
        ],

        commonMistake:
            "Do not treat \\(r^e\\) like an exponential function with variable exponent. Here \\(e\\) is just a constant exponent, so the ordinary power rule applies."
    },

    {
        chapter: 6,
        section: "6.2",
        problem: 34,

        prompt:
            "Differentiate the function.",

        expression:
            "y=\\frac{e^x}{1-e^x}",

        answer:
            "\\(y'=\\frac{e^x}{(1-e^x)^2}\\)",

        hint:
            "Use the quotient rule. Be careful when differentiating \\(1-e^x\\).",

        steps: [
            {
                text:
                    "Use the quotient rule.",
                math:
                    "y'=\\frac{(1-e^x)(e^x)-e^x(-e^x)}{(1-e^x)^2}"
            },
            {
                text:
                    "Simplify the numerator.",
                math:
                    "y'=\\frac{e^x-e^{2x}+e^{2x}}{(1-e^x)^2}"
            },
            {
                text:
                    "The two \\(e^{2x}\\) terms cancel.",
                math:
                    "y'=\\frac{e^x}{(1-e^x)^2}"
            }
        ],

        commonMistake:
            "The derivative of \\(1-e^x\\) is \\(-e^x\\). That negative sign combines with the subtraction in the quotient rule, producing a positive term."
    },
    
    {
        chapter: 7,
        section: "7.1",
        problem: 10,

        prompt:
            "Evaluate the indefinite integral.",

        expression:
            "\\int \\frac{\\ln x}{x^2}\\,dx",

        answer:
            "\\(-\\frac{\\ln x}{x}-\\frac{1}{x}+C\\)",

        hint:
            "Use integration by parts with \\(u=\\ln x\\) and \\(dv=\\frac{1}{x^2}dx\\).",

        steps: [
            {
                text:
                    "Choose u and dv for integration by parts.",
                math:
                    "u=\\ln x, \\qquad dv=x^{-2}\\,dx"
            },
            {
                text:
                    "Differentiate u and integrate dv.",
                math:
                    "du=\\frac{1}{x}\\,dx, \\qquad v=-\\frac{1}{x}"
            },
            {
                text:
                    "Apply the integration by parts formula \\(\\int u\\,dv=uv-\\int v\\,du\\).",
                math:
                    "\\int \\frac{\\ln x}{x^2}\\,dx=-\\frac{\\ln x}{x}-\\int\\left(-\\frac{1}{x}\\right)\\frac{1}{x}\\,dx"
            },
            {
                text:
                    "Simplify the remaining integral.",
                math:
                    "=-\\frac{\\ln x}{x}+\\int x^{-2}\\,dx"
            },
            {
                text:
                    "Integrate \\(x^{-2}\\).",
                math:
                    "\\int x^{-2}\\,dx=-x^{-1}"
            },
            {
                text:
                    "Combine the terms.",
                math:
                    "-\\frac{\\ln x}{x}-\\frac{1}{x}+C"
            }
        ],

        commonMistake:
            "A common sign error occurs when integrating \\(x^{-2}\\). Since \\(\\int x^{-2}dx=-x^{-1}\\), the final second term is negative."
    }
];

