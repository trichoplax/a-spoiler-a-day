const setDateToToday = () => {
    const currentDate = new Date()
    const month = String(currentDate.getMonth() + 1)
    const day = String(currentDate.getDate())
    document.getElementById("month_select").value = month
    document.getElementById("day_select").value = day
    document.getElementById("month_select").dispatchEvent(new Event("change"))
}

export { setDateToToday }
