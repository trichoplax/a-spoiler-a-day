import { allShapes } from "./shapes.js"
import { outlineFromShape } from "./outline_from_shape.js"
import { pathFromOutline } from "./path_from_outline.js"

const outlines = allShapes.map(orientations => orientations.map(outlineFromShape))
const paths = outlines.map(outline => outline.map(pathFromOutline))

export { paths }

