import { negate } from "./negate.js"
import { topmost, leftmost } from "./relative_location.js"
import { translateShape } from "./translate.js"
import { transposeShape } from "./transpose.js"

const repeat = operation => repetitions => singleArgument => {
    return repetitions ? repeat(operation)(repetitions - 1)(operation(singleArgument)) : singleArgument
}

const quarterRotateSquare = square => ({x: -square.y, y: square.x})

const quarterRotateShape = shape => new Set([...shape].map(quarterRotateSquare))

const repeatedRotate = shape => repetitions => repeat(quarterRotateShape)(repetitions)(shape)

const rotations = shape => [0, 1, 2, 3].map(repeatedRotate(shape))

const reflections = shapes => [...shapes, ...shapes.map(transposeShape)]

const canonicalForm = shape => {
    const chosenSquare = [...shape].filter(topmost).filter(leftmost)[0]
    return translateShape(negate(chosenSquare))(shape)
}

const stringRepresentation = shape => JSON.stringify([...shape].map(JSON.stringify).sort())

const stringRepresentations = shapeArray => new Set(shapeArray.map(stringRepresentation))

const presentIn = targetArray => shape => stringRepresentations(targetArray).has(stringRepresentation(shape))

const distinctShapes = shapes => {
    const distinct = []
    for (const shape of shapes) {
        if (!presentIn(distinct)(shape)) {
            distinct.push(shape)
        }
    }
    return distinct
}

const orientationsFromShape = shape => distinctShapes(reflections(rotations(shape)).map(canonicalForm))

export { orientationsFromShape }
