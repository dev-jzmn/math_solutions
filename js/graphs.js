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
    },

    "param-10.1-14": {
        type: "parametric",

        x: t => Math.sin(4*t),
        y: t => Math.cos(4*t),

        tMin: 0,
        tMax: Math.PI / 2,

        boundingbox: [-3, 2, 3, -2],

        arrow: {
            t1: 0.9,
            t2: 1.0
        }
    },

    
    "param-10.1-16": {
        type: "parametric",

        x: t => 1 / Math.sin(t),
        y: t => 1 / Math.tan(t),

        tMin: 0.00001,
        tMax: Math.PI,

        boundingbox: [-1, 2, 3, -2],

        arrow: {
            t1: 0.9,
            t2: 1.0
        }
    },

    "param-10.1-18": {
        type: "parametric",

        x: t => t + 2,
        y: t => 1 / t,

        tMin: 0.00001,
        tMax: 10,

        boundingbox: [-0.5, 8, 8, -0.5],

        arrow: {
            t1: 0.8,
            t2: 1.2
        }
    },

    "param-10.1-20": {
        type: "parametric",

        x: t => Math.abs(t),
        y: t => Math.abs(1 - Math.abs(t)),

        tMin: -5,
        tMax: 5,

        boundingbox: [-1, 3, 3, -1],

        arrow: {
            t1: 0.6,
            t2: 0.9
        }
    },

    "param-10.2-6": {
        type: "parametric",

        x: t => t + Math.cos(Math.PI*t),
        y: t => -t + Math.sin(Math.PI*t),

        tMin: -8,
        tMax: 8,

        boundingbox: [-3, 3, 6, -6],

        arrow: {
        },

        point: {
            x: 3,
            y: -2
        }
    },

    "param-10.2-40": {
        type: "parametric-loop",
        x: t => 1 - t * t,
        y: t => t - t * t * t,
        tMin: -1.5,
        tMax: 1.5,
        loopStart: -1,
        loopEnd: 1,
        boundingbox: [-1.5, 1.5, 1.5, -1.5]
    }
    
};

function addDirectionArrow(
    board,
    config,
    t1,
    t2
) {
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

    board.create(
        "arrow",
        [p1, p2],
        {
            strokeWidth: 2,
            fixed: true
        }
    );
}

function fillParametricLoop(
    board,
    xFunc,
    yFunc,
    tStart,
    tEnd,
    samples = 150
) {
    const points = [];

    for (let i = 0; i <= samples; i++) {
        const t =
            tStart +
            (tEnd - tStart) * i / samples;

        const point = board.create(
            "point",
            [
                xFunc(t),
                yFunc(t)
            ],
            {
                name: "",
                visible: false,
                fixed: true
            }
        );

        points.push(point);
    }

    return board.create(
        "polygon",
        points,
        {
            fillColor: '#54b2fe',
            fillOpacity: 0.3,

            borders: {
                strokeOpacity: 0
            },

            vertices: {
                visible: false
            },

            fixed: true
        }
    );
}

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
            if (config.arrow) {
                addDirectionArrow(
                    board,
                    config,
                    config.arrow.t1,
                    config.arrow.t2
                );
            }
        }
    }

    else if (config.type === "parametric-loop") {

        // fill the loop
        fillParametricLoop(
            board,
            config.x,
            config.y,
            config.loopStart,
            config.loopEnd
        );

        // the curve(boundary)
        board.create(
            "curve",
            [
                config.x,
                config.y,
                config.tMin,
                config.tMax
            ],
            {
                strokeWidth: 2,
                fixed: true
            }
        );
    }

    if (config.point) {
        const { x, y } = config.point;

        const p = board.create(
            "point",
            [
                x,y
            ],
            {
                name: "(3, -2)",
                visible: true,
                fixed: true
            }
        );
    }

    return board;
}
