import { makeMove } from "./make_move.js"
import { puzzleSquares } from "./squares.js"
import { resetToEmptySvgBoard } from "./edit_svg.js"

const resetPuzzleOnDateChange = (timeoutCanceller, solutionsFound) => {
    document.getElementById("month_select").addEventListener("change", () => resetPuzzle(timeoutCanceller, solutionsFound))
    document.getElementById("day_select").addEventListener("change", () => resetPuzzle(timeoutCanceller, solutionsFound))
}

const resetPuzzle = (timeoutCanceller, solutionsFound) => {
    clearTimeout(timeoutCanceller.timeoutID)
    solutionsFound.solutions = 0
    document.getElementById("solution_report").textContent = ""
    resetToEmptySvgBoard()

    const removePiece = false
    const remainingPieceIndices = [0, 1, 2, 3, 4, 5, 6, 7]

    const month = document.getElementById("month_select").value
    const day = document.getElementById("day_select").value
    const availableSquares = puzzleSquares(month, day)

    const placedPieces = []

    const stack = []

    const piece = 0
    const orientation = 0
    const placement = 0
    const nextPiece = { piece, orientation, placement }
    const timeToAddPiece = true
    const timeToRemovePiece = false

    const frame = { timeoutCanceller, solutionsFound, remainingPieceIndices, availableSquares, nextPiece, timeToAddPiece, timeToRemovePiece }

    stack.push(frame)
    makeMove(stack)
}

export { resetPuzzleOnDateChange }
