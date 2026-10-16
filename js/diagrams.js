export const diagrams = {
    "8-8.3-6": `
        <svg class="problem-diagram"
             viewBox="0 0 300 240"
             xmlns="http://www.w3.org/2000/svg">

            <defs>
                <marker id="arrow6"
                        markerWidth="8"
                        markerHeight="8"
                        refX="8"
                        refY="4"
                        orient="auto-start-reverse"
                        markerUnits="strokeWidth">
                    <path d="M0,0 L8,4 L0,8 Z" fill="#333" />
                </marker>
            </defs>

            <!-- water line -->
            <line class="water-line"
                  x1="30" y1="80"
                  x2="270" y2="80" />

            <!-- semicircle -->
            <path class="plate"
                  d="M60 180
                     A90 90 0 0 1 240 180
                     L60 180 Z"
                  transform="translate(0, -30)"/>

            <!-- bottom width 12 m -->
            <line class="dimension"
                  x1="60" y1="205"
                  x2="240" y2="205"
                  marker-start="url(#arrow6)"
                  marker-end="url(#arrow6)"
                  transform="translate(0, -30)" />

            <text class="diagram-text"
                  x="150" y="225"
                  text-anchor="middle">
                12 m
            </text>

            <!-- vertical depth 4 m -->
            <line class="dimension"
                  x1="258" y1="110"
                  x2="258" y2="180"
                  marker-start="url(#arrow6)"
                  marker-end="url(#arrow6)" 
                  transform="translate(0, -30)"/>

            <text class="diagram-text"
                  x="268" y="135">
                4 m
            </text>
        </svg>
    `,

    "8-8.3-8": `
        <svg class="problem-diagram"
             viewBox="0 0 300 260"
             xmlns="http://www.w3.org/2000/svg">

            <defs>
                <marker id="arrow8"
                        markerWidth="8"
                        markerHeight="8"
                        refX="8"
                        refY="4"
                        orient="auto-start-reverse"
                        markerUnits="strokeWidth">
                    <path d="M0,0 L8,4 L0,8 Z" fill="#333" />
                </marker>
            </defs>

            <!-- water line -->
            <line class="water-line"
                  x1="30" y1="45"
                  x2="270" y2="45" />

            <!-- inverted triangle -->
            <polygon class="plate"
                     points="90,105 210,105 150,185" />

            <!-- top width 6 ft -->
            <line class="dimension"
                  x1="90" y1="88"
                  x2="210" y2="88"
                  marker-start="url(#arrow8)"
                  marker-end="url(#arrow8)" />

            <text class="diagram-text"
                  x="150" y="80"
                  text-anchor="middle">
                6 ft
            </text>

            <!-- left side label 5 ft -->
            <text class="diagram-text"
                  x="70" y="150"
                  text-anchor="middle">
                5 ft
            </text>

            <!-- right side label 5 ft -->
            <text class="diagram-text"
                  x="230" y="150"
                  text-anchor="middle">
                5 ft
            </text>

            <!-- depth 3 ft below water -->
            <line class="dimension"
                  x1="235" y1="45"
                  x2="235" y2="105"
                  marker-start="url(#arrow8)"
                  marker-end="url(#arrow8)" />

            <text class="diagram-text"
                  x="245" y="80">
                3 ft
            </text>
        </svg>
    `,

    "8-8.3-10": `
        <svg class="problem-diagram"
             viewBox="0 0 300 260"
             xmlns="http://www.w3.org/2000/svg">

            <line class="water-line"
                  x1="30" y1="45"
                  x2="270" y2="45" />

            <polygon class="plate"
                     points="150,45 220,115 150,185 80,115" />

            <text class="diagram-text"
                  x="100" y="75">
                a
            </text>
        </svg>
    `
};

export function getDiagram(chapter, section, problem) {
    const key = `${chapter}-${section}-${problem}`;
    return diagrams[key] ?? null;
}