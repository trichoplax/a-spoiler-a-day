import { connectedRegions } from "./connected_regions.js"

const squaresFromString = shapeString => {
    const squares = new Set()
    const lines = shapeString.split("\n")

    for (const line in lines) {
        for (const index in lines[line]) {
            if (lines[line][index] == "#") {
                squares.add({x: index * 1, y: line * 1})
            }
        }
    }
    
    return squares
}

const shapesFromString = shapeString => connectedRegions(squaresFromString(shapeString))

export { shapesFromString }

