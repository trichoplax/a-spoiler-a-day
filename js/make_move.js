import { topmost, leftmost } from "./relative_location.js"
import { translate } from "./translate.js"
import { negate } from "./negate.js"
import { allShapes } from "./shapes.js"
import { difference, valueDifference, valueIn, valueNotIn } from "./set_operations.js"
import { placeSvgPiece, removeSvgPiece, addToSvgSolutions } from "./edit_svg.js"
import { validMove, usedSquares, worthContinuing } from "./move_checks.js"

const addPiece = frame => {
    const targetSquare = [...frame.availableSquares].filter(topmost).filter(leftmost)[0]
    const piece = frame.nextPiece.piece
    const orientation = frame.nextPiece.orientation
    const placement = frame.nextPiece.placement
    const offset = negate([...allShapes[piece][orientation]][placement])
    const location = translate(targetSquare)(offset)
    placeSvgPiece({ piece, orientation, location })
}

const nextPieceToTry = (remainingPieceIndices, { piece, orientation, placement }) => {
    if (placement !== allShapes[piece][orientation].size - 1) {
        return { piece, orientation, placement: placement + 1 }
    } else if (orientation !== allShapes[piece].length - 1) {
        return { piece, orientation: orientation + 1, placement: 0 }
    } else if (piece !== Math.max(...remainingPieceIndices)) {
        return { piece: Math.min(...remainingPieceIndices.filter(a => a > piece)), orientation: 0, placement: 0 }
    } else {
        return false
    }
}

const makeMove = stack => {
    if (stack.length === 0) {
        document.getElementById("solution_report").textContent = `${frame.solutionsFound.solutions} solutions found in total.`
        return
    }

    const frame = stack.pop()

    if (frame.removePiece) {
        removeSvgPiece()
    } else {
        addPiece(frame)
        const nextPiece = nextPieceToTry(frame.remainingPieceIndices, frame.nextPiece)

        if (nextPiece !== false) {
            stack.push({ ...frame, nextPiece })
        }

        const timeoutCanceller = frame.timeoutCanceller
        stack.push({ timeoutCanceller, removePiece: true })

        if (validMove(frame)) {
            const availableSquares = valueDifference(frame.availableSquares, usedSquares(frame))
            const remainingPieceIndices = frame.remainingPieceIndices.filter(value => value !== frame.nextPiece.piece)
            if (remainingPieceIndices.length === 0) {
                addToSvgSolutions()
                frame.solutionsFound.solutions += 1
                document.getElementById("solution_report").textContent = `${frame.solutionsFound.solutions} solution${frame.solutionsFound.solutions === 1 ? "" : "s"} found so far.`
            } else if (worthContinuing(availableSquares, remainingPieceIndices)) {
                const piece = Math.min(...remainingPieceIndices)
                const orientation = 0
                const placement = 0
                const nextPiece = { piece, orientation, placement }
                stack.push({ ...frame, availableSquares, remainingPieceIndices, nextPiece })
            }
        }
    }
    
    frame.timeoutCanceller.timeoutID = setTimeout(makeMove, 0, stack)
}

export { makeMove }

