import { north, east, south, west } from "./directions.js"

const gap = key => (a, b) => Math.abs(a[key] - b[key])
const xGap = gap("x")
const yGap = gap("y")
const separatedBy = distance => a => b => xGap(a, b) + yGap(a, b) === distance
const adjacent = separatedBy(1)
const colocated = separatedBy(0)
const squaresWithMinimal = aspect => (coordinates, _, shape) => aspect(coordinates) === Math.min(...[...shape].map(aspect))
const coordinate = key => coordinates => coordinates[key]
const topmost = squaresWithMinimal(coordinate("y"))
const leftmost = squaresWithMinimal(coordinate("x"))
const turn = amount => direction => (direction + amount + 4) % 4
const clockwise = turn(1)
const anticlockwise = turn(-1)
const contains = square => shape => [...shape].filter(colocated(square)).length === 1

const step = (square, facingDirection) => {
    switch (facingDirection) {
        case north: return {x: square.x, y: square.y - 1}
        case east: return {x: square.x + 1, y: square.y}
        case south: return {x: square.x, y: square.y + 1}
        case west: return {x: square.x - 1, y: square.y}
    }
}


export { adjacent, colocated, topmost, leftmost, step, clockwise, anticlockwise, contains }

