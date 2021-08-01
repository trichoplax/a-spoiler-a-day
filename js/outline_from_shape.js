import { colocated, topmost, leftmost, step, clockwise, anticlockwise, contains } from "./relative_location.js"
import { north } from "./directions.js"

const clockwiseAlongPerimeter = (currentSquare, facingSide, shape) => {
    const straightSquare = step(currentSquare, clockwise(facingSide))
    
    if (!contains(straightSquare)(shape)) {
        return [currentSquare, clockwise(facingSide)]
    }
    
    const anticlockwiseSquare = step(straightSquare, facingSide)
    
    if (contains(anticlockwiseSquare)(shape)) {
        return [anticlockwiseSquare, anticlockwise(facingSide)]
    }
    
    return [straightSquare, facingSide]
}

const outlineFromShape = shape => {
    const firstSquare = [...shape].filter(topmost).filter(leftmost)[0]
    let currentSquare = firstSquare
    let facingSide = north
    let edges = []
    
    while (true) {
        edges.push(facingSide);  // Essential semicolon as next line starts "["
        
        [currentSquare, facingSide] = clockwiseAlongPerimeter(
            currentSquare,
            facingSide,
            shape
        )
        
        if (colocated(currentSquare)(firstSquare) && facingSide === north) {
            break
        }
    }
    
    return edges
}

export { outlineFromShape }

