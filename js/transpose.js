const transpose = square => ({x: square.y, y: square.x})
const transposeShape = shape => new Set([...shape].map(transpose))

export { transposeShape }

