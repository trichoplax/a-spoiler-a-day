import { valueDifference, valueIn, valueNotIn } from "./set_operations.js"
import { topmost, leftmost } from "./relative_location.js"
import { negate } from "./negate.js"
import { allShapes } from "./shapes.js"
import { translate, translateShape, right, oneAbove, oneBelow } from "./translate.js"
import { transposeShape } from "./transpose.js"
import { connectedRegions } from "./connected_regions.js"

const usedSquares = frame => {
    const targetSquare = [...frame.availableSquares].filter(topmost).filter(leftmost)[0]
    const offset = negate([...allShapes[frame.nextPiece.piece][frame.nextPiece.orientation]][frame.nextPiece.placement])
    return translateShape(offset)(translateShape(targetSquare)(allShapes[frame.nextPiece.piece][frame.nextPiece.orientation]))
}

const lineOfFour = square => [square, right(1)(square), right(2)(square), right(3)(square)]

const horizontalStraightFourWithoutSideBranches = (square, _, availableSquares) => (
    lineOfFour(square).every(valueIn(availableSquares))
    && [...lineOfFour(oneAbove(square)), ...lineOfFour(oneBelow(square))].every(valueNotIn(availableSquares))
)

const verticalStraightFourWithoutSideBranches = (square, _, availableSquares) => horizontalStraightFourWithoutSideBranches(square, _, transposeShape(availableSquares))

const straightFourWithoutSideBranches = (...args) => horizontalStraightFourWithoutSideBranches(...args) || verticalStraightFourWithoutSideBranches(...args)

const containsStraightFourWithoutSideBranches = availableSquares => [...availableSquares].some(straightFourWithoutSideBranches)

const pieceSize = pieceIndex => allShapes[pieceIndex][0].size

const validSize = validResidues => connectedRegion => validResidues.has(connectedRegion.size % 5)

const connectedRegionWithInvalidSize = (regions, remainingPieceIndices) => (
    regions.some(region => region.size < 5)
    || !regions.every(validSize(new Set(remainingPieceIndices.map(pieceSize).map(size => size % 5))))
)

const connectedRegionWithInvalidShape = (regions, remainingPieceIndices) => {
    // Check if a region has size 5 (or 6 when that piece is remaining) and has canonical form not present in the remaining pieces and orientations
}

const validMove = frame => valueDifference(usedSquares(frame), frame.availableSquares).size === 0

const worthContinuing = (availableSquares, remainingPieceIndices) => {
    if (containsStraightFourWithoutSideBranches(availableSquares)) {
        return false
    }

    const regions = connectedRegions(availableSquares)

    return (
        !connectedRegionWithInvalidSize(regions, remainingPieceIndices)
        && !connectedRegionWithInvalidShape(regions, remainingPieceIndices)
    )
}

export { validMove, usedSquares, worthContinuing }

