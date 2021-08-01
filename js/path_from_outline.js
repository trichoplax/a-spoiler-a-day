import { north, east, south, west } from "./directions.js"

const pathSegment = (edge, index, outline) => {
    const nextEdge = outline[(index * 1 + 1) % outline.length]
    
    switch ("" + edge + nextEdge) {
        case "" + north + north: return "h 100 "
        case "" + north + east: return "h 80 a 10,10 0 0 1 10,10 "
        case "" + north + west: return "h 80 a 10,10 0 0 0 10,-10 "
        case "" + east + north: return "v 80 a 10,10 0 0 0 10,10 "
        case "" + east + east: return "v 100 "
        case "" + east + south: return "v 80 a 10,10 0 0 1 -10,10 "
        case "" + south + east: return "h -80 a 10,10 0 0 0 -10,10 "
        case "" + south + south: return "h -100 "
        case "" + south + west: return "h -80 a 10,10 0 0 1 -10,-10 "
        case "" + west + north: return "v -80 a 10,10 0 0 1 10,-10 "
        case "" + west + south: return "v -80 a 10,10 0 0 0 -10,-10 "
        case "" + west + west: return "v -100 "
        default: console.log(`path segment cannot be calculated from edge "${edge}" and nextEdge "${nextEdge}".`)
    }
}

const pathFromOutline = outline => coordinates => `M ${60 + coordinates.x * 100} ${50 + coordinates.y * 100} ` + outline.map(pathSegment).join("")

export { pathFromOutline }

