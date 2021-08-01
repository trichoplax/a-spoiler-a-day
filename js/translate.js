const translate = coordinates => square => ({x: square.x + coordinates.x, y: square.y + coordinates.y})
const translateShape = coordinates => shape => new Set([...shape].map(translate(coordinates)))
const right = distance => square => translate({x: distance, y: 0})(square)
const oneAbove = square => translate({x: 0, y: -1})(square)
const oneBelow = square => translate({x: 0, y: 1})(square)

export { translate, translateShape, right, oneAbove, oneBelow }
