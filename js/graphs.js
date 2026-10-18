const PI = 3.141592;
const graphConfigs = {
    "test-parabola": {
        boundingbox: [-5, 10, 5, -2],

        functions: [
            {
                fn: x => x * x,
                min: -4,
                max: 4
            }
        ]
    },

    "sqrt-example": {
    boundingbox: [-1, 5, 10, -1],

    functions: [
            {
                fn: x => Math.sqrt(x - 2),
                min: 2,
                max: 10
            }
        ]
    },

    "param-line-10.1-8": {
        type: "parametric",

        x: t => 3 * t + 2,
        y: t => 2 * t + 3,

        tMin: -5,
        tMax: 5,

        boundingbox: [-8, 12, 14, -8],

        arrow: {
            t1: 0.6,
            t2: 1.0
        }
    },

    "param-10.1-10": {
        type: "parametric",

        x: t => Math.sin(t),
        y: t => 1 - Math.cos(t),

        tMin: 0,
        tMax: 2*PI,

        boundingbox: [-2, 3, 2, -1],

        arrow: {
            t1: 0.6,
            t2: 1.0
        }
    },

    "param-10.1-12": {
        type: "parametric",

        x: t => t*t,
        y: t => t*t*t,

        tMin: -5,
        tMax: 5,

        boundingbox: [-5, 3, 5, -3],

        arrow: {
            t1: 0.6,
            t2: 1.0
        }
    }
    
};

export function renderGraph(key, containerId) {
    const config = graphConfigs[key];

    if (!config) {
        console.error(`Graph config not found: ${key}`);
        return null;
    }

    const board = JXG.JSXGraph.initBoard(containerId, {
        boundingbox: config.boundingbox,
        axis: true,
        showCopyright: false,
        showNavigation: true
    });

    if (config.type === "function") {
        board.create("functiongraph", [
            config.fn,
            config.xMin,
            config.xMax
        ]);
    }

    else if (config.type === "parametric") {
        board.create("curve", [
            config.x,
            config.y,
            config.tMin,
            config.tMax
        ]);

        if (config.arrow) {
            const { t1, t2 } = config.arrow;

            const p1 = board.create(
                "point",
                [
                    config.x(t1),
                    config.y(t1)
                ],
                {
                    name: "",
                    visible: false,
                    fixed: true
                }
            );

            const p2 = board.create(
                "point",
                [
                    config.x(t2),
                    config.y(t2)
                ],
                {
                    name: "",
                    visible: false,
                    fixed: true
                }
            );

            board.create("arrow", [p1, p2], {
                strokeWidth: 2
            });
        }
    }

    return board;
}