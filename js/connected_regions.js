import { union, difference } from "./set_operations.js"
import { adjacent } from "./relative_location.js"

const neighbourIn = recents => potential => [...recents].some(adjacent(potential))
const neighboursIn = potentials => recents => new Set([...potentials].filter(neighbourIn(recents)))

const contiguousSquares = (allSquares, givenSquares) => {
    const newSquares = difference(neighboursIn(allSquares)(givenSquares), givenSquares)
    return newSquares.size ? contiguousSquares(allSquares, union(givenSquares, newSquares)) : givenSquares
}

const connectedRegions = (squares, regions=[]) => {
    const region = contiguousSquares(squares, new Set([[...squares][0]]))
    const remainingSquares = difference(squares, region)
    const updatedRegions = [...regions, region]
    return remainingSquares.size ? connectedRegions(remainingSquares, updatedRegions) : updatedRegions
}

export { connectedRegions }

