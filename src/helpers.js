module.exports = normalizeDays = (duration) => {

    const regex = duration.match(/\d+/)[0];

    if (Number(duration)) {
        return parseInt(duration);
    } else if (duration.includes("week") || duration.includes("weeks")) {
        return regex * 7;
    } else if (duration.includes("month") || duration.includes("months")) {
        return regex * 30;
    }

    return regex;
}