import { resetPuzzleOnDateChange } from "./reset_puzzle_on_date_change.js"
import { setDateToToday } from "./set_date_to_today.js"

const timeoutCanceller = { timeoutID: 0 }
const solutionsFound = { solutions: 0 }
resetPuzzleOnDateChange(timeoutCanceller, solutionsFound)
setDateToToday()

