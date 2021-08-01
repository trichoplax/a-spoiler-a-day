const squareCoordinates = (_, index) => index <= 11 ? {x: index % 6, y: Math.floor(index / 6)} : {x: (index + 2) % 7, y: Math.floor((index + 2) / 7)}
const allSquares = new Set([...Array(43)].map(squareCoordinates))
const notMonthSquare = month => square => !(square.x === (month - 1) % 6 && square.y === Math.floor((month - 1) / 6))
const notDaySquare = day => square => !(square.x === (day - 1) % 7 && square.y === Math.floor((day - 1) / 7) + 2)
const puzzleSquares = (month, day) => new Set([...allSquares].filter(notMonthSquare(month)).filter(notDaySquare(day)))

export { puzzleSquares }

