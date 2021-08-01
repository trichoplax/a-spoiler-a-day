import { svgElementMaker } from "./svg_element_maker.js"
import { paths } from "./paths.js"

const placeSvgPiece = ({ piece, orientation, location }) => {
    document.querySelector("#main_board svg").insertBefore(
        svgElementMaker(
            "path",
            {
                d: paths[piece][orientation](location),
                fill: "#dcc398",
                stroke: "#773403",
                "stroke-width": "3",
            }
        ),
        null
    )
}

const removeSvgPiece = () => {
    const board = document.querySelector("#main_board svg")
    board.removeChild(board.lastChild)
}

const emptyElement = element => {
    while(element.lastChild) {
        element.removeChild(element.lastChild)
    }
}

const resetToEmptySvgBoard = () => {
    const solutions = document.getElementById("solutions")
    emptyElement(solutions)
    const board = document.querySelector("#main_board svg")
    emptyElement(board)

    const concaveMask = board.insertBefore(
        svgElementMaker(
            "mask",
            { id: "large-concave-south-west" }
        ),
        null
    )
    
    concaveMask.insertBefore(
        svgElementMaker(
            "rect",
            {
                x: "680",
                y: "180",
                width: "40",
                height: "40",
                fill: "white",
            }
        ),
        null
    )
    
    concaveMask.insertBefore(
        svgElementMaker(
            "circle",
            {
                cx: "720",
                cy: "180",
                r: "20",
                fill: "black",
            }
        ),
        null
    )
    
    const fullAreaMask = board.insertBefore(
        svgElementMaker(
            "mask",
            { id: "full-area" }
        ),
        null
    )
    
    fullAreaMask.insertBefore(
        svgElementMaker(
            "rect",
            {
                width: "700",
                height: "800",
                rx: "20",
                fill: "white",
            }
        ),
        null
    )
    
    fullAreaMask.insertBefore(
        svgElementMaker(
            "rect",
            {
                y: "200",
                width: "800",
                height: "600",
                rx: "20",
                fill: "white",
            }
        ),
        null
    )
    
    fullAreaMask.insertBefore(
        svgElementMaker(
            "circle",
            {
                cx: "700",
                cy: "200",
                r: "20",
                fill: "white",
                mask: "url(#large-concave-south-west)",
            }
        ),
        null
    )
    
    const playAreaMask = board.insertBefore(
        svgElementMaker(
            "mask",
            { id: "play-area" }
        ),
        null
    )
    
    playAreaMask.insertBefore(
        svgElementMaker(
            "rect",
            {
                x: "50",
                y: "50",
                width: "600",
                height: "300",
                rx: "10",
                fill: "white",
                stroke: "white",
                "stroke-width": "3",
            }
        ),
        null
    )
    
    playAreaMask.insertBefore(
        svgElementMaker(
            "rect",
            {
                x: "50",
                y: "250",
                width: "700",
                height: "400",
                rx: "10",
                fill: "white",
                stroke: "white",
                "stroke-width": "3",
            }
        ),
        null
    )
    
    playAreaMask.insertBefore(
        svgElementMaker(
            "rect",
            {
                x: "50",
                y: "50",
                width: "300",
                height: "700",
                rx: "10",
                fill: "white",
                stroke: "white",
                "stroke-width": "3",
            }
        ),
        null
    )
    
    const defs = board.insertBefore(
        svgElementMaker("defs", {}),
        null
    )
    
    const fullBoard = defs.insertBefore(
        svgElementMaker(
            "g",
            {
                id: "full-board",
                mask: "url(#full-area)",
            }
        ),
        null
    )
    
    fullBoard.insertBefore(
        svgElementMaker(
            "rect",
            {
                width: "800",
                height: "800",
                rx: "20",
                fill: "#dcc398",
            }
        ),
        null
    )
    
    const playBoard = defs.insertBefore(
        svgElementMaker(
            "g",
            {
                id: "play-board",
                mask: "url(#play-area)",
            }
        ),
        null
    )
    
    for (const properties of [
        { x: "0", y: "250", width: "750", height: "400", rx: "10", fill: "none", stroke: "#773403", "stroke-width": "3" },
        { x: "50", y: "50", width: "600", height: "700", rx: "10", fill: "none", stroke: "#773403", "stroke-width": "3" },
        { x: "50", y: "0", width: "300", height: "750", rx: "10", fill: "none", stroke: "#773403", "stroke-width": "3" },
    ]) {
        playBoard.insertBefore(
            svgElementMaker(
                "rect",
                properties
            ),
            null
        )
    }

    for (const properties of [
        { x1: "150", y1: "50", x2: "150", y2: "750", stroke: "#773403", "stroke-width": "3" },
        { x1: "250", y1: "50", x2: "250", y2: "750", stroke: "#773403", "stroke-width": "3" },
        { x1: "450", y1: "50", x2: "450", y2: "650", stroke: "#773403", "stroke-width": "3" },
        { x1: "550", y1: "50", x2: "550", y2: "650", stroke: "#773403", "stroke-width": "3" },
        { x1: "50", y1: "150", x2: "650", y2: "150", stroke: "#773403", "stroke-width": "3" },
        { x1: "50", y1: "350", x2: "750", y2: "350", stroke: "#773403", "stroke-width": "3" },
        { x1: "50", y1: "450", x2: "750", y2: "450", stroke: "#773403", "stroke-width": "3" },
        { x1: "50", y1: "550", x2: "750", y2: "550", stroke: "#773403", "stroke-width": "3" },
    ]) {
        playBoard.insertBefore(
            svgElementMaker(
                "line",
                properties
            ),
            null
        )
    }
    
    board.insertBefore(
        svgElementMaker(
            "use",
            { href: "#full-board" }
        ),
        null
    )
    
    board.insertBefore(
        svgElementMaker(
            "use",
            { href: "#play-board" }
        ),
        null
    )
    
    for (const [properties, content] of [
        [{ x: "100", y: "100", class: "month" }, "Jan"],
        [{ x: "200", y: "100", class: "month" }, "Feb"],
        [{ x: "300", y: "100", class: "month" }, "Mar"],
        [{ x: "400", y: "100", class: "month" }, "Apr"],
        [{ x: "500", y: "100", class: "month" }, "May"],
        [{ x: "600", y: "100", class: "month" }, "Jun"],
        [{ x: "100", y: "200", class: "month" }, "Jul"],
        [{ x: "200", y: "200", class: "month" }, "Aug"],
        [{ x: "300", y: "200", class: "month" }, "Sep"],
        [{ x: "400", y: "200", class: "month" }, "Oct"],
        [{ x: "500", y: "200", class: "month" }, "Nov"],
        [{ x: "600", y: "200", class: "month" }, "Dec"],
        [{ x: "100", y: "300", class: "month" }, "1"],
        [{ x: "200", y: "300", class: "month" }, "2"],
        [{ x: "300", y: "300", class: "month" }, "3"],
        [{ x: "400", y: "300", class: "month" }, "4"],
        [{ x: "500", y: "300", class: "month" }, "5"],
        [{ x: "600", y: "300", class: "month" }, "6"],
        [{ x: "700", y: "300", class: "month" }, "7"],
        [{ x: "100", y: "400", class: "month" }, "8"],
        [{ x: "200", y: "400", class: "month" }, "9"],
        [{ x: "300", y: "400", class: "month" }, "10"],
        [{ x: "400", y: "400", class: "month" }, "11"],
        [{ x: "500", y: "400", class: "month" }, "12"],
        [{ x: "600", y: "400", class: "month" }, "13"],
        [{ x: "700", y: "400", class: "month" }, "14"],
        [{ x: "100", y: "500", class: "month" }, "15"],
        [{ x: "200", y: "500", class: "month" }, "16"],
        [{ x: "300", y: "500", class: "month" }, "17"],
        [{ x: "400", y: "500", class: "month" }, "18"],
        [{ x: "500", y: "500", class: "month" }, "19"],
        [{ x: "600", y: "500", class: "month" }, "20"],
        [{ x: "700", y: "500", class: "month" }, "21"],
        [{ x: "100", y: "600", class: "month" }, "22"],
        [{ x: "200", y: "600", class: "month" }, "23"],
        [{ x: "300", y: "600", class: "month" }, "24"],
        [{ x: "400", y: "600", class: "month" }, "25"],
        [{ x: "500", y: "600", class: "month" }, "26"],
        [{ x: "600", y: "600", class: "month" }, "27"],
        [{ x: "700", y: "600", class: "month" }, "28"],
        [{ x: "100", y: "700", class: "month" }, "29"],
        [{ x: "200", y: "700", class: "month" }, "30"],
        [{ x: "300", y: "700", class: "month" }, "31"],
        [{ x: "562.5", y: "700", class: "title" }, "A-Spoiler-A-Day"],
        [{ x: "562.5", y: "750", class: "inspiration" }, "inspired by dragonfjord.com"],
    ]) {
        board.insertBefore(
            svgElementMaker(
                "text",
                {
                    ...properties,
                    "text-anchor": "middle",
                    "dominant-baseline": "middle",
                }
            ),
            null
        ).textContent = content
    }
    
    
    // board.innerHTML = `
    //             <mask id="large-concave-south-west">
    //                 <rect x="680" y="180" width="40" height="40" fill="white" />
    //                 <circle cx="720" cy="180" r="20" fill="black" />
    //             </mask>
    //             <mask id="full-area">
    //                     <rect width="700" height="800" rx="20" fill="white" />
    //                     <rect y="200" width="800" height="600" rx="20" fill="white" />
    //                     <circle cx="700" cy="200" r="20" fill="white" mask="url(#large-concave-south-west)" />
    //             </mask>
    //             <mask id="play-area">
    //                 <rect x="50" y="50" width="600" height="300" rx="10" fill="white" stroke="white" stroke-width="3" />
    //                 <rect x="50" y="250" width="700" height="400" rx="10" fill="white" stroke="white" stroke-width="3" />
    //                 <rect x="50" y="50" width="300" height="700" rx="10" fill="white" stroke="white" stroke-width="3" />
    //             </mask>
    //             <defs>
    //                 <g id="full-board" mask="url(#full-area)">
    //                     <rect width="800" height="800" rx="20" fill="#dcc398" />
    //                 </g>
    //                 <g id="play-board" mask="url(#play-area)">
    //                     <rect x="0" y="250" width="750" height="400" rx="10" fill="none" stroke="#773403" stroke-width="3" />
    //                     <rect x="50" y="50" width="600" height="700" rx="10" fill="none" stroke="#773403" stroke-width="3" />
    //                     <rect x="50" y="0" width="300" height="750" rx="10" fill="none" stroke="#773403" stroke-width="3" />
    //                     <line x1="150" y1="50" x2="150" y2="750" stroke="#773403" stroke-width="3" />
    //                     <line x1="250" y1="50" x2="250" y2="750" stroke="#773403" stroke-width="3" />
    //                     <line x1="450" y1="50" x2="450" y2="650" stroke="#773403" stroke-width="3" />
    //                     <line x1="550" y1="50" x2="550" y2="650" stroke="#773403" stroke-width="3" />
    //                     <line x1="50" y1="150" x2="650" y2="150" stroke="#773403" stroke-width="3" />
    //                     <line x1="50" y1="350" x2="750" y2="350" stroke="#773403" stroke-width="3" />
    //                     <line x1="50" y1="450" x2="750" y2="450" stroke="#773403" stroke-width="3" />
    //                     <line x1="50" y1="550" x2="750" y2="550" stroke="#773403" stroke-width="3" />
    //                 </g>
    //             </defs>
    //             <use href="#full-board" />
    //             <use href="#play-board" />
    //             <text x="100" y="100" text-anchor="middle" dominant-baseline="middle" class="month">Jan</text>
    //             <text x="200" y="100" text-anchor="middle" dominant-baseline="middle" class="month">Feb</text>
    //             <text x="300" y="100" text-anchor="middle" dominant-baseline="middle" class="month">Mar</text>
    //             <text x="400" y="100" text-anchor="middle" dominant-baseline="middle" class="month">Apr</text>
    //             <text x="500" y="100" text-anchor="middle" dominant-baseline="middle" class="month">May</text>
    //             <text x="600" y="100" text-anchor="middle" dominant-baseline="middle" class="month">Jun</text>
    //             <text x="100" y="200" text-anchor="middle" dominant-baseline="middle" class="month">Jul</text>
    //             <text x="200" y="200" text-anchor="middle" dominant-baseline="middle" class="month">Aug</text>
    //             <text x="300" y="200" text-anchor="middle" dominant-baseline="middle" class="month">Sep</text>
    //             <text x="400" y="200" text-anchor="middle" dominant-baseline="middle" class="month">Oct</text>
    //             <text x="500" y="200" text-anchor="middle" dominant-baseline="middle" class="month">Nov</text>
    //             <text x="600" y="200" text-anchor="middle" dominant-baseline="middle" class="month">Dec</text>
    //             <text x="100" y="300" text-anchor="middle" dominant-baseline="middle" class="day">1</text>
    //             <text x="200" y="300" text-anchor="middle" dominant-baseline="middle" class="day">2</text>
    //             <text x="300" y="300" text-anchor="middle" dominant-baseline="middle" class="day">3</text>
    //             <text x="400" y="300" text-anchor="middle" dominant-baseline="middle" class="day">4</text>
    //             <text x="500" y="300" text-anchor="middle" dominant-baseline="middle" class="day">5</text>
    //             <text x="600" y="300" text-anchor="middle" dominant-baseline="middle" class="day">6</text>
    //             <text x="700" y="300" text-anchor="middle" dominant-baseline="middle" class="day">7</text>
    //             <text x="100" y="400" text-anchor="middle" dominant-baseline="middle" class="day">8</text>
    //             <text x="200" y="400" text-anchor="middle" dominant-baseline="middle" class="day">9</text>
    //             <text x="300" y="400" text-anchor="middle" dominant-baseline="middle" class="day">10</text>
    //             <text x="400" y="400" text-anchor="middle" dominant-baseline="middle" class="day">11</text>
    //             <text x="500" y="400" text-anchor="middle" dominant-baseline="middle" class="day">12</text>
    //             <text x="600" y="400" text-anchor="middle" dominant-baseline="middle" class="day">13</text>
    //             <text x="700" y="400" text-anchor="middle" dominant-baseline="middle" class="day">14</text>
    //             <text x="100" y="500" text-anchor="middle" dominant-baseline="middle" class="day">15</text>
    //             <text x="200" y="500" text-anchor="middle" dominant-baseline="middle" class="day">16</text>
    //             <text x="300" y="500" text-anchor="middle" dominant-baseline="middle" class="day">17</text>
    //             <text x="400" y="500" text-anchor="middle" dominant-baseline="middle" class="day">18</text>
    //             <text x="500" y="500" text-anchor="middle" dominant-baseline="middle" class="day">19</text>
    //             <text x="600" y="500" text-anchor="middle" dominant-baseline="middle" class="day">20</text>
    //             <text x="700" y="500" text-anchor="middle" dominant-baseline="middle" class="day">21</text>
    //             <text x="100" y="600" text-anchor="middle" dominant-baseline="middle" class="day">22</text>
    //             <text x="200" y="600" text-anchor="middle" dominant-baseline="middle" class="day">23</text>
    //             <text x="300" y="600" text-anchor="middle" dominant-baseline="middle" class="day">24</text>
    //             <text x="400" y="600" text-anchor="middle" dominant-baseline="middle" class="day">25</text>
    //             <text x="500" y="600" text-anchor="middle" dominant-baseline="middle" class="day">26</text>
    //             <text x="600" y="600" text-anchor="middle" dominant-baseline="middle" class="day">27</text>
    //             <text x="700" y="600" text-anchor="middle" dominant-baseline="middle" class="day">28</text>
    //             <text x="100" y="700" text-anchor="middle" dominant-baseline="middle" class="day">29</text>
    //             <text x="200" y="700" text-anchor="middle" dominant-baseline="middle" class="day">30</text>
    //             <text x="300" y="700" text-anchor="middle" dominant-baseline="middle" class="day">31</text>
    //             <text x="562.5" y="700" text-anchor="middle" dominant-baseline="middle" class="title">A-Spoiler-A-Day</text>
    //             <text x="562.5" y="750" text-anchor="middle" dominant-baseline="middle" class="inspiration">inspired by dragonfjord.com</text>
    //         `
}

const addToSvgSolutions = () => {
    const board = document.querySelector("#main_board svg")
    const solutions = document.getElementById("solutions")
    const div = document.createElement("div")
    div.classList.add("board")
    const solution = board.cloneNode(true)
    div.appendChild(solution)
    solutions.appendChild(div)
}

export { placeSvgPiece, removeSvgPiece, resetToEmptySvgBoard, addToSvgSolutions }

