
const getTimeFormat = (formattype, timeString) => {
    if (formattype != "12")
        return timeString
    if (timeString != null || timeString != undefined) {
        const [hourString, minute] = timeString?.split(":");
        const hour = +hourString % 24;
        return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
    }
    return ""
}

export {
    getTimeFormat
}