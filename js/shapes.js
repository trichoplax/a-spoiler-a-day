import { shapeString } from "./shape_string.js"
import { shapesFromString } from "./shapes_from_string.js"
import { orientationsFromShape } from "./orientations_from_shape.js"

const uprightShapes = shapesFromString(shapeString)
const allShapes = uprightShapes.map(orientationsFromShape)

export { allShapes }
