const union = (a, b) => new Set([...a, ...b])
const notIn = a => element => !a.has(element)
const valueIn = a => element => new Set([...a].map(JSON.stringify)).has(JSON.stringify(element))
const valueNotIn = a => element => !valueIn(a)(element)
const difference = (a, b) => new Set([...a].filter(notIn(b)))
const valueDifference = (a, b) => new Set([...a].filter(valueNotIn(b)))

export { union, difference, valueDifference, valueIn, valueNotIn }

